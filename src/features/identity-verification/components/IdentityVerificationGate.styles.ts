import styled from "styled-components";
import { media } from "@/theme";

export const Wrap = styled.div`
  max-width: 640px;
  margin: 0 auto;
`;

export const Intro = styled.div`
  margin-bottom: 24px;
`;

export const Eyebrow = styled.p`
  margin: 0 0 10px;
  color: ${({ theme }) => theme.colors.secondary.DEFAULT};
  font-size: 10px;
  font-weight: 800;
  letter-spacing: 0.2em;
  text-transform: uppercase;
`;

export const Title = styled.h1`
  margin: 0;
  color: ${({ theme }) => theme.colors.primary.DEFAULT};
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: clamp(24px, 3.4vw, 32px);
  font-weight: 600;
  letter-spacing: -0.02em;
`;

export const IntroCopy = styled.p`
  max-width: 520px;
  margin: 12px 0 0;
  color: ${({ theme }) => theme.colors.muted.foreground};
  font-size: 14px;
  line-height: 1.65;
`;

export const Card = styled.section`
  padding: clamp(20px, 4vw, 32px);
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.xl};
  background: ${({ theme }) => theme.colors.card};
  box-shadow: ${({ theme }) => theme.shadows.md};

  ${media.md} {
    box-shadow: ${({ theme }) => theme.shadows.lg};
  }
`;

export const FieldRow = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 20px 16px;

  @media (max-width: 560px) {
    grid-template-columns: 1fr;
  }
`;
