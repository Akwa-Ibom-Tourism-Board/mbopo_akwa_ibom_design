import styled from "styled-components";
import { Link } from "react-router-dom";
import { media } from "@/theme";

export const Section = styled.section`
  padding: 100px 0;
  background: ${({ theme }) => theme.colors.muted.DEFAULT};
`;

export const SectionShell = styled.div`
  width: min(1120px, calc(100% - 48px));
  margin: 0 auto;
`;

export const Header = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 44px;
  text-align: center;
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
  margin: 0 auto;
  max-width: 560px;
  color: ${({ theme }) => theme.colors.primary.DEFAULT};
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: clamp(30px, 4.5vw, 46px);
  font-weight: 600;
  letter-spacing: -0.02em;
`;

export const Subtitle = styled.p`
  margin: 0 auto;
  max-width: 480px;
  color: ${({ theme }) => theme.colors.muted.foreground};
  font-size: 14px;
  line-height: 1.7;
`;

export const CriteriaGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 16px;
  margin-bottom: 40px;
`;

export const CriteriaCard = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 22px;
  border-radius: ${({ theme }) => theme.radii.xl};
  background: ${({ theme }) => theme.colors.card};
  border: 1px solid ${({ theme }) => theme.colors.border};
  box-shadow: ${({ theme }) => theme.shadows.sm};
  transition:
    transform ${({ theme }) => theme.transitions.fast},
    box-shadow ${({ theme }) => theme.transitions.fast};

  &:hover {
    transform: translateY(-3px);
    box-shadow: ${({ theme }) => theme.shadows.md};
  }
`;

export const CriteriaIcon = styled.span`
  display: grid;
  flex: 0 0 auto;
  width: 38px;
  height: 38px;
  place-items: center;
  border-radius: 50%;
  background: ${({ theme }) => theme.alpha(theme.colors.primary.DEFAULT, 0.1)};
  color: ${({ theme }) => theme.colors.primary.DEFAULT};
`;

export const CriteriaText = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.foreground};
  font-size: 14px;
  font-weight: 600;
  line-height: 1.5;
`;

export const CtaRow = styled.div`
  display: flex;
  justify-content: center;
`;

export const RegisterLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  min-height: 52px;
  padding: 0 26px;
  border-radius: ${({ theme }) => theme.radii.full};
  background: ${({ theme }) => theme.colors.primary.DEFAULT};
  color: ${({ theme }) => theme.colors.primary.foreground};
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  box-shadow: ${({ theme }) => theme.shadows.elegant};
  transition: transform ${({ theme }) => theme.transitions.fast};

  &:hover {
    transform: translateY(-2px);
  }

  ${media.sm} {
    align-self: center;
  }
`;
