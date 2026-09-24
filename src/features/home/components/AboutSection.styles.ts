import styled from "styled-components";

export const Section = styled.section`
  padding: 70px 0;
  background: ${({ theme }) => theme.colors.background};
`;

export const SectionShell = styled.div`
  width: min(1120px, calc(100% - 48px));
  margin: 0 auto;
`;

export const SectionEyebrow = styled.p<{ $light?: boolean }>`
  margin: 0 0 16px;
  color: ${({ theme }) => theme.colors.secondary.DEFAULT};
  font-size: 10px;
  font-weight: 800;
  letter-spacing: 0.22em;
  text-transform: uppercase;
`;

export const SectionTitle = styled.h2`
  max-width: 680px;
  margin: 0;
  color: ${({ theme }) => theme.colors.foreground};
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: clamp(34px, 5.5vw, 58px);
  font-weight: 600;
  letter-spacing: -0.03em;
  line-height: 1.02;
`;

export const Accent = styled.span`
  color: ${({ theme }) => theme.colors.secondary.DEFAULT};
  font-style: italic;
`;

export const AboutGrid = styled.div`
  display: grid;
  grid-template-columns: 1.3fr 0.7fr;
  gap: 80px;
  margin-top: 34px;
  align-items: end;

  @media (max-width: 780px) {
    grid-template-columns: 1fr;
    gap: 26px;
  }
`;

export const AboutLead = styled.p`
  max-width: 630px;
  margin: 0;
  color: ${({ theme }) => theme.colors.foreground};
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: clamp(19px, 2.2vw, 27px);
  line-height: 1.4;
`;

export const AboutNote = styled.div`
  display: flex;
  gap: 14px;
  align-items: flex-start;
  padding: 16px 0 0 20px;
  border-left: 1px solid ${({ theme }) => theme.colors.highlight};
  color: ${({ theme }) => theme.colors.muted.foreground};
  font-size: 13px;
  line-height: 1.7;

  svg {
    flex: 0 0 auto;
    color: ${({ theme }) => theme.colors.secondary.DEFAULT};
  }
`;

export const Stats = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  margin-top: 76px;
  padding-top: 28px;
  border-top: 1px solid ${({ theme }) => theme.colors.border};

  @media (max-width: 580px) {
    grid-template-columns: 1fr;
    gap: 26px;
    margin-top: 50px;
  }
`;

export const Stat = styled.div`
  display: flex;
  gap: 18px;
  align-items: baseline;
`;

export const StatNumber = styled.span`
  color: ${({ theme }) => theme.colors.secondary.DEFAULT};
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: clamp(36px, 4.5vw, 52px);
  line-height: 1;
`;

export const StatLabel = styled.span`
  max-width: 90px;
  color: ${({ theme }) => theme.colors.muted.foreground};
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.06em;
  line-height: 1.35;
  text-transform: uppercase;
`;
