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
