import styled from "styled-components";
import { media } from "@/theme";

export const Stack = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const Greeting = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.muted.foreground};
  font-size: 0.9375rem;
`;

export const CardGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;

  ${media.lg} {
    grid-template-columns: 1fr 1fr;
  }
`;

export const LoadingText = styled.p`
  color: ${({ theme }) => theme.colors.muted.foreground};
  font-size: 0.875rem;
`;
