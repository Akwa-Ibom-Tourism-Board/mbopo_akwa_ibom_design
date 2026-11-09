import styled, { keyframes } from "styled-components";

export const Body = styled.div`
  padding: 1.125rem;
`;

export const IntroText = styled.p`
  margin: 0 0 1rem;
  font-size: 0.8125rem;
  line-height: 1.5;
  color: ${({ theme }) => theme.colors.muted.foreground};
`;

export const Field = styled.div`
  margin-bottom: 1rem;
`;

export const LabelRow = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  margin-bottom: 0.4rem;
`;

export const OptionalTag = styled.span`
  font-size: 0.6875rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.muted.foreground};
`;

export const RequiredMark = styled.span`
  margin-left: 3px;
  color: ${({ theme }) => theme.colors.destructive.DEFAULT};
`;

export const ErrorText = styled.p`
  margin: 0.35rem 0 0;
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.destructive.DEFAULT};
`;

const spin = keyframes`
  to {
    transform: rotate(360deg);
  }
`;

export const Spinner = styled.span`
  display: inline-flex;
  animation: ${spin} 0.8s linear infinite;
`;

export const AttachmentsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 0.6rem;
`;

export const AttachmentRow = styled.div<{ $error?: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.45rem 0.6rem;
  border-radius: ${({ theme }) => theme.radii.md};
  background: ${({ theme, $error }) =>
    $error
      ? theme.alpha(theme.colors.destructive.DEFAULT, 0.08)
      : theme.colors.muted.DEFAULT};
  font-size: 0.75rem;
`;

export const AttachmentInfo = styled.div`
  flex: 1;
  min-width: 0;
`;

export const AttachmentName = styled.p`
  margin: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.foreground};
`;

export const AttachmentMeta = styled.p<{ $error?: boolean }>`
  margin: 0.1rem 0 0;
  color: ${({ theme, $error }) =>
    $error ? theme.colors.destructive.DEFAULT : theme.colors.muted.foreground};
`;

export const RemoveAttachmentButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 1.25rem;
  height: 1.25rem;
  flex-shrink: 0;
  border: none;
  border-radius: 999px;
  background: transparent;
  color: ${({ theme }) => theme.colors.muted.foreground};
  cursor: pointer;

  &:hover {
    background: ${({ theme }) => theme.alpha(theme.colors.destructive.DEFAULT, 0.12)};
    color: ${({ theme }) => theme.colors.destructive.DEFAULT};
  }
`;

export const AddAttachmentButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.5rem 0.75rem;
  border: 1px dashed ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  background: transparent;
  color: ${({ theme }) => theme.colors.muted.foreground};
  font-size: 0.75rem;
  font-weight: 600;
  cursor: pointer;

  &:hover {
    border-color: ${({ theme }) => theme.colors.secondary.DEFAULT};
    color: ${({ theme }) => theme.colors.secondary.DEFAULT};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;
