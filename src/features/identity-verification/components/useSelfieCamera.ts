import { useCallback, useEffect, useRef, useState } from "react";
// Type-only — erased at compile time, so this doesn't pull the (multi-MB)
// library into the app's main bundle. The actual runtime module is loaded
// lazily via dynamic import() below, only once the capture modal is
// opened, so every other page's initial load stays unaffected.
import type {
  FaceLandmarker,
  NormalizedLandmark,
} from "@mediapipe/tasks-vision";

export type SelfieCameraStatus =
  "idle" | "requesting" | "live" | "captured" | "error";

// The guided sequence the applicant must complete, in order, before a
// frame is auto-captured. Each step requires a genuine head movement or
// expression that a static printed/screen photo held up to the camera
// cannot reproduce — this is what makes the check a real liveness check
// rather than just an instructional overlay with no enforcement behind it.
export type LivenessPrompt =
  "center" | "turn_first" | "turn_second" | "mouth_open" | "confirm";

const STEPS: LivenessPrompt[] = [
  "center",
  "turn_first",
  "turn_second",
  "mouth_open",
  "confirm",
];

export interface UseSelfieCameraResult {
  status: SelfieCameraStatus;
  prompt: LivenessPrompt | null;
  faceVisible: boolean;
  errorMessage?: string;
  capturedImage: string | null;
  videoRef: React.RefObject<HTMLVideoElement | null>;
  start: () => Promise<void>;
  retake: () => void;
  stop: () => void;
}

// Self-hosted (see public/models/face_landmarker.task) so the verification
// flow doesn't depend on Google's model CDN being reachable; the generic
// WASM runtime itself is loaded from jsDelivr, pinned to the installed
// package version so an upstream release can't silently change behavior.
const WASM_FILESET_URL =
  "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@1.0.1/wasm";
const MODEL_ASSET_PATH = "/models/face_landmarker.task";

// Canonical indices in MediaPipe's face mesh topology: nose tip and the
// two outer cheek/face-contour points, used to estimate head yaw from
// plain landmark positions instead of decomposing the facial
// transformation matrix.
const NOSE_TIP = 1;
const RIGHT_CHEEK = 234;
const LEFT_CHEEK = 454;

// Inner upper/lower lip centers and the two mouth corners — used to
// compute a Mouth Aspect Ratio (vertical lip gap ÷ mouth width), the same
// scale-invariant metric used for blink/yawn detection in most MediaPipe
// face-geometry work. A plain landmark ratio rather than the "jawOpen"
// blendshape, deliberately — it's a bigger, less ambiguous signal than
// blink ever was, and avoids re-enabling blendshape output just for one
// step.
const UPPER_LIP = 13;
const LOWER_LIP = 14;
const MOUTH_LEFT_CORNER = 61;
const MOUTH_RIGHT_CORNER = 291;

// Starting points based on typical MediaPipe landmark/blendshape ranges,
// not yet tuned against this app's own camera hardware — if a step
// triggers too eagerly or feels unresponsive once tested on a real
// device, adjust these first.
const YAW_CENTER_THRESHOLD = 0.08;
const YAW_TURN_THRESHOLD = 0.18;
const MOUTH_OPEN_RATIO_THRESHOLD = 0.35;
// Lower than the "open" threshold on purpose (hysteresis, same reasoning
// as YAW_CENTER_THRESHOLD vs YAW_TURN_THRESHOLD) — the captured frame must
// never show an open mouth, so "confirm" re-checks this is clearly closed
// rather than just barely under the open threshold.
const MOUTH_CLOSED_RATIO_THRESHOLD = 0.2;
const HOLD_MS: Record<LivenessPrompt, number> = {
  center: 450,
  turn_first: 300,
  turn_second: 300,
  mouth_open: 300,
  confirm: 450,
};

// The raw (unmirrored) camera frame's left/right is the opposite of what
// the applicant sees in the mirrored preview, and which literal side a
// positive-vs-negative yaw value corresponds to isn't worth pinning down
// precisely — instead of labeling steps "turn left"/"turn right" and
// risking the instruction pointing the wrong way, "turn_first" accepts a
// deliberate turn in either direction and remembers its sign, then
// "turn_second" requires a turn past the same threshold in the opposite
// sign. Two genuine opposite turns is what proves liveness; which
// physical side gets called "first" doesn't matter.
function getYaw(landmarks: NormalizedLandmark[]): number {
  const nose = landmarks[NOSE_TIP];
  const right = landmarks[RIGHT_CHEEK];
  const left = landmarks[LEFT_CHEEK];
  if (!nose || !right || !left) return 0;
  const toRight = Math.abs(nose.x - right.x);
  const toLeft = Math.abs(left.x - nose.x);
  const total = toRight + toLeft;
  return total === 0 ? 0 : (toLeft - toRight) / total;
}

