import styled from "styled-components";
import { media } from "@/theme";

export const Section = styled.section`
  padding: 96px 0;
  background: ${({ theme }) => theme.colors.background};
`;

export const SectionShell = styled.div`
  width: min(1120px, calc(100% - 48px));
  margin: 0 auto;
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 44px;

  ${media.lg} {
    grid-template-columns: 0.9fr 1.1fr;
    gap: 64px;
  }
`;

export const Intro = styled.div``;

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
  font-size: clamp(28px, 4vw, 40px);
  font-weight: 600;
  letter-spacing: -0.02em;
  line-height: 1.08;
`;

export const Subtitle = styled.p`
  margin: 16px 0 0;
  color: ${({ theme }) => theme.colors.muted.foreground};
  font-size: 14px;
  line-height: 1.7;
`;

export const ContactNote = styled.div`
  margin-top: 34px;
  padding-top: 22px;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  color: ${({ theme }) => theme.colors.muted.foreground};
  font-size: 13px;
  line-height: 1.7;

  a {
    font-weight: 700;
    color: ${({ theme }) => theme.colors.secondary.DEFAULT};

    &:hover {
      text-decoration: underline;
    }
  }
`;

export const List = styled.div`
  border-top: 1px solid ${({ theme }) => theme.colors.border};
`;

export const Item = styled.div`
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

export const Question = styled.button<{ $open: boolean }>`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  padding: 22px 0;
  border: none;
  background: transparent;
  cursor: pointer;
  text-align: left;

  span:first-child {
    color: ${({ theme, $open }) => ($open ? theme.colors.secondary.DEFAULT : theme.colors.foreground)};
    font-size: 15px;
    font-weight: 600;
    line-height: 1.4;
    transition: color ${({ theme }) => theme.transitions.fast};
  }

  &:hover span:first-child {
    color: ${({ theme }) => theme.colors.secondary.DEFAULT};
  }
`;

export const IconFrame = styled.span<{ $open: boolean }>`
  display: grid;
  flex: 0 0 auto;
  width: 30px;
  height: 30px;
  place-items: center;
  border: 1px solid
    ${({ theme, $open }) => ($open ? theme.colors.secondary.DEFAULT : theme.colors.border)};
  border-radius: 50%;
  color: ${({ theme, $open }) => ($open ? theme.colors.secondary.DEFAULT : theme.colors.muted.foreground)};
  transition:
    color ${({ theme }) => theme.transitions.fast},
    border-color ${({ theme }) => theme.transitions.fast},
    transform ${({ theme }) => theme.transitions.fast};
  transform: rotate(${({ $open }) => ($open ? "45deg" : "0deg")});

  svg {
    pointer-events: none;
  }
`;

export const Answer = styled.div<{ $open: boolean }>`
  display: grid;
  grid-template-rows: ${({ $open }) => ($open ? "1fr" : "0fr")};
  transition: grid-template-rows ${({ theme }) => theme.transitions.base};
`;

export const AnswerInner = styled.div`
  overflow: hidden;
`;

export const AnswerText = styled.p`
  margin: 0 0 22px;
  max-width: 640px;
  color: ${({ theme }) => theme.colors.muted.foreground};
  font-size: 14px;
  line-height: 1.7;
`;
