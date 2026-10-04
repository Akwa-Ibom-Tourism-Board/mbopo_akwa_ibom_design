import { useState } from "react";
import { AskMeTrigger } from "./AskMeTrigger";
import { AskMeForm } from "./AskMeForm";
import { MinimizedWidget } from "./MinimizedWidget";
import { StatusModal } from "./StatusModal";
import type { StatusModalState } from "../types";

export function AskMeWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [statusModal, setStatusModal] = useState<StatusModalState>({
    open: false,
    title: "",
    message: "",
    type: "success",
  });

  const openWidget = () => {
    setIsOpen(true);
    setIsMinimized(false);
  };

  const closeWidget = () => {
    setIsOpen(false);
    setIsMinimized(false);
  };

  const closeStatusModal = () =>
    setStatusModal((current) => ({ ...current, open: false }));

  const showSuccess = () =>
    setStatusModal({
      open: true,
      title: "Message sent",
      message:
        "Thanks for reaching out. We've received your message and will get back to you soon.",
      type: "success",
    });

  const showError = (message: string) =>
    setStatusModal({
      open: true,
      title: "Something went wrong",
      message,
      type: "error",
    });

  if (isMinimized && isOpen) {
    return (
      <>
        <MinimizedWidget
          onRestore={() => setIsMinimized(false)}
          onClose={closeWidget}
        />
        <StatusModal {...statusModal} onClose={closeStatusModal} />
      </>
    );
  }

  return (
    <>
      {!isOpen && <AskMeTrigger onClick={openWidget} />}

      {isOpen && (
        <AskMeForm
          onClose={closeWidget}
          onMinimize={() => setIsMinimized(true)}
          onSuccess={showSuccess}
          onError={showError}
        />
      )}

      <StatusModal {...statusModal} onClose={closeStatusModal} />
    </>
  );
}