function getMouthOpenRatio(landmarks: NormalizedLandmark[]): number {
  const upper = landmarks[UPPER_LIP];
  const lower = landmarks[LOWER_LIP];
  const left = landmarks[MOUTH_LEFT_CORNER];
  const right = landmarks[MOUTH_RIGHT_CORNER];
  if (!upper || !lower || !left || !right) return 0;
  const gap = Math.hypot(upper.x - lower.x, upper.y - lower.y);
  const width = Math.hypot(left.x - right.x, left.y - right.y);
  return width === 0 ? 0 : gap / width;
}

async function createLandmarker(
  delegate: "GPU" | "CPU",
): Promise<FaceLandmarker> {
  const { FaceLandmarker: FaceLandmarkerImpl, FilesetResolver } =
    await import("@mediapipe/tasks-vision");
  const fileset = await FilesetResolver.forVisionTasks(WASM_FILESET_URL);
  return FaceLandmarkerImpl.createFromOptions(fileset, {
    baseOptions: { modelAssetPath: MODEL_ASSET_PATH, delegate },
    runningMode: "VIDEO",
    numFaces: 1,
  });
}

// Module-level singleton: the WASM runtime + model (a few MB) only need to
// load once per page session, not every time the capture modal opens.
let landmarkerPromise: Promise<FaceLandmarker> | null = null;
function getFaceLandmarker(): Promise<FaceLandmarker> {
  if (!landmarkerPromise) {
    landmarkerPromise = createLandmarker("GPU")
      .catch(() => createLandmarker("CPU"))
      // Don't cache a failure (e.g. a transient network blip loading the
      // WASM/model assets) — clear it so the next "Try Again" actually
      // retries instead of replaying the same rejected promise forever.
      .catch((error) => {
        landmarkerPromise = null;
        throw error;
      });
  }
  return landmarkerPromise;
}

