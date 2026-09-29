import styled, { keyframes } from "styled-components";

const pop = keyframes`
  from {
    opacity: 0;
    transform: scale(0.6);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

// grid-template-columns is the real fix here, not just a tidy-up: an
// implicit "auto" grid track (the default with no explicit columns) sizes
// to its content's max-content width — if anything inside SuccessCard
// couldn't break (the reference code, a long word), the track itself grew
// past the viewport instead of clamping to it, pushing the whole page
// wider and leaving blank space on the right when scrolled. Same class of
// bug as the dashboard's card grids; minmax(0, 1fr) is the same fix.
export const SuccessPage = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  min-height: 60vh;
  place-items: center;
  padding: clamp(12px, 4vw, 25px);
  border-radius: ${({ theme }) => theme.radii["2xl"]};
  background: ${({ theme }) => theme.gradients.panel};
`;

export const SuccessCard = styled.div`
  width: 100%;
  max-width: 600px;
  padding: clamp(24px, 7vw, 75px);
  border: 1px solid rgba(255, 255, 255, 0.16);
  border-radius: ${({ theme }) => theme.radii.xl};
  background: ${({ theme }) => theme.colors.heroDeep};
  color: ${({ theme }) => theme.colors.white};
  text-align: center;
  box-shadow: ${({ theme }) => theme.shadows.xl};
`;

export const SuccessIcon = styled.div`
  display: grid;
  width: 66px;
  height: 66px;
  margin: 0 auto 30px;
  place-items: center;
  border: 1px solid ${({ theme }) => theme.colors.secondary.DEFAULT};
  border-radius: 50%;
  color: ${({ theme }) => theme.colors.secondary.DEFAULT};
  animation: ${pop} 600ms ease both;
`;

export const Eyebrow = styled.p`
  margin: 0 0 15px;
  color: ${({ theme }) => theme.colors.secondary.DEFAULT};
  font-size: 10px;
  font-weight: 800;
  letter-spacing: 0.2em;
  text-transform: uppercase;
`;

export const SuccessTitle = styled.h1`
  margin: 0;
  overflow-wrap: anywhere;
  font-family: ${({ theme }) => theme.fonts.display};
  /* The old 38px floor never actually shrank on small phones — clamp's
     minimum bound is a hard floor, not a target, so this was rendering at
     a fixed 38px+ regardless of viewport. 28px reads properly at 320-375px
     widths without needing the 6vw term to fight it. */
  font-size: clamp(28px, 8vw, 58px);
  font-weight: 600;
  letter-spacing: -0.03em;
  line-height: 1.05;

  em {
    color: ${({ theme }) => theme.colors.secondary.DEFAULT};
    font-style: italic;
  }
`;

export const SuccessCopy = styled.p`
  max-width: 430px;
  margin: 24px auto 29px;
  overflow-wrap: anywhere;
  color: rgba(255, 255, 255, 0.7);
  font-size: 14px;
  line-height: 1.75;
`;

export const Reference = styled.p`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
  margin: 0 auto 33px;
  color: rgba(255, 255, 255, 0.45);
  font-size: 10px;
  font-weight: 800;
  letter-spacing: 0.16em;

  strong {
    overflow-wrap: anywhere;
    color: ${({ theme }) => theme.colors.secondary.DEFAULT};
    font-size: 17px;
    letter-spacing: 0.06em;
  }
`;
