import styled from "styled-components";
import { fadeIn } from "@/theme";

export const PasswordFields = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 20px;
  animation: ${fadeIn} 300ms ease;
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

export const HintText = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.muted.foreground};
  font-size: 0.75rem;
`;
