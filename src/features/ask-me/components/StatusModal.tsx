import { CheckCircle2, AlertCircle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  Button,
} from "@/shared/ui";
import type { StatusModalState } from "../types";
import { Centered, IconFrame, Message } from "./StatusModal.styles";

export interface StatusModalProps extends StatusModalState {
  onClose: () => void;
}

export function StatusModal({
  open,
  onClose,
  title,
  message,
  type,
}: StatusModalProps) {
  return (
    <Dialog open={open} onOpenChange={(next) => !next && onClose()}>
      <DialogContent>
        <Centered>
          <IconFrame $type={type}>
            {type === "success" ? (
              <CheckCircle2 size={28} />
            ) : (
              <AlertCircle size={28} />
            )}
          </IconFrame>
          <DialogHeader>
            <DialogTitle style={{ textAlign: "center" }}>{title}</DialogTitle>
          </DialogHeader>
          <Message>{message}</Message>
          <Button
            onClick={onClose}
            variant="secondary"
            style={{ width: "100%", marginTop: "1rem" }}
          >
            Close
          </Button>
        </Centered>
      </DialogContent>
    </Dialog>
  );
}
