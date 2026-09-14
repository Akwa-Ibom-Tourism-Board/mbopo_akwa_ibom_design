import styled from "styled-components";
import { Link } from "react-router-dom";
import { media } from "@/theme";

export const PageShellFrame = styled.div`
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.muted.DEFAULT};
`;

export const TopBar = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 72px;
  padding: 0 max(20px, calc((100% - 1130px) / 2));
  background: ${({ theme }) => theme.colors.primary.DEFAULT};
  color: ${({ theme }) => theme.colors.white};
`;

export const TopBarLogo = styled.img`
  height: 40px;
  width: auto;
  object-fit: contain;
`;

export const BackToDashboard = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 7px;
  margin-bottom: 28px;
  color: ${({ theme }) => theme.colors.muted.foreground};
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;

  &:hover {
    color: ${({ theme }) => theme.colors.primary.DEFAULT};
  }
`;

export const TopBarLabel = styled.span`
  color: rgba(255, 255, 255, 0.6);
  font-size: 10px;
  font-weight: 800;
  letter-spacing: 0.17em;
`;

export const Main = styled.main`
  display: grid;
  grid-template-columns: minmax(240px, 0.65fr) minmax(480px, 1.35fr);
  gap: clamp(32px, 6vw, 90px);
  width: min(1130px, calc(100% - 40px));
  margin: 0 auto;
  padding: 56px 0 90px;

  @media (max-width: 850px) {
    grid-template-columns: 1fr;
    padding: 40px 0 70px;
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
  font-size: clamp(34px, 4.5vw, 52px);
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
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-top: 36px;
`;