export function useSelfieCamera(): UseSelfieCameraResult {
  const [status, setStatus] = useState<SelfieCameraStatus>("idle");
  const [prompt, setPrompt] = useState<LivenessPrompt | null>(null);
  const [faceVisible, setFaceVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>();
  const [capturedImage, setCapturedImage] = useState<string | null>(null);

  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const landmarkerRef = useRef<FaceLandmarker | null>(null);
  const requestingRef = useRef(false);
  const rafRef = useRef<number>(undefined);

  // Step-machine runtime state lives in refs, not state, so the per-frame
  // detection loop doesn't re-render on every tick — only actual prompt/
  // face-visibility changes do.
  const stepIndexRef = useRef(0);
  const holdStartRef = useRef<number | null>(null);
  const firstTurnSignRef = useRef<1 | -1 | null>(null);

  const releaseCamera = useCallback(() => {
    streamRef.current?.getTracks().forEach((track) => track.stop());
    streamRef.current = null;
  }, []);

  const stopDetectionLoop = useCallback(() => {
    if (rafRef.current !== undefined) cancelAnimationFrame(rafRef.current);
    rafRef.current = undefined;
  }, []);

  const resetSequence = useCallback(() => {
    stepIndexRef.current = 0;
    holdStartRef.current = null;
    firstTurnSignRef.current = null;
    setPrompt(STEPS[0] ?? null);
  }, []);

  const stop = useCallback(() => {
    stopDetectionLoop();
    releaseCamera();
    setStatus("idle");
    setCapturedImage(null);
    setErrorMessage(undefined);
    setPrompt(null);
    setFaceVisible(false);
  }, [releaseCamera, stopDetectionLoop]);

  useEffect(() => stop, [stop]);

  const captureFrame = useCallback(() => {
    const video = videoRef.current;
    if (!video || !video.videoWidth || !video.videoHeight) return null;
    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const context = canvas.getContext("2d");
    if (!context) return null;
    // Mirror the capture horizontally — the live preview is mirrored (see
    // SelfieCaptureModal) so the applicant sees themselves naturally while
    // following the prompts; drawing un-mirrored here would otherwise save
    // a left-right-flipped photo relative to what they just watched
    // themselves line up.
    context.translate(canvas.width, 0);
    context.scale(-1, 1);
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    return canvas.toDataURL("image/jpeg", 0.85);
  }, []);

  const runDetectionLoop = useCallback(() => {
    const tick = () => {
      const video = videoRef.current;
      const landmarker = landmarkerRef.current;
      if (!video || !landmarker) return;

      if (video.readyState >= 2) {
        try {
          const result = landmarker.detectForVideo(video, performance.now());
          const landmarks = result.faceLandmarks[0];

          const step = STEPS[stepIndexRef.current];

          if (!landmarks) {
            setFaceVisible(false);
            holdStartRef.current = null;
          } else if (!step) {
            // Unreachable by construction — the index only ever advances
            // to another valid step (see below) — guarded anyway since
            // this runs inside a per-frame hot loop.
          } else {
            setFaceVisible(true);
            const yaw = getYaw(landmarks);

            let satisfied = false;
            if (step === "center") {
              satisfied = Math.abs(yaw) <= YAW_CENTER_THRESHOLD;
            } else if (step === "turn_first") {
              satisfied = Math.abs(yaw) >= YAW_TURN_THRESHOLD;
              if (satisfied) firstTurnSignRef.current = yaw > 0 ? 1 : -1;
            } else if (step === "turn_second") {
              const wantSign = firstTurnSignRef.current;
              satisfied =
                wantSign !== null &&
                Math.sign(yaw) === -wantSign &&
                Math.abs(yaw) >= YAW_TURN_THRESHOLD;
            } else if (step === "mouth_open") {
              satisfied =
                getMouthOpenRatio(landmarks) >= MOUTH_OPEN_RATIO_THRESHOLD;
            } else if (step === "confirm") {
              // The frame that gets captured is whatever's on screen the
              // instant this is satisfied — re-checking the mouth is
              // closed here, not just that the head is centered, is what
              // actually guarantees an open-mouth frame never gets saved.
              satisfied =
                Math.abs(yaw) <= YAW_CENTER_THRESHOLD &&
                getMouthOpenRatio(landmarks) <= MOUTH_CLOSED_RATIO_THRESHOLD;
            }

            if (satisfied) {
              if (holdStartRef.current === null) {
                holdStartRef.current = performance.now();
              } else if (
                performance.now() - holdStartRef.current >=
                HOLD_MS[step]
              ) {
                holdStartRef.current = null;
                if (step === "confirm") {
                  const frame = captureFrame();
                  if (frame) {
                    setCapturedImage(frame);
                    setStatus("captured");
                    setPrompt(null);
                    stopDetectionLoop();
                    return;
                  }
                } else {
                  stepIndexRef.current += 1;
                  setPrompt(STEPS[stepIndexRef.current] ?? null);
                }
              }
            } else {
              holdStartRef.current = null;
            }
          }
        } catch {
          setErrorMessage(
            "The liveness check ran into a problem. Please try again.",
          );
          setStatus("error");
          stopDetectionLoop();
          return;
        }
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
  }, [captureFrame, stopDetectionLoop]);

  const start = useCallback(async () => {
    if (requestingRef.current || streamRef.current) return;
    requestingRef.current = true;
    setStatus("requesting");
    setErrorMessage(undefined);

    let stream: MediaStream;
    try {
      stream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 720 },
          height: { ideal: 720 },
          facingMode: "user",
        },
        audio: false,
      });
    } catch (error) {
      setErrorMessage(
        error instanceof DOMException && error.name === "NotAllowedError"
          ? "Camera access was denied. Please allow access and try again."
          : "We could not access your camera. Please check your device and try again.",
      );
      setStatus("error");
      requestingRef.current = false;
      return;
    }

    let landmarker: FaceLandmarker;
    try {
      landmarker = await getFaceLandmarker();
    } catch {
      stream.getTracks().forEach((track) => track.stop());
      setErrorMessage(
        "We could not load the liveness check. Please check your connection and try again.",
      );
      setStatus("error");
      requestingRef.current = false;
      return;
    }

    streamRef.current = stream;
    landmarkerRef.current = landmarker;
    if (videoRef.current) {
      videoRef.current.srcObject = stream;
      await videoRef.current.play().catch(() => {});
    }
    resetSequence();
    setStatus("live");
    runDetectionLoop();
    requestingRef.current = false;
  }, [resetSequence, runDetectionLoop]);

  const retake = useCallback(() => {
    if (!streamRef.current || !landmarkerRef.current) return;
    setCapturedImage(null);
    resetSequence();
    setStatus("live");
    runDetectionLoop();
  }, [resetSequence, runDetectionLoop]);

  return {
    status,
    prompt,
    faceVisible,
    errorMessage,
    capturedImage,
    videoRef,
    start,
    retake,
    stop,
  };
}
