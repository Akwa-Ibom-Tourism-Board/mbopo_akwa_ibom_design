import { useRef, type ReactNode } from "react";
import {
  ChevronDown,
  GripHorizontal,
  MessageCircleQuestion,
  X,
} from "lucide-react";
import { useDraggable } from "../useDraggable";
import {
  Panel,
  Header,
  HeaderInfo,
  IconCircle,
  HeaderText,
  Title,
  Subtitle,
  HeaderActions,
  IconButton,
  Body,
} from "./WidgetContainer.styles";

export interface WidgetContainerProps {
  children: ReactNode;
  onClose: () => void;
  onMinimize: () => void;
}

export function WidgetContainer({
  children,
  onClose,
  onMinimize,
}: WidgetContainerProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const { offset, isDragging, handleProps } = useDraggable(panelRef);

  return (
    <Panel
      ref={panelRef}
      data-dragging={isDragging}
      style={{ transform: `translate3d(${offset.x}px, ${offset.y}px, 0)` }}
    >
      <Header>
        <HeaderInfo {...handleProps} title="Drag to move">
          <IconCircle>
            <MessageCircleQuestion size={16} />
          </IconCircle>
          <HeaderText>
            <Title>Ask Me</Title>
            <Subtitle>Send us a message, we&apos;ll get back to you</Subtitle>
          </HeaderText>
          <GripHorizontal size={14} opacity={0.6} />
        </HeaderInfo>
        <HeaderActions>
          <IconButton onClick={onMinimize} aria-label="Minimize">
            <ChevronDown size={16} />
          </IconButton>
          <IconButton onClick={onClose} aria-label="Close">
            <X size={16} />
          </IconButton>
        </HeaderActions>
      </Header>
      <Body>{children}</Body>
    </Panel>
  );
}
