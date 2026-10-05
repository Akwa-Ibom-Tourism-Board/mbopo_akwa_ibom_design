import { useCallback, useEffect, useRef, useState } from "react";

export type SelfieCameraStatus =
  "idle" | "requesting" | "live" | "captured" | "error";

export interface UseSelfieCameraResult {
  status: SelfieCameraStatus;
  errorMessage?: string;
  capturedImage: string | null;
  videoRef: React.RefObject<HTMLVideoElement | null>;
  start: () => Promise<void>;
  capture: () => void;
  retake: () => void;
  stop: () => void;
}

export function useSelfieCamera(): UseSelfieCameraResult {
  const [status, setStatus] = useState<SelfieCameraStatus>("idle");
  const [errorMessage, setErrorMessage] = useState<string>();
  const [capturedImage, setCapturedImage] = useState<string | null>(null);

  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const requestingRef = useRef(false);

  const releaseCamera = useCallback(() => {
    streamRef.current?.getTracks().forEach((track) => track.stop());
    streamRef.current = null;
  }, []);

  const stop = useCallback(() => {
    releaseCamera();
    setStatus("idle");
    setCapturedImage(null);
    setErrorMessage(undefined);
  }, [releaseCamera]);

  useEffect(() => stop, [stop]);

  const start = useCallback(async () => {
    if (requestingRef.current || streamRef.current) return;
    requestingRef.current = true;
    setStatus("requesting");
    setErrorMessage(undefined);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 720 },
          height: { ideal: 720 },
          facingMode: "user",
        },
        audio: false,
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play().catch(() => {});
      }
      setStatus("live");
    } catch (error) {
      const message =
        error instanceof DOMException && error.name === "NotAllowedError"
          ? "Camera access was denied. Please allow access and try again."
          : "We could not access your camera. Please check your device and try again.";
      setErrorMessage(message);
      setStatus("error");
    } finally {
      requestingRef.current = false;
    }
  }, []);

  const capture = useCallback(() => {
    const video = videoRef.current;
    if (!video || !video.videoWidth || !video.videoHeight) return;
    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const context = canvas.getContext("2d");
    if (!context) return;
    // Mirror the capture horizontally — the live preview is mirrored (see
    // SelfieCaptureModal) so the applicant sees themselves naturally while
    // framing the shot; drawing un-mirrored here would otherwise save a
    // left-right-flipped photo relative to what they just watched
    // themselves line up.
    context.translate(canvas.width, 0);
    context.scale(-1, 1);
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    setCapturedImage(canvas.toDataURL("image/jpeg", 0.85));
    setStatus("captured");
  }, []);

  const retake = useCallback(() => {
    setCapturedImage(null);
    setStatus("live");
  }, []);

  return {
    status,
    errorMessage,
    capturedImage,
    videoRef,
    start,
    capture,
    retake,
    stop,
  };
}
