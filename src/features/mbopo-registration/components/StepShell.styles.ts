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

// Reused wherever a step asks for a photo or the video pitch — see
// PrivacyPage's "Photographs & Video Pitch" section for the full policy
// this is summarizing.
export const PrivacyNote = styled.p`
  display: flex;
  align-items: flex-start;
  gap: 8px;
  max-width: 460px;
  margin: 10px 0 0;
  color: ${({ theme }) => theme.colors.muted.foreground};
  font-size: 11.5px;
  line-height: 1.55;

  svg {
    flex: 0 0 auto;
    margin-top: 1px;
    color: ${({ theme }) => theme.colors.primary.DEFAULT};
  }

  a {
    color: ${({ theme }) => theme.colors.primary.DEFAULT};
    text-decoration: underline;
  }
`;
