import styled from "styled-components";

export const Section = styled.section`
  padding: 110px 0 122px;
  background: ${({ theme }) => theme.colors.primary.DEFAULT};
  color: ${({ theme }) => theme.colors.white};
  background-image: radial-gradient(
    circle at 88% 18%,
    ${({ theme }) => theme.alpha(theme.colors.highlight, 0.15)} 0 1px,
    transparent 1.5px
  );
  background-size: 21px 21px;
`;

export const SectionShell = styled.div`
  width: min(1120px, calc(100% - 48px));
  margin: 0 auto;
`;

export const Eyebrow = styled.p`
  margin: 0 0 16px;
  color: ${({ theme }) => theme.alpha(theme.colors.secondary.DEFAULT, 1)};
  font-size: 10px;
  font-weight: 800;
  letter-spacing: 0.22em;
  text-transform: uppercase;
`;

export const Heading = styled.h2`
  margin: 0;
  color: ${({ theme }) => theme.colors.white};
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: clamp(36px, 5.5vw, 60px);
  font-weight: 600;
  letter-spacing: -0.03em;
  line-height: 1.02;

  em {
    color: ${({ theme }) => theme.colors.secondary.DEFAULT};
    font-style: italic;
  }
`;

export const Benefits = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0 70px;
  margin-top: 68px;

  @media (max-width: 780px) {
    grid-template-columns: 1fr;
  }
`;

export const Benefit = styled.div`
  display: flex;
  gap: 18px;
  padding: 24px 0;
  border-top: 1px solid rgba(255, 255, 255, 0.19);
`;

export const BenefitIcon = styled.span`
  display: grid;
  width: 30px;
  height: 30px;
  flex: 0 0 auto;
  place-items: center;
  border: 1px solid ${({ theme }) => theme.colors.highlight};
  border-radius: 50%;
  color: ${({ theme }) => theme.colors.secondary.DEFAULT};
  font-size: 10px;
  font-weight: 800;
`;

export const BenefitTitle = styled.h3`
  margin: 1px 0 6px;
  color: ${({ theme }) => theme.colors.white};
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: 21px;
  font-weight: 600;
`;

export const BenefitText = styled.p`
  margin: 0;
  color: rgba(255, 255, 255, 0.63);
  font-size: 13px;
  line-height: 1.6;
`;
