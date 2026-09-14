import styled from "styled-components";

export const PageFrame = styled.div`
  padding: 56px 0 64px;
`;

export const FormCard = styled.div`
  max-width: 440px;
  margin: -80px auto 0;
  padding: 32px;
  border-radius: ${({ theme }) => theme.radii["2xl"]};
  background: ${({ theme }) => theme.colors.card};
  border: 1px solid ${({ theme }) => theme.colors.border};
  box-shadow: ${({ theme }) => theme.shadows.xl};
  position: relative;
  z-index: 1;
  text-align: center;
`;

export const FormTitle = styled.h2`
  margin: 0 0 6px;
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: 1.375rem;
  font-weight: 600;
`;

export const FormCopy = styled.p`
  margin: 0 0 24px;
  color: ${({ theme }) => theme.colors.muted.foreground};
  font-size: 0.875rem;
  line-height: 1.6;

  strong {
    color: ${({ theme }) => theme.colors.foreground};
  }
`;

export const ErrorBanner = styled.p`
  margin: 0 0 16px;
  padding: 10px 14px;
  border-radius: ${({ theme }) => theme.radii.md};
  background: ${({ theme }) => theme.alpha(theme.colors.destructive.DEFAULT, 0.1)};
  color: ${({ theme }) => theme.colors.destructive.DEFAULT};
  font-size: 0.8125rem;
`;
