import styled from "styled-components";
import { media } from "@/theme";

export const ConfirmationIcon = styled.div`
  display: grid;
  width: 56px;
  height: 56px;
  margin: 0 auto 20px;
  place-items: center;
  border: 1px solid ${({ theme }) => theme.colors.secondary.DEFAULT};
  border-radius: ${({ theme }) => theme.radii.full};
  color: ${({ theme }) => theme.colors.secondary.DEFAULT};

  ${media.lg} {
    margin: 0 0 20px;
  }
`;

export const ConfirmationCopy = styled.p`
  margin: 14px 0 0;
  color: ${({ theme }) => theme.colors.muted.foreground};
  font-size: 15px;
  line-height: 1.6;
  text-align: center;
  overflow-wrap: anywhere;

  strong {
    color: ${({ theme }) => theme.colors.foreground};
  }

  ${media.lg} {
    text-align: left;
  }
`;
