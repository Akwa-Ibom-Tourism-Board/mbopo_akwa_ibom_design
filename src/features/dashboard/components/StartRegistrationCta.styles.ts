import styled from "styled-components";
import { media } from "@/theme";

export const CtaCard = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: flex-start;
  padding: 28px;
  border-radius: ${({ theme }) => theme.radii["2xl"]};
  background: ${({ theme }) => theme.gradients.panel};
  color: ${({ theme }) => theme.colors.white};

  ${media.sm} {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
`;

export const CtaCopy = styled.div`
  max-width: 420px;
`;

export const CtaTitle = styled.h3`
  margin: 0 0 6px;
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: 1.25rem;
  font-weight: 600;
`;

export const CtaText = styled.p`
  margin: 0;
  color: rgba(255, 255, 255, 0.82);
  font-size: 0.875rem;
  line-height: 1.6;
`;
