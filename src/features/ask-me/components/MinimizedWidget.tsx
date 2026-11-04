import { useRef } from "react";
import { ChevronUp, MessageCircleMore, X } from "lucide-react";
import {
  useDraggable,
  WIDGET_SIDE_MARGIN,
  type WidgetPosition,
} from "../useDraggable";
import {
  Bar,
  RestoreButton,
  IconCircle,
  CloseButton,
} from "./MinimizedWidget.styles";

export interface MinimizedWidgetProps {
  onRestore: () => void;
  onClose: () => void;
  position: WidgetPosition;
  onPositionChange: (next: WidgetPosition) => void;
}

export function MinimizedWidget({
  onRestore,
  onClose,
  position,
  onPositionChange,
}: MinimizedWidgetProps) {
  const barRef = useRef<HTMLDivElement>(null);
  const { handleProps } = useDraggable(barRef, position, onPositionChange);

  return (
    <Bar
      ref={barRef}
      {...handleProps}
      style={{
        [position.side]: `${WIDGET_SIDE_MARGIN}px`,
        bottom: `${position.bottom}px`,
      }}
    >
      <RestoreButton onClick={onRestore}>
        <IconCircle>
          <MessageCircleMore size={16} />
        </IconCircle>
        Ask Me
        <ChevronUp size={16} />
      </RestoreButton>
      <CloseButton onClick={onClose} aria-label="Close">
        <X size={16} />
      </CloseButton>
    </Bar>
  );
}
