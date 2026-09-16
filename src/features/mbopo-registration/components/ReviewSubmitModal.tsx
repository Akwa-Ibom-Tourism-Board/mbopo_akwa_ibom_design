import {
  Button,
  Dialog,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/shared/ui";
import type { User } from "@/features/auth";
import type { RegistrationFormValues } from "../schema";
import type { RegistrationPhotoDataUrls } from "../types";
import { ApplicationSummary } from "./ApplicationSummary";
import {
  WideDialogContent,
  ScrollArea,
  ConfirmNotice,
} from "./ReviewSubmitModal.styles";

export interface ReviewSubmitModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user: User;
  values: RegistrationFormValues;
  photos: RegistrationPhotoDataUrls;
  isSubmitting: boolean;
  onConfirm: () => void;
}

export function ReviewSubmitModal({
  open,
  onOpenChange,
  user,
  values,
  photos,
  isSubmitting,
  onConfirm,
}: ReviewSubmitModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <WideDialogContent
        onInteractOutside={(event) => isSubmitting && event.preventDefault()}
        onEscapeKeyDown={(event) => isSubmitting && event.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>Review your application</DialogTitle>
          <DialogDescription>
            Please check everything below carefully. Once submitted, you
            won&apos;t be able to edit your application.
          </DialogDescription>
        </DialogHeader>

        <ScrollArea>
          <ApplicationSummary user={user} values={values} photos={photos} />
        </ScrollArea>

        <ConfirmNotice>
          By submitting, you confirm the declarations you made on the final step
          of this form are true and accurate.
        </ConfirmNotice>

        <DialogFooter>
          <Button
            type="button"
            variant="ghost"
            onClick={() => onOpenChange(false)}
            disabled={isSubmitting}
          >
            Continue editing
          </Button>
          <Button
            type="button"
            variant="secondary"
            size="lg"
            onClick={onConfirm}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting…" : "Confirm & Submit"}
          </Button>
        </DialogFooter>
      </WideDialogContent>
    </Dialog>
  );
}
