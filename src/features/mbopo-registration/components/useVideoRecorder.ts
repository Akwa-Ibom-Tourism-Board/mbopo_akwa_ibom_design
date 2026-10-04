import { useCallback, useEffect, useRef, useState } from "react";
import { uploadToCloudinary } from "@/lib/cloudinary";
import { savePhoto } from "../api";
import { VIDEO_PITCH_MAX_BYTES, VIDEO_PITCH_MAX_SECONDS } from "../constants";

// Tuned so a full 30-second take lands around ~7MB — comfortably under
// VIDEO_PITCH_MAX_BYTES even with some encoder overshoot — while still
// looking reasonable for a mostly-static talking-head shot.
const VIDEO_BITS_PER_SECOND = 1_800_000;
const AUDIO_BITS_PER_SECOND = 96_000;

export type VideoRecorderStatus =
  | "idle"
  | "requesting"
  | "live"
  | "recording"
  | "preview"
  | "submitting"
  | "locked"
  | "error";

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
  // Uploads to Cloudinary and locks the pitch in permanently (see
  // upload-photo.service.ts's videoPitch check) — from this point on there
  // is no more redo/cancel, only a read-only playback.
  submitVideo: () => Promise<void>;
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
  // A previously-locked video pitch, from a resumed draft — arrives
  // asynchronously (once the draft fetch resolves), so it's applied via an
  // effect rather than read only at first render, same pattern as
  // usePhotoUpload's initialUrl.
  initialLockedUrl?: string;
}

export function useVideoRecorder({
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
  // Closes the window between "camera requested" and "stream assigned":
  // without this, two near-simultaneous requestCamera() calls (a double
  // click, a stray re-render) would both pass the streamRef.current check
  // before either await resolves, open two getUserMedia streams, and leak
  // whichever one loses the race to streamRef.current.
  const requestingCameraRef = useRef(false);
  // The latest previewUrl, mirrored for the unmount cleanup below — that
  // effect's own closure only ever sees the value from first render (its
  // dependency array is intentionally empty so it doesn't re-run mid
  // recording), so it needs a ref, not the state variable, to revoke the
  // right URL if the component unmounts mid-flow.
  const previewUrlRef = useRef(previewUrl);
  useEffect(() => {
    previewUrlRef.current = previewUrl;
  }, [previewUrl]);

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
      // A recorder left running past unmount (navigating away mid-take)
      // would otherwise keep the camera/mic stream alive indefinitely —
      // stop it before releasing the tracks, guarded the same way
      // stopRecording is, since it may already be inactive.
      if (recorderRef.current?.state === "recording") {
        recorderRef.current.stop();
      }
      releaseCamera();
      // Safe to revoke even when locked: a locked preview here is either
      // this session's own blob URL (nothing after unmount reads it again
      // on this instance) or the remote Cloudinary URL passed in via
      // initialLockedUrl (never created by this hook, so never ours to
      // revoke — revokeObjectURL on a non-blob URL is simply a no-op).
      if (previewUrlRef.current) {
        URL.revokeObjectURL(previewUrlRef.current);
      }
    },
    // Cleanup only — intentionally not re-run when previewUrl/etc. change.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  const requestCamera = useCallback(async () => {
    if (lockedRef.current || streamRef.current || requestingCameraRef.current) {
      return;
    }
    requestingCameraRef.current = true;
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
    } finally {
      requestingCameraRef.current = false;
    }
  }, []);

  const stopRecording = useCallback(() => {
    // Guards against a double call (a click landing the same tick as the
    // max-duration auto-stop) — MediaRecorder throws InvalidStateError if
    // stop() is called while already inactive.
    if (recorderRef.current?.state === "recording") {
      recorderRef.current.stop();
    }
  }, []);

  const startRecording = useCallback(() => {
    const stream = streamRef.current;
    // Also refuses to start a second recorder over a first still-active one.
    if (!stream || recorderRef.current?.state === "recording") return;

    chunksRef.current = [];
    const mimeType = pickSupportedMimeType();
    const recorder = new MediaRecorder(stream, {
      ...(mimeType ? { mimeType } : {}),
      videoBitsPerSecond: VIDEO_BITS_PER_SECOND,
      audioBitsPerSecond: AUDIO_BITS_PER_SECOND,
    });

    recorder.ondataavailable = (event) => {
      if (event.data.size > 0) chunksRef.current.push(event.data);
    };
    recorder.onstop = () => {
      stopTimer();
      releaseCamera();
      recorderRef.current = null;
      const blob = new Blob(chunksRef.current, {
        type: mimeType ?? "video/webm",
      });

      // Backstop for the rare browser/device that doesn't honor the
      // bitrate hints above — never let an oversized file reach preview
      // (and from there, upload) in the first place.
      if (blob.size > VIDEO_PITCH_MAX_BYTES) {
        setElapsedSeconds(0);
        setErrorMessage(
          "That recording came out too large. Please try again — a shorter take usually helps.",
        );
        setStatus("error");
        return;
      }

      const url = URL.createObjectURL(blob);
      // Functional update so this never depends on this callback's own
      // (necessarily stale, since it's captured once per recording) view
      // of previewUrl — an unsubmitted take replaced by a re-record would
      // otherwise leave its object URL unrevoked for the rest of the
      // session.
      setPreviewUrl((currentUrl) => {
        if (currentUrl) URL.revokeObjectURL(currentUrl);
        return url;
      });
      setRecordedBlob(blob);
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
          stopRecording();
        }
        return next;
      });
    }, 1000);
  }, [releaseCamera, stopRecording, stopTimer]);

  const reset = useCallback(() => {
    setPreviewUrl((currentUrl) => {
      if (currentUrl) URL.revokeObjectURL(currentUrl);
      return "";
    });
    setRecordedBlob(null);
    setElapsedSeconds(0);
    setErrorMessage(undefined);
    setStatus("idle");
  }, []);

  // From "preview" (after stopping) — discard this take and start over.
  const retake = reset;

  // From "live"/"recording" — bail out entirely without keeping anything.
  const cancelRecording = useCallback(() => {
    stopTimer();
    if (recorderRef.current?.state === "recording") {
      recorderRef.current.stop();
    }
    recorderRef.current = null;
    releaseCamera();
    reset();
  }, [releaseCamera, reset, stopTimer]);

  const submitVideo = useCallback(async () => {
    // Guards against a double click locking twice — the backend also
    // rejects a second lock (409), but there's no reason to let it happen
    // from here either.
    if (!recordedBlob || lockedRef.current) return;
    setStatus("submitting");
    setErrorMessage(undefined);
    try {
      const uploaded = await uploadToCloudinary("videoPitch", recordedBlob);
      await savePhoto({
        field: "videoPitch",
        url: uploaded.url,
        publicId: uploaded.publicId,
        bytes: uploaded.bytes,
      });
      lockedRef.current = true;
      setStatus("locked");
      // Deliberately not swapping previewUrl to the Cloudinary URL here —
      // the local object URL plays back identically and swapping would
      // revoke the blob preview mid-display; it's only revoked on retake
      // or unmount, same as any other preview.
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "We couldn't submit your video. Please try again.",
      );
      setStatus("preview");
    }
  }, [recordedBlob]);

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
