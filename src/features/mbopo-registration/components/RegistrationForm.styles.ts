import styled from "styled-components";
import { media } from "@/theme";

export const Main = styled.div`
  display: grid;
  grid-template-columns: minmax(240px, 0.65fr) minmax(480px, 1.35fr);
  gap: clamp(32px, 6vw, 90px);
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding-bottom: 40px;

  @media (max-width: 850px) {
    grid-template-columns: 1fr;
    gap: 32px;
  }
`;

export const Intro = styled.div`
  padding-top: 8px;
`;

export const Eyebrow = styled.p`
  margin: 0 0 14px;
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
  font-size: clamp(30px, 4vw, 44px);
  font-weight: 600;
  letter-spacing: -0.03em;
  line-height: 1;

  em {
    color: ${({ theme }) => theme.colors.secondary.DEFAULT};
    font-style: italic;
  }
`;

export const IntroCopy = styled.p`
  max-width: 290px;
  margin: 20px 0;
  color: ${({ theme }) => theme.colors.muted.foreground};
  font-size: 14px;
  line-height: 1.75;
`;

export const FormCard = styled.section`
  padding: clamp(20px, 4vw, 40px);
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.xl};
  background: ${({ theme }) => theme.colors.card};
  box-shadow: ${({ theme }) => theme.shadows.md};

  ${media.md} {
    box-shadow: ${({ theme }) => theme.shadows.lg};
  }
`;

export const FormActions = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-top: 36px;
`;

export const FormActionsStart = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 12px;
`;

export const LoadingShell = styled.div`
  display: grid;
  min-height: 40vh;
  place-items: center;
  color: ${({ theme }) => theme.colors.muted.foreground};
  font-size: 0.875rem;
`;
