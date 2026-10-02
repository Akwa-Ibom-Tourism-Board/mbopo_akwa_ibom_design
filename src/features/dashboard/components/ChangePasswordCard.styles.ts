import styled from "styled-components";
import { media } from "@/theme";

export const PasswordForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
  max-width: 360px;
`;

export const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const ErrorText = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.destructive.DEFAULT};
  font-size: 0.8125rem;
`;

export const Divider = styled.hr`
  margin: 4px 0;
  border: none;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
`;

export const SubmitRow = styled.div`
  display: flex;
  justify-content: flex-start;

  button {
    width: 100%;
  }

  ${media.sm} {
    button {
      width: auto;
    }
  }
`;
