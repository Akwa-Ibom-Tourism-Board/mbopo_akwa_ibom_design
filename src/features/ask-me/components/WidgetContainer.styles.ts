import styled from "styled-components";
import { media } from "@/theme";

export const Panel = styled.div`
  position: fixed;
  bottom: 1.5rem;
  right: 1.25rem;
  left: 1.25rem;
  z-index: ${({ theme }) => theme.zIndex.modal};
  margin-left: auto;
  width: calc(100% - 2.5rem);
  max-width: 24rem;
  max-height: 34rem;
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.colors.card};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii["2xl"]};
  box-shadow: ${({ theme }) => theme.shadows.xl};
  overflow: hidden;
  /* Dragging sets an inline transform (see useDraggable) — no transition
     while actively dragging, so the panel tracks the pointer exactly
     instead of lagging behind it. */
  &[data-dragging="true"] {
    transition: none;
  }

  ${media.sm} {
    left: auto;
    width: 24rem;
  }
`;

export const Header = styled.div`
  background: ${({ theme }) => theme.gradients.hero};
  padding: 1rem 1.25rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: ${({ theme }) => theme.colors.white};
`;

export const HeaderInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  min-width: 0;
  flex: 1;
  cursor: grab;
  touch-action: none;
  user-select: none;

  &:active {
    cursor: grabbing;
  }
`;

export const IconCircle = styled.div`
  width: 2.25rem;
  height: 2.25rem;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

export const HeaderText = styled.div`
  min-width: 0;
`;

export const Title = styled.h3`
  font-size: 0.875rem;
  font-weight: 700;
  margin: 0;
`;

export const Subtitle = styled.p`
  font-size: 0.75rem;
  opacity: 0.8;
  margin: 0;
`;

export const HeaderActions = styled.div`
  display: flex;
  gap: 0.35rem;
  flex-shrink: 0;
`;

export const IconButton = styled.button`
  width: 1.75rem;
  height: 1.75rem;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.15);
  border: none;
  color: ${({ theme }) => theme.colors.white};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background ${({ theme }) => theme.transitions.fast};

  &:hover {
    background: rgba(255, 255, 255, 0.25);
  }
`;

export const Body = styled.div`
  flex: 1;
  overflow-y: auto;
  background: ${({ theme }) => theme.colors.background};
`;
