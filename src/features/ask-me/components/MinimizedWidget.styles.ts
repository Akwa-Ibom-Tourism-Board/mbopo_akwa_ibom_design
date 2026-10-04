import styled from "styled-components";

export const Bar = styled.div`
  position: fixed;
  bottom: 1.5rem;
  right: 1.25rem;
  z-index: ${({ theme }) => theme.zIndex.modal};
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: ${({ theme }) => theme.colors.card};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii["2xl"]};
  box-shadow: ${({ theme }) => theme.shadows.xl};
  padding: 0.6rem 0.9rem;
`;

export const RestoreButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.6rem;
  background: none;
  border: none;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.foreground};
  font-size: 0.8125rem;
  font-weight: 600;
`;

export const IconCircle = styled.div`
  width: 2rem;
  height: 2rem;
  border-radius: 999px;
  background: ${({ theme }) => theme.alpha(theme.colors.secondary.DEFAULT, 0.14)};
  color: ${({ theme }) => theme.colors.secondary.DEFAULT};
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const CloseButton = styled.button`
  width: 1.75rem;
  height: 1.75rem;
  border-radius: 999px;
  border: none;
  background: transparent;
  color: ${({ theme }) => theme.colors.muted.foreground};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;
