import styled, { keyframes } from "styled-components";
import { media } from "@/theme";

export const Frame = styled.aside`
  position: relative;
  display: none;
  flex: 0 0 50%;
  width: 50%;
  height: 100%;
  overflow: hidden;
  background: ${({ theme }) => theme.gradients.heroScene};

  ${media.lg} {
    display: block;
  }
`;

export const SlideFigure = styled.div<{ $active: boolean }>`
  position: absolute;
  inset: 0;
  opacity: ${({ $active }) => ($active ? 1 : 0)};
  transition: opacity 900ms ease;
`;

const zoomIn = keyframes`
  from { transform: translateX(-50%) scale(1); }
  to { transform: translateX(-50%) scale(1.06); }
`;

export const PortraitImage = styled.img<{ $active: boolean }>`
  position: absolute;
  bottom: 0;
  left: 50%;
  height: 94%;
  width: auto;
  max-width: none;
  object-fit: contain;
  object-position: bottom center;
  filter: drop-shadow(0 30px 50px rgba(0, 0, 0, 0.5));
  transform: translateX(-50%);
  animation: ${({ $active }) => ($active ? zoomIn : "none")} 7000ms ease-out
    both;
`;

export const TopScrim = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.3) 0%,
    transparent 30%
  );
`;

export const BottomScrim = styled.div`
  position: absolute;
  inset: 0;
  background: ${({ theme }) => `linear-gradient(
    to top,
    ${theme.colors.sectionDark} 0%,
    ${theme.alpha(theme.colors.sectionDark, 0.75)} 35%,
    transparent 65%
  )`};
`;

export const DotTexture = styled.div`
  position: absolute;
  inset: 0;
  opacity: 0.05;
  background-image: radial-gradient(
    circle,
    rgba(255, 255, 255, 0.6) 1px,
    transparent 1px
  );
  background-size: 28px 28px;
`;

export const ContentBlock = styled.div`
  position: absolute;
  inset: auto 0 108px;
  z-index: 2;
`;

// One of these renders per slide, stacked and cross-faded on the same
// $active flag and duration as PortraitImage, so the copy never shows a
// different slide's text over another slide's photo mid-transition.
export const ContentInner = styled.div<{ $active: boolean }>`
  position: relative;
  max-width: 480px;
  padding: 0 48px;
  opacity: ${({ $active }) => ($active ? 1 : 0)};
  transition: opacity 900ms ease;

  & + & {
    position: absolute;
    inset: 0;
  }
`;

export const EyebrowRow = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
`;

export const EyebrowRule = styled.span`
  width: 32px;
  height: 1px;
  background: ${({ theme }) => theme.colors.secondary.DEFAULT};
`;

export const Eyebrow = styled.span`
  color: ${({ theme }) => theme.alpha(theme.colors.secondary.DEFAULT, 0.9)};
  font-size: 10px;
  font-weight: 800;
  letter-spacing: 0.25em;
  text-transform: uppercase;
`;

export const Heading = styled.h2`
  margin: 0;
  color: ${({ theme }) => theme.colors.white};
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: clamp(28px, 2.6vw, 38px);
  font-weight: 700;
  line-height: 1.15;
`;

export const Quote = styled.p`
  margin: 16px 0 0;
  color: rgba(255, 255, 255, 0.78);
  font-size: 14.5px;
  line-height: 1.65;
`;

export const ControlsRow = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 32px;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 48px;
`;

export const Dots = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const Dot = styled.button<{ $active: boolean }>`
  width: ${({ $active }) => ($active ? "36px" : "18px")};
  height: 4px;
  padding: 0;
  border: none;
  border-radius: 999px;
  background: ${({ theme, $active }) => ($active ? theme.colors.secondary.DEFAULT : "rgba(255, 255, 255, 0.3)")};
  cursor: pointer;
  transition:
    width ${({ theme }) => theme.transitions.fast},
    background-color ${({ theme }) => theme.transitions.fast};

  &:hover {
    background: ${({ theme, $active }) => ($active ? theme.colors.secondary.DEFAULT : "rgba(255, 255, 255, 0.55)")};
  }
`;

export const Arrows = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const ArrowButton = styled.button`
  display: grid;
  place-items: center;
  width: 38px;
  height: 38px;
  border-radius: 50%;
  border: 1px solid rgba(255, 255, 255, 0.2);
  background: rgba(255, 255, 255, 0.1);
  color: ${({ theme }) => theme.colors.white};
  backdrop-filter: blur(6px);
  cursor: pointer;
  transition: background-color ${({ theme }) => theme.transitions.fast};

  &:hover {
    background: rgba(255, 255, 255, 0.2);
  }
`;

export const ProgressTrack = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 2;
  height: 2px;
  background: rgba(255, 255, 255, 0.12);
`;

const fill = keyframes`
  from { width: 0%; }
  to { width: 100%; }
`;

export const ProgressFill = styled.div<{ $duration: number; $paused: boolean }>`
  height: 100%;
  background: ${({ theme }) => theme.colors.secondary.DEFAULT};
  animation: ${fill} ${({ $duration }) => $duration}ms linear forwards;
  animation-play-state: ${({ $paused }) => ($paused ? "paused" : "running")};
`;
