import styled, { css } from "styled-components";
import { media } from "@/theme";

export const Section = styled.section`
  padding: 96px 0;
  background: ${({ theme }) => theme.colors.background};
`;

export const SectionShell = styled.div`
  width: min(1120px, calc(100% - 48px));
  margin: 0 auto;
`;

export const Header = styled.div`
  max-width: 620px;
  margin: 0 0 56px;
`;

export const EyebrowRow = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 20px;
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
  color: ${({ theme }) => theme.colors.foreground};
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: clamp(30px, 4.5vw, 46px);
  font-weight: 600;
  letter-spacing: -0.02em;
  line-height: 1.05;
`;

export const Subtitle = styled.p`
  margin: 16px 0 0;
  color: ${({ theme }) => theme.colors.muted.foreground};
  font-size: 15px;
  line-height: 1.7;
`;

export const Steps = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 40px;

  ${media.md} {
    grid-template-columns: repeat(2, 1fr);
    gap: 24px 24px;
  }

  ${media.xl} {
    grid-template-columns: repeat(4, 1fr);
  }
`;

export const Step = styled.div`
  display: flex;
  flex-direction: column;
`;

export const BadgeRow = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 22px;
`;

export const Index = styled.span<{ $final?: boolean }>`
  display: grid;
  flex: 0 0 auto;
  width: 44px;
  height: 44px;
  place-items: center;
  border-radius: 50%;
  background: ${({ theme, $final }) => ($final ? theme.colors.primary.DEFAULT : theme.colors.secondary.DEFAULT)};
  box-shadow: 0 0 0 6px
    ${({ theme, $final }) => theme.alpha($final ? theme.colors.primary.DEFAULT : theme.colors.secondary.DEFAULT, 0.15)};
  color: ${({ theme }) => theme.colors.white};
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: 13px;
  font-weight: 700;
`;

export const Connector = styled.span`
  display: none;
  flex: 1;
  height: 1px;
  margin-left: 16px;
  border-top: 2px dashed ${({ theme }) => theme.colors.border};

  ${media.xl} {
    display: block;
  }
`;

const cardBase = css<{ $final?: boolean }>`
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 26px;
  border-radius: ${({ theme }) => theme.radii["2xl"]};
  transition: box-shadow ${({ theme }) => theme.transitions.fast};

  ${({ theme, $final }) =>
    $final
      ? css`
          border: 1px solid ${theme.colors.primary.DEFAULT};
          background: ${theme.colors.primary.DEFAULT};
          color: ${theme.colors.white};
        `
      : css`
          border: 1px solid ${theme.colors.border};
          background: ${theme.colors.card};
          color: ${theme.colors.cardForeground};

          &:hover {
            box-shadow: ${theme.shadows.md};
          }
        `}
`;

export const Card = styled.article<{ $final?: boolean }>`
  ${cardBase}
`;

export const CardTop = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;

  svg {
    flex: 0 0 auto;
    color: ${({ theme }) => theme.colors.secondary.DEFAULT};
  }
`;

export const CardTitle = styled.h3`
  margin: 0;
  font-size: 18px;
  font-weight: 700;
  line-height: 1.3;
`;

export const CardText = styled.p<{ $final?: boolean }>`
  margin: 14px 0 0;
  color: ${({ theme, $final }) => ($final ? "rgba(255, 255, 255, 0.85)" : theme.colors.muted.foreground)};
  font-size: 13px;
  line-height: 1.65;
`;

export const CardDivider = styled.div<{ $final?: boolean }>`
  margin-top: 20px;
  padding-top: 16px;
  border-top: 1px solid
    ${({ theme, $final }) => ($final ? "rgba(255, 255, 255, 0.2)" : theme.colors.border)};
`;

export const ChecklistLabel = styled.p<{ $final?: boolean }>`
  margin: 0 0 10px;
  color: ${({ theme, $final }) => ($final ? "rgba(255, 255, 255, 0.6)" : theme.colors.muted.foreground)};
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.16em;
  text-transform: uppercase;
`;

export const Checklist = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 9px;
  margin: 0;
  padding: 0;
  list-style: none;
`;

export const ChecklistItem = styled.li<{ $final?: boolean }>`
  display: flex;
  align-items: flex-start;
  gap: 9px;
  color: ${({ theme, $final }) => ($final ? "rgba(255, 255, 255, 0.9)" : theme.colors.foreground)};
  font-size: 12.5px;
  line-height: 1.5;

  svg {
    flex: 0 0 auto;
    margin-top: 2px;
    color: ${({ theme, $final }) => ($final ? theme.colors.white : theme.colors.secondary.DEFAULT)};
  }
`;
