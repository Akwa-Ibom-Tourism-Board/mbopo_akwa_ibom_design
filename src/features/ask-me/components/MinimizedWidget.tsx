import { ChevronUp, MessageCircleMore, X } from "lucide-react";
import {
  Bar,
  RestoreButton,
  IconCircle,
  CloseButton,
} from "./MinimizedWidget.styles";

export interface MinimizedWidgetProps {
  onRestore: () => void;
  onClose: () => void;
}

export function MinimizedWidget({ onRestore, onClose }: MinimizedWidgetProps) {
  return (
    <Bar>
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
