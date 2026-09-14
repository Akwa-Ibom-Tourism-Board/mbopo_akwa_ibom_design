import styled, { keyframes } from "styled-components";
import { Link } from "react-router-dom";
import { media } from "@/theme";

export const Hero = styled.section`
  position: relative;
  display: flex;
  overflow: hidden;
  min-height: min(900px, 100svh);
  color: ${({ theme }) => theme.colors.white};

  @media (max-width: 780px) {
    min-height: 100svh;
  }
`;

// A permanently blurred, dimmed backdrop — distinct from the sharp
// foreground portraits in HeroImageStage — so the carousel can change
// slides without the background ever competing for attention.
export const HeroBackdrop = styled.div<{ $image: string }>`
  position: absolute;
  inset: -5%;
  z-index: 0;
  background-image: url(${({ $image }) => $image});
  background-position: center;
  background-size: cover;
  filter: blur(10px) brightness(0.55) saturate(0.9);
  transform: scale(1.1);
`;

export const HeroScrim = styled.div`
  position: absolute;
  inset: 0;
  z-index: 1;
  background:
    linear-gradient(
      90deg,
      rgba(1, 24, 15, 0.82) 0%,
      rgba(1, 24, 15, 0.62) 40%,
      rgba(1, 24, 15, 0.3) 74%
    ),
    linear-gradient(0deg, rgba(1, 24, 15, 0.74) 0%, transparent 55%);

  @media (max-width: 780px) {
    background: linear-gradient(
      0deg,
      rgba(1, 24, 15, 0.91) 0%,
      rgba(1, 24, 15, 0.68) 47%,
      rgba(1, 24, 15, 0.3) 88%
    );
  }
`;

export const HeroInner = styled.div`
  position: relative;
  z-index: 2;
  display: grid;
  grid-template-columns: 1fr;
  align-items: center;
  gap: 32px;
  width: min(1240px, calc(100% - 48px));
  margin: 0 auto;
  padding: 146px 0 64px;

  ${media.lg} {
    grid-template-columns: 1.05fr 0.95fr;
    gap: 40px;
    padding: 146px 0 95px;
  }

  @media (max-width: 780px) {
    padding: 130px 0 48px;
  }
`;

export const HeroLogo = styled.img`
  height: 64px;
  width: auto;
  object-fit: contain;
  margin-bottom: 24px;

  ${media.lg} {
    height: 92px;
  }
`;

const slideIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(16px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const TextStage = styled.div`
  animation: ${slideIn} 200ms ease both;
`;

export const Kicker = styled.p`
  margin: 0 0 23px;
  color: ${({ theme }) => theme.colors.white};
  font-size: 10px;
  font-weight: 800;
  letter-spacing: 0.21em;
  line-height: 1.6;
  text-transform: uppercase;
`;

export const HeroTitle = styled.h1`
  max-width: 620px;
  margin: 0;
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: clamp(42px, 6.5vw, 84px);
  font-weight: 600;
  letter-spacing: -0.04em;
  line-height: 0.96;

  em {
    display: block;
    color: ${({ theme }) => theme.colors.secondary.DEFAULT};
    font-style: normal;
    font-size: 0.69em;
    letter-spacing: 0.015em;
    line-height: 1.1;
  }
`;

export const HeroRule = styled.div`
  width: 78px;
  height: 2px;
  margin: 28px 0 20px;
  background: ${({ theme }) => theme.colors.secondary.DEFAULT};
`;

export const HeroTagline = styled.p`
  margin: 0;
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: clamp(20px, 2.6vw, 30px);
  font-style: italic;
  color: ${({ theme }) => theme.colors.white};
`;

export const HeroCopy = styled.p`
  max-width: 490px;
  margin: 17px 0 31px;
  color: rgba(255, 255, 255, 0.84);
  font-size: 15px;
  line-height: 1.75;
`;

export const HeroActions = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 24px;
`;

export const PrimaryLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  min-height: 52px;
  padding: 0 24px;
  border: 1px solid transparent;
  border-radius: ${({ theme }) => theme.radii.full};
  background: ${({ theme }) => theme.colors.secondary.DEFAULT};
  color: ${({ theme }) => theme.colors.secondary.foreground};
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  box-shadow: 0 11px 25px
    ${({ theme }) => theme.alpha(theme.colors.secondary.DEFAULT, 0.3)};
  transition:
    transform ${({ theme }) => theme.transitions.fast},
    background-color ${({ theme }) => theme.transitions.fast};

  &:hover {
    background: ${({ theme }) => theme.alpha(theme.colors.secondary.DEFAULT, 0.9)};
    transform: translateY(-2px);
  }
`;

export const GhostLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  min-height: 52px;
  padding: 0 22px;
  border: 1px solid rgba(255, 255, 255, 0.55);
  border-radius: ${({ theme }) => theme.radii.full};
  color: ${({ theme }) => theme.colors.white};
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  transition:
    background-color ${({ theme }) => theme.transitions.fast},
    border-color ${({ theme }) => theme.transitions.fast};

  &:hover {
    border-color: ${({ theme }) => theme.colors.white};
    background: rgba(255, 255, 255, 0.12);
  }
`;

// Dots — navigate directly to a slide.
export const Dots = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const Dot = styled.button<{ $active: boolean }>`
  width: ${({ $active }) => ($active ? "22px" : "8px")};
  height: 8px;
  padding: 0;
  border: none;
  border-radius: 999px;
  background: ${({ theme, $active }) => ($active ? theme.colors.secondary.DEFAULT : "rgba(255, 255, 255, 0.35)")};
  cursor: pointer;
  transition:
    width ${({ theme }) => theme.transitions.fast},
    background-color ${({ theme }) => theme.transitions.fast};

  &:hover {
    background: ${({ theme, $active }) => ($active ? theme.colors.secondary.DEFAULT : "rgba(255, 255, 255, 0.6)")};
  }
`;

// Right column — the sharp foreground portrait for the active slide.
export const ImageStage = styled.div`
  position: relative;
  height: clamp(320px, 42vw, 520px);

  ${media.lg} {
    height: clamp(380px, 34vw, 560px);
  }
`;

const imageIn = keyframes`
  from {
    opacity: 0;
    transform: scale(0.97) translateY(10px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
`;

export const SlideImage = styled.img`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: contain;
  object-position: bottom center;
  filter: drop-shadow(0 24px 40px rgba(0, 0, 0, 0.45));
  animation: ${imageIn} 550ms ease both;
`;
