import styled, { keyframes } from "styled-components";

const stepIn = keyframes`
  from {
    opacity: 0;
    transform: translateX(10px);
  }
  to {
    opacity: 1;
    transform: none;
  }
`;

export const StepContent = styled.div`
  animation: ${stepIn} 380ms ease both;
`;

export const StepTitle = styled.h2`
  margin: 0;
  color: ${({ theme }) => theme.colors.primary.DEFAULT};
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: 28px;
  font-weight: 600;
  letter-spacing: -0.02em;
`;

export const StepHint = styled.p`
  margin: 7px 0 28px;
  color: ${({ theme }) => theme.colors.muted.foreground};
  font-size: 13px;
`;

export const LockedFieldsNote = styled.p`
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 0 0 20px;
  padding: 10px 14px;
  border-radius: ${({ theme }) => theme.radii.md};
  background: ${({ theme }) => theme.alpha(theme.colors.primary.DEFAULT, 0.08)};
  color: ${({ theme }) => theme.colors.primary.DEFAULT};
  font-size: 12px;
`;
