import { useEffect } from "react";
import { Camera, CheckCircle2, Info, RotateCcw, VideoOff } from "lucide-react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/shared/ui";
import { useSelfieCamera } from "./useSelfieCamera";
import {
  ModalContent,
  InstructionsCard,
  Stage,
  StageVideo,
  CapturedImage,
  StagePlaceholder,
  PlaceholderIcon,
  PromptBadge,
  ReadyBadge,
  StageActions,
  ErrorBanner,
} from "./SelfieCaptureModal.styles";

export interface SelfieCaptureModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCaptured: (imageDataUrl: string) => void;
  isSubmitting: boolean;
  submitError?: string;
}

export function SelfieCaptureModal({
  open,
  onOpenChange,
  onCaptured,
  isSubmitting,
  submitError,
}: SelfieCaptureModalProps) {
  const {
    status,
    errorMessage,
    currentPrompt,
    capturedImage,
    videoRef,
    start,
    capture,
    retake,
    stop,
  } = useSelfieCamera();

  useEffect(() => {
    if (open) {
      void start();
    } else {
      stop();
    }
    // Only react to the dialog's own open/close — start/stop are stable
    // callbacks from useSelfieCamera, re-running this on their identity
    // would be a no-op but needlessly re-triggers the effect.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const handleOpenChange = (next: boolean) => {
    if (!next && isSubmitting) return;
    onOpenChange(next);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <ModalContent onInteractOutside={(event) => event.preventDefault()}>
        <DialogHeader>
          <DialogTitle>Confirm it's you</DialogTitle>
          <DialogDescription>
            We'll compare a quick photo against your NIN record to confirm your
            identity.
          </DialogDescription>
        </DialogHeader>

        <InstructionsCard>
          <Info size={15} aria-hidden />
          <span>
            Find a well-lit space, face the camera directly, and remove
            sunglasses or anything covering your face.
          </span>
        </InstructionsCard>

        <Stage>
          <StageVideo
            ref={videoRef}
            autoPlay
            muted
            playsInline
            style={{
              display:
                status === "guide" || status === "ready" ? "block" : "none",
            }}
          />
          {capturedImage && status === "captured" && (
            <CapturedImage src={capturedImage} alt="Your captured photo" />
          )}

          {(status === "idle" ||
            status === "requesting" ||
            status === "error") && (
            <StagePlaceholder>
              <PlaceholderIcon>
                {status === "error" ? (
                  <VideoOff size={20} aria-hidden />
                ) : (
                  <Camera size={20} aria-hidden />
                )}
              </PlaceholderIcon>
              {status === "requesting"
                ? "Requesting camera access…"
                : status === "error"
                  ? (errorMessage ?? "Camera unavailable.")
                  : "Your camera preview will appear here."}
            </StagePlaceholder>
          )}

          {status === "guide" && currentPrompt && (
            <PromptBadge>{currentPrompt}</PromptBadge>
          )}
          {status === "ready" && (
            <ReadyBadge>Ready — smile and capture</ReadyBadge>
          )}
        </Stage>

        <StageActions>
          {status === "error" && (
            <Button
              type="button"
              variant="secondary"
              onClick={() => void start()}
            >
              <Camera size={16} /> Try Again
            </Button>
          )}
          {status === "ready" && (
            <Button type="button" variant="secondary" onClick={capture}>
              <Camera size={16} /> Capture
            </Button>
          )}
          {status === "captured" && !isSubmitting && (
            <>
              <Button
                type="button"
                variant="secondary"
                onClick={() => capturedImage && onCaptured(capturedImage)}
              >
                <CheckCircle2 size={16} /> Use This Photo
              </Button>
              <Button type="button" variant="outline" onClick={retake}>
                <RotateCcw size={16} /> Retake
              </Button>
            </>
          )}
          {status === "captured" && isSubmitting && (
            <Button type="button" variant="secondary" disabled>
              Verifying…
            </Button>
          )}
        </StageActions>

        {submitError && <ErrorBanner>{submitError}</ErrorBanner>}
      </ModalContent>
    </Dialog>
  );
}
