import { useState } from "react";
import { AskMeTrigger } from "./AskMeTrigger";
import { AskMeForm } from "./AskMeForm";
import { MinimizedWidget } from "./MinimizedWidget";
import { StatusModal } from "./StatusModal";
import type { StatusModalState } from "../types";
import type { WidgetPosition } from "../useDraggable";

const DEFAULT_POSITION: WidgetPosition = { side: "right", bottom: 24 };

export function AskMeWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  // Shared across the trigger bubble, the open form, and the minimized
  // bar, so dragging any one of them keeps the widget where you left it
  // as it switches between those states.
  const [position, setPosition] = useState<WidgetPosition>(DEFAULT_POSITION);
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
        "Thanks for reaching out. We have received your message, and someone will respond soon via the email address you provided.",
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
          position={position}
          onPositionChange={setPosition}
        />
        <StatusModal {...statusModal} onClose={closeStatusModal} />
      </>
    );
  }

  return (
    <>
      {!isOpen && (
        <AskMeTrigger
          onClick={openWidget}
          position={position}
          onPositionChange={setPosition}
        />
      )}

      {isOpen && (
        <AskMeForm
          onClose={closeWidget}
          onMinimize={() => setIsMinimized(true)}
          onSuccess={showSuccess}
          onError={showError}
          position={position}
          onPositionChange={setPosition}
        />
      )}

      <StatusModal {...statusModal} onClose={closeStatusModal} />
    </>
  );
}
