import styled from "styled-components";
import { Link } from "react-router-dom";
import { media } from "@/theme";

export const Section = styled.section`
  position: relative;
  overflow: hidden;
  padding: 96px 0;
  background: ${({ theme }) => theme.colors.sectionDark};
  color: ${({ theme }) => theme.colors.white};
  background-image: radial-gradient(
    circle,
    rgba(255, 255, 255, 0.6) 1px,
    transparent 1px
  );
  background-size: 28px 28px;
  background-position: center;
`;

export const SectionShell = styled.div`
  position: relative;
  width: min(1120px, calc(100% - 48px));
  margin: 0 auto;
`;

export const Header = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  margin-bottom: 44px;
  text-align: center;
`;

export const EyebrowRow = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const EyebrowRule = styled.span`
  width: 40px;
  height: 1px;
  background: ${({ theme }) => theme.colors.secondary.DEFAULT};
`;

export const Eyebrow = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.secondary.DEFAULT};
  font-size: 10px;
  font-weight: 800;
  letter-spacing: 0.22em;
  text-transform: uppercase;
`;

export const Title = styled.h2`
  margin: 0;
  max-width: 560px;
  color: ${({ theme }) => theme.colors.white};
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: clamp(30px, 4.5vw, 46px);
  font-weight: 600;
  letter-spacing: -0.02em;
`;

export const Subtitle = styled.p`
  margin: 0 auto;
  max-width: 480px;
  color: rgba(255, 255, 255, 0.7);
  font-size: 14px;
  line-height: 1.7;
`;

export const Panel = styled.div`
  overflow: hidden;
  border-radius: ${({ theme }) => theme.radii["2xl"]};
  border: 1px solid rgba(255, 255, 255, 0.1);
`;

export const PanelHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 22px 24px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(255, 255, 255, 0.04);

  ${media.sm} {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 22px 32px;
  }
`;

export const PanelHeading = styled.h3`
  margin: 0;
  color: ${({ theme }) => theme.colors.white};
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: 20px;
  font-weight: 700;
`;

export const PanelSubheading = styled.p`
  margin: 4px 0 0;
  color: rgba(255, 255, 255, 0.6);
  font-size: 13px;
`;

export const RequiredBadge = styled.span`
  display: inline-flex;
  width: fit-content;
  align-items: center;
  gap: 8px;
  padding: 7px 14px;
  border: 1px solid
    ${({ theme }) => theme.alpha(theme.colors.secondary.DEFAULT, 0.4)};
  border-radius: ${({ theme }) => theme.radii.full};
  color: ${({ theme }) => theme.colors.secondary.DEFAULT};
  font-size: 10px;
  font-weight: 800;
  letter-spacing: 0.18em;
  text-transform: uppercase;

  svg {
    flex: 0 0 auto;
  }
`;

export const CriteriaGrid = styled.div`
  display: grid;
  gap: 1px;
  background: rgba(255, 255, 255, 0.1);
  grid-template-columns: 1fr;

  ${media.sm} {
    grid-template-columns: repeat(2, 1fr);
  }

  ${media.lg} {
    grid-template-columns: repeat(3, 1fr);
  }
`;

export const CriteriaCard = styled.div`
  display: flex;
  gap: 16px;
  padding: 24px;
  background: ${({ theme }) => theme.colors.sectionDarkCard};
`;

export const CriteriaIndex = styled.span`
  display: grid;
  flex: 0 0 auto;
  width: 32px;
  height: 32px;
  place-items: center;
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 50%;
  color: ${({ theme }) => theme.colors.secondary.DEFAULT};
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: 12px;
  font-weight: 700;
`;

export const CriteriaText = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.white};
  font-size: 14px;
  font-weight: 600;
  line-height: 1.5;
`;

export const CtaCell = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 12px;
  padding: 24px;
  background: ${({ theme }) => theme.alpha(theme.colors.secondary.DEFAULT, 0.12)};
`;

export const CtaCellText = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.white};
  font-size: 14px;
  font-weight: 700;
`;

export const RegisterLink = styled(Link)`
  display: inline-flex;
  width: fit-content;
  align-items: center;
  gap: 8px;
  padding: 11px 20px;
  border-radius: ${({ theme }) => theme.radii.full};
  background: ${({ theme }) => theme.colors.secondary.DEFAULT};
  color: ${({ theme }) => theme.colors.secondary.foreground};
  font-size: 12px;
  font-weight: 800;
  box-shadow: ${({ theme }) => theme.shadows.cta};
  transition:
    transform ${({ theme }) => theme.transitions.fast},
    background-color ${({ theme }) => theme.transitions.fast};

  &:hover {
    transform: translateY(-2px);
    background: ${({ theme }) => theme.alpha(theme.colors.secondary.DEFAULT, 0.9)};
  }
`;
