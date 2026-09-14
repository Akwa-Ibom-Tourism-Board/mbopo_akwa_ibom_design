import styled from "styled-components";

export const PageFrame = styled.div`
  padding: 56px 0 64px;
`;

export const FormCard = styled.div`
  max-width: 420px;
  margin: -80px auto 0;
  padding: 32px;
  border-radius: ${({ theme }) => theme.radii["2xl"]};
  background: ${({ theme }) => theme.colors.card};
  border: 1px solid ${({ theme }) => theme.colors.border};
  box-shadow: ${({ theme }) => theme.shadows.xl};
  position: relative;
  z-index: 1;
`;

export const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-bottom: 18px;
`;

export const ErrorText = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.destructive.DEFAULT};
  font-size: 0.8125rem;
`;

export const FormFooter = styled.p`
  margin: 18px 0 0;
  text-align: center;
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.muted.foreground};

  a {
    color: ${({ theme }) => theme.colors.primary.DEFAULT};
    font-weight: 600;
  }
`;
