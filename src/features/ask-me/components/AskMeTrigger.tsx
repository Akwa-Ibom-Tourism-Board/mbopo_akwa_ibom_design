import { useRef } from "react";
import { MessageCircleMore } from "lucide-react";
import {
  useDraggable,
  WIDGET_SIDE_MARGIN,
  type WidgetPosition,
} from "../useDraggable";
import { Wrap, Trigger, Label } from "./AskMeTrigger.styles";

// Extra clearance below the Wrap's own "bottom" so the circular button
// lines up at the same visual floor as the panel/bar (see MinimizedWidget
// and WidgetContainer) despite the Label chip hanging further down.
const LABEL_CLEARANCE = 32;

export interface AskMeTriggerProps {
  onClick: () => void;
  position: WidgetPosition;
  onPositionChange: (next: WidgetPosition) => void;
}

export function AskMeTrigger({
  onClick,
  position,
  onPositionChange,
}: AskMeTriggerProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const { handleProps, draggedRef } = useDraggable(
    wrapRef,
    position,
    onPositionChange,
  );

  return (
    <Wrap
      ref={wrapRef}
      style={{
        [position.side]: `${WIDGET_SIDE_MARGIN}px`,
        bottom: `${position.bottom + LABEL_CLEARANCE}px`,
      }}
    >
      <Trigger
        {...handleProps}
        onClick={() => {
          // A drag's pointerup still fires a native click right after —
          // swallow it so dragging the bubble doesn't also open the form.
          if (draggedRef.current) return;
          onClick();
        }}
        aria-label="Open the Ask Me message form"
      >
        <MessageCircleMore size={26} />
      </Trigger>
      <Label>Ask Me</Label>
    </Wrap>
  );
}
