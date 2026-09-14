import styled from "styled-components";

// Background lives on PlatformPanel (HomePage.tsx), which wraps this
// section together with WhyEnterSection so both read as one continuous
// gradient, with no seam between them.
export const Section = styled.section`
  padding: 0 0 110px;
  color: ${({ theme }) => theme.colors.white};
`;

export const SectionShell = styled.div`
  width: min(1120px, calc(100% - 48px));
  margin: 0 auto;
`;

export const Inner = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 32px 0;
  border-top: 1px solid rgba(255, 255, 255, 0.2);
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);

  svg {
    color: ${({ theme }) => theme.colors.secondary.DEFAULT};
  }
`;

export const Title = styled.h2`
  margin: 0;
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: clamp(22px, 4vw, 38px);
  font-weight: 600;
  letter-spacing: -0.02em;
`;

export const Copy = styled.p`
  margin: 0 0 0 auto;
  color: rgba(255, 255, 255, 0.65);
  font-size: 13px;

  @media (max-width: 780px) {
    display: none;
  }
`;
