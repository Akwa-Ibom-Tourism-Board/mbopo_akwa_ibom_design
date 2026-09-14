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

export const SuccessPage = styled.div`
  display: grid;
  min-height: 100vh;
  place-items: center;
  padding: 25px;
  background: ${({ theme }) => theme.gradients.panel};
`;

export const SuccessCard = styled.div`
  max-width: 600px;
  padding: clamp(30px, 7vw, 75px);
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
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: clamp(38px, 6vw, 58px);
  font-weight: 600;
  letter-spacing: -0.03em;
  line-height: 1;

  em {
    color: ${({ theme }) => theme.colors.secondary.DEFAULT};
    font-style: italic;
  }
`;

export const SuccessCopy = styled.p`
  max-width: 430px;
  margin: 24px auto 29px;
  color: rgba(255, 255, 255, 0.7);
  font-size: 14px;
  line-height: 1.75;
`;

export const Reference = styled.p`
  display: flex;
  flex-direction: column;
  gap: 5px;
  margin: 0 auto 33px;
  color: rgba(255, 255, 255, 0.45);
  font-size: 10px;
  font-weight: 800;
  letter-spacing: 0.16em;

  strong {
    color: ${({ theme }) => theme.colors.secondary.DEFAULT};
    font-size: 17px;
    letter-spacing: 0.06em;
  }
`;
