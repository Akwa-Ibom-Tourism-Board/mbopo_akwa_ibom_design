import styled from "styled-components";
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

export const RewardsGrid = styled.div`
  display: grid;
  gap: 1px;
  background: rgba(255, 255, 255, 0.1);
  grid-template-columns: 1fr;

  ${media.lg} {
    grid-template-columns: repeat(3, 1fr);
  }
`;

export const RewardCard = styled.div`
  display: flex;
  flex-direction: column;
  // gap: 14px;
  padding: 32px 28px;
  background: ${({ theme }) => theme.colors.sectionDarkCard};
  text-align: center;
  align-items: center;
`;

export const RewardIcon = styled.div`
  display: grid;
  width: 52px;
  height: 52px;
  flex: 0 0 auto;
  place-items: center;
  border-radius: 50%;
  background: ${({ theme }) => theme.alpha(theme.colors.secondary.DEFAULT, 0.14)};
  color: ${({ theme }) => theme.colors.secondary.DEFAULT};
`;

export const RewardTitle = styled.h3`
  margin: 0;
  color: ${({ theme }) => theme.colors.white};
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: 18px;
  font-weight: 700;
`;

export const RewardText = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.white};
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: 18px;
  font-weight: 700;
`;
