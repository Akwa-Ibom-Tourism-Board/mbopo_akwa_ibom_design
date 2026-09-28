import {
  CheckCircle2,
  Info,
  RotateCcw,
  Video,
  VideoOff,
  X,
} from "lucide-react";
import { Button } from "@/shared/ui";
import { VIDEO_PITCH_MAX_SECONDS } from "../../constants";
import type { UseVideoRecorderResult } from "../useVideoRecorder";
import { StepContent, StepTitle, StepHint } from "../StepShell.styles";
import {
  InstructionsCard,
  Stage,
  StageVideo,
  StagePlaceholder,
  PlaceholderIcon,
  RecordingBadge,
  RecordingDot,
  StageActions,
  ErrorBanner,
  RequiredNotice,
  LockedNotice,
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

      <Stage>
        <StageVideo
          ref={liveVideoRef}
          autoPlay
          muted
          playsInline
          style={{
            display:
              status === "live" || status === "recording" ? "block" : "none",
          }}
        />
        <StageVideo
          ref={playbackVideoRef}
          src={previewUrl || undefined}
          controls
          playsInline
          style={{
            display:
              status === "preview" || status === "locked" ? "block" : "none",
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
                : "Your camera preview will appear here once you start."}
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
            <Button type="button" variant="secondary" onClick={startRecording}>
              <Video size={16} /> Start Recording
            </Button>
            <Button type="button" variant="ghost" onClick={cancelRecording}>
              <X size={16} /> Cancel
            </Button>
          </>
        )}
        {status === "recording" && (
          <>
            <Button type="button" variant="destructive" onClick={stopRecording}>
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

      {status === "locked" && (
        <LockedNotice>
          <CheckCircle2 size={14} aria-hidden /> Your video pitch has been
          submitted and can&apos;t be changed.
        </LockedNotice>
      )}
      {status === "error" && errorMessage && (
        <ErrorBanner>{errorMessage}</ErrorBanner>
      )}
      {showRequiredNotice && status !== "locked" && (
        <RequiredNotice>
          A video pitch is required. Record one and tap Submit Video to
          continue.
        </RequiredNotice>
      )}
    </StepContent>
  );
}
