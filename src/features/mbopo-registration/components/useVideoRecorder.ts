import { useCallback, useEffect, useRef, useState } from "react";
import { saveVideoPitch } from "@/lib/mockVideoStore";
import { VIDEO_PITCH_MAX_SECONDS } from "../constants";

export type VideoRecorderStatus =
  "idle" | "requesting" | "live" | "recording" | "preview" | "locked" | "error";

export interface UseVideoRecorderResult {
  status: VideoRecorderStatus;
  errorMessage?: string;
  elapsedSeconds: number;
  remainingSeconds: number;
  recordedBlob: Blob | null;
  previewUrl: string;
  liveVideoRef: React.RefObject<HTMLVideoElement | null>;
  playbackVideoRef: React.RefObject<HTMLVideoElement | null>;
  requestCamera: () => Promise<void>;
  startRecording: () => void;
  stopRecording: () => void;
  retake: () => void;
  cancelRecording: () => void;
  // Locks the current preview in permanently — mirrors a real backend's
  // upload-then-lock (see upload-photo.service.ts's videoPitch check): from
  // this point on there is no more redo/cancel, only a read-only playback.
  submitVideo: () => void;
}

// Picks the first mime type the browser's MediaRecorder actually supports —
// Chrome/Firefox favor webm, Safari (17+) supports mp4 instead.
function pickSupportedMimeType(): string | undefined {
  const candidates = [
    "video/webm;codecs=vp9,opus",
    "video/webm;codecs=vp8,opus",
    "video/webm",
    "video/mp4",
  ];
  return candidates.find(
    (type) =>
      typeof MediaRecorder !== "undefined" &&
      MediaRecorder.isTypeSupported?.(type),
  );
}

export interface UseVideoRecorderOptions {
  userId: string;
  // A previously-locked video pitch, from a resumed draft — arrives
  // asynchronously (once the draft fetch resolves), so it's applied via an
  // effect rather than read only at first render, same pattern as
  // usePhotoUpload's initialDataUrl.
  initialLockedUrl?: string;
}

export function useVideoRecorder({
  userId,
  initialLockedUrl,
}: UseVideoRecorderOptions): UseVideoRecorderResult {
  const [status, setStatus] = useState<VideoRecorderStatus>(
    initialLockedUrl ? "locked" : "idle",
  );
  const [errorMessage, setErrorMessage] = useState<string>();
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [recordedBlob, setRecordedBlob] = useState<Blob | null>(null);
  const [previewUrl, setPreviewUrl] = useState(initialLockedUrl ?? "");

  const liveVideoRef = useRef<HTMLVideoElement>(null);
  const playbackVideoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const recorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const lockedRef = useRef(Boolean(initialLockedUrl));

  useEffect(() => {
    if (initialLockedUrl && !lockedRef.current) {
      lockedRef.current = true;
      setPreviewUrl(initialLockedUrl);
      setStatus("locked");
    }
  }, [initialLockedUrl]);

  const stopTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = null;
  }, []);

  const releaseCamera = useCallback(() => {
    streamRef.current?.getTracks().forEach((track) => track.stop());
    streamRef.current = null;
  }, []);

  useEffect(
    () => () => {
      stopTimer();
      releaseCamera();
      // Never revoke a locked preview's URL on unmount — it's the same
      // object URL mockVideoStore hands back on the next visit, not a
      // throwaway created by this component instance.
      if (previewUrl && !lockedRef.current) URL.revokeObjectURL(previewUrl);
    },
    // Cleanup only — intentionally not re-run when previewUrl/etc. change.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  const requestCamera = useCallback(async () => {
    if (lockedRef.current) return;
    setStatus("requesting");
    setErrorMessage(undefined);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: { ideal: 960 }, height: { ideal: 540 } },
        audio: true,
      });
      streamRef.current = stream;
      if (liveVideoRef.current) {
        liveVideoRef.current.srcObject = stream;
        await liveVideoRef.current.play().catch(() => {});
      }
      setStatus("live");
    } catch (error) {
      const message =
        error instanceof DOMException && error.name === "NotAllowedError"
          ? "Camera and microphone access was denied. Please allow access and try again."
          : "We couldn't access your camera and microphone. Please check your device and try again.";
      setErrorMessage(message);
      setStatus("error");
    }
  }, []);

  const stopRecording = useCallback(() => {
    recorderRef.current?.stop();
  }, []);

  const startRecording = useCallback(() => {
    const stream = streamRef.current;
    if (!stream) return;

    chunksRef.current = [];
    const mimeType = pickSupportedMimeType();
    const recorder = new MediaRecorder(
      stream,
      mimeType ? { mimeType } : undefined,
    );

    recorder.ondataavailable = (event) => {
      if (event.data.size > 0) chunksRef.current.push(event.data);
    };
    recorder.onstop = () => {
      stopTimer();
      releaseCamera();
      const blob = new Blob(chunksRef.current, {
        type: mimeType ?? "video/webm",
      });
      const url = URL.createObjectURL(blob);
      setRecordedBlob(blob);
      setPreviewUrl(url);
      setStatus("preview");
    };

    recorderRef.current = recorder;
    recorder.start();
    setElapsedSeconds(0);
    setStatus("recording");

    timerRef.current = setInterval(() => {
      setElapsedSeconds((seconds) => {
        const next = seconds + 1;
        if (next >= VIDEO_PITCH_MAX_SECONDS) {
          recorder.stop();
        }
        return next;
      });
    }, 1000);
  }, [releaseCamera, stopTimer]);

  const reset = useCallback(() => {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setPreviewUrl("");
    setRecordedBlob(null);
    setElapsedSeconds(0);
    setErrorMessage(undefined);
    setStatus("idle");
  }, [previewUrl]);

  // From "preview" (after stopping) — discard this take and start over.
  const retake = reset;

  // From "live"/"recording" — bail out entirely without keeping anything.
  const cancelRecording = useCallback(() => {
    stopTimer();
    recorderRef.current?.stop();
    recorderRef.current = null;
    releaseCamera();
    reset();
  }, [releaseCamera, reset, stopTimer]);

  const submitVideo = useCallback(() => {
    if (!recordedBlob) return;
    const url = saveVideoPitch(userId, recordedBlob);
    lockedRef.current = true;
    setPreviewUrl(url);
    setStatus("locked");
  }, [recordedBlob, userId]);

  return {
    status,
    errorMessage,
    elapsedSeconds,
    remainingSeconds: Math.max(0, VIDEO_PITCH_MAX_SECONDS - elapsedSeconds),
    recordedBlob,
    previewUrl,
    liveVideoRef,
    playbackVideoRef,
    requestCamera,
    startRecording,
    stopRecording,
    retake,
    cancelRecording,
    submitVideo,
  };
}
