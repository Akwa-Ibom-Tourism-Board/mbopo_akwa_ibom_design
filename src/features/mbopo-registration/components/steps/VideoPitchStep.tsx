import { useEffect, useState } from "react";
import {
  CheckCircle2,
  Info,
  PlayCircle,
  RotateCcw,
  Video,
  VideoOff,
  X,
} from "lucide-react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/shared/ui";
import { VIDEO_PITCH_MAX_SECONDS } from "../../constants";
import type { UseVideoRecorderResult } from "../useVideoRecorder";
import { StepContent, StepTitle, StepHint } from "../StepShell.styles";
import {
  InstructionsCard,
  LaunchCard,
  LaunchIcon,
  LaunchText,
  LockedCard,
  LockedThumb,
  LockedInfo,
  LockedTitle,
  LockedHint,
  RecordingDialogContent,
  Stage,
  StageVideo,
  StagePlaceholder,
  PlaceholderIcon,
  RecordingBadge,
  RecordingDot,
  StageActions,
  ErrorBanner,
  RequiredNotice,
} from "./VideoPitchStep.styles";

function formatSeconds(totalSeconds: number): string {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

export interface VideoPitchStepProps {
  recorder: UseVideoRecorderResult;
  showRequiredNotice: boolean;
}

export function VideoPitchStep({
  recorder,
  showRequiredNotice,
}: VideoPitchStepProps) {
  const {
    status,
    errorMessage,
    elapsedSeconds,
    previewUrl,
    liveVideoRef,
    playbackVideoRef,
    requestCamera,
    startRecording,
    stopRecording,
    retake,
    cancelRecording,
    submitVideo,
  } = recorder;

  const [dialogOpen, setDialogOpen] = useState(false);

  // The dialog is the only place recording happens, so closing it early —
  // Escape, overlay click, the X button — has to mean the same thing as
  // tapping Cancel: release the camera and discard anything not yet
  // submitted, rather than leaving a stream running or an unsubmitted take
  // sitting in memory behind a closed dialog.
  const handleOpenChange = (open: boolean) => {
    if (
      !open &&
      (status === "live" || status === "recording" || status === "preview")
    ) {
      cancelRecording();
    }
    setDialogOpen(open);
  };

  const openAndStart = () => {
    setDialogOpen(true);
    void requestCamera();
  };

  // Once the recording is locked in there's nothing left to do in the
  // dialog — auto-close so the applicant lands back on the compact,
  // read-only summary.
  useEffect(() => {
    if (status === "locked") setDialogOpen(false);
  }, [status]);

  return (
    <StepContent>
      <StepTitle>Your video pitch</StepTitle>
      <StepHint>
        Tell us, in your own words, what you&apos;d do to grow tourism in Akwa
        Ibom if you became Mbopo Akwa Ibom.
      </StepHint>

      <InstructionsCard>
        <Info size={16} aria-hidden />
        <span>
          <strong>Before you record:</strong> find a quiet, well-lit space with
          no background noise. Speak clearly and look at the camera.
          <ul>
            <li>Maximum length: {VIDEO_PITCH_MAX_SECONDS} seconds.</li>
            <li>Recording happens live, right here — no file uploads.</li>
            <li>
              You can watch it back, re-record or cancel as many times as you
              like — but once you tap <strong>Submit Video</strong>, it&apos;s
              final. It can&apos;t be re-recorded or replaced after that, even
              if you save the rest of your application as a draft and finish it
              later.
            </li>
          </ul>
        </span>
      </InstructionsCard>

      {status === "locked" ? (
        <LockedCard>
          <LockedThumb>
            <video src={previewUrl || undefined} muted playsInline />
          </LockedThumb>
          <LockedInfo>
            <LockedTitle>
              <CheckCircle2 size={15} aria-hidden /> Video pitch submitted
            </LockedTitle>
            <LockedHint>
              This can&apos;t be changed, but you can still watch it back.
            </LockedHint>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setDialogOpen(true)}
              style={{ alignSelf: "flex-start", marginTop: 4 }}
            >
              <PlayCircle size={15} /> Watch
            </Button>
          </LockedInfo>
        </LockedCard>
      ) : (
        <LaunchCard>
          <LaunchIcon>
            {status === "error" ? (
              <VideoOff size={22} aria-hidden />
            ) : (
              <Video size={22} aria-hidden />
            )}
          </LaunchIcon>
          <LaunchText>
            {status === "error"
              ? (errorMessage ?? "Camera unavailable.")
              : "Ready when you are — this opens your camera in a larger, distraction-free view."}
          </LaunchText>
          <Button type="button" variant="secondary" onClick={openAndStart}>
            <Video size={16} />
            {status === "error" ? "Try Again" : "Start Recording"}
          </Button>
        </LaunchCard>
      )}

      {showRequiredNotice && status !== "locked" && (
        <RequiredNotice>
          A video pitch is required. Record one and tap Submit Video to
          continue.
        </RequiredNotice>
      )}

      <Dialog open={dialogOpen} onOpenChange={handleOpenChange}>
        <RecordingDialogContent
          onInteractOutside={(event) => event.preventDefault()}
        >
          <DialogHeader>
            <DialogTitle>
              {status === "locked" ? "Your video pitch" : "Record your pitch"}
            </DialogTitle>
            <DialogDescription>
              {status === "locked"
                ? "Submitted and locked — this is a read-only playback."
                : "Frame yourself from the face to the chest, speak clearly, and take your time."}
            </DialogDescription>
          </DialogHeader>

          <Stage>
            <StageVideo
              ref={liveVideoRef}
              autoPlay
              muted
              playsInline
              style={{
                display:
                  status === "live" || status === "recording"
                    ? "block"
                    : "none",
              }}
            />
            <StageVideo
              ref={playbackVideoRef}
              src={previewUrl || undefined}
              controls
              playsInline
              style={{
                display:
                  status === "preview" || status === "locked"
                    ? "block"
                    : "none",
              }}
            />

            {(status === "idle" ||
              status === "requesting" ||
              status === "error") && (
              <StagePlaceholder>
                <PlaceholderIcon>
                  {status === "error" ? (
                    <VideoOff size={20} aria-hidden />
                  ) : (
                    <Video size={20} aria-hidden />
                  )}
                </PlaceholderIcon>
                {status === "requesting"
                  ? "Requesting camera access…"
                  : status === "error"
                    ? (errorMessage ?? "Camera unavailable.")
                    : "Your camera preview will appear here."}
              </StagePlaceholder>
            )}

            {status === "recording" && (
              <RecordingBadge>
                <RecordingDot />
                REC {formatSeconds(elapsedSeconds)} /{" "}
                {formatSeconds(VIDEO_PITCH_MAX_SECONDS)}
              </RecordingBadge>
            )}
          </Stage>

          <StageActions>
            {status === "idle" && (
              <Button
                type="button"
                variant="secondary"
                onClick={() => void requestCamera()}
              >
                <Video size={16} /> Start Camera
              </Button>
            )}
            {status === "error" && (
              <Button
                type="button"
                variant="secondary"
                onClick={() => void requestCamera()}
              >
                <Video size={16} /> Try Again
              </Button>
            )}
            {status === "live" && (
              <>
                <Button
                  type="button"
                  variant="secondary"
                  onClick={startRecording}
                >
                  <Video size={16} /> Start Recording
                </Button>
                <Button type="button" variant="ghost" onClick={cancelRecording}>
                  <X size={16} /> Cancel
                </Button>
              </>
            )}
            {status === "recording" && (
              <>
                <Button
                  type="button"
                  variant="destructive"
                  onClick={stopRecording}
                >
                  Stop Recording
                </Button>
                <Button type="button" variant="ghost" onClick={cancelRecording}>
                  <X size={16} /> Cancel
                </Button>
              </>
            )}
            {status === "preview" && (
              <>
                <Button type="button" variant="secondary" onClick={submitVideo}>
                  <CheckCircle2 size={16} /> Submit Video
                </Button>
                <Button type="button" variant="outline" onClick={retake}>
                  <RotateCcw size={16} /> Record Again
                </Button>
              </>
            )}
          </StageActions>

          {status === "error" && errorMessage && (
            <ErrorBanner>{errorMessage}</ErrorBanner>
          )}
        </RecordingDialogContent>
      </Dialog>
    </StepContent>
  );
}
