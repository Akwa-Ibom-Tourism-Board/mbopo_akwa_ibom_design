import styled from "styled-components";

export const ProgressRow = styled.div`
  display: flex;
  align-items: end;
  justify-content: space-between;
  gap: 22px;
  padding-bottom: 20px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

export const ProgressLabel = styled.p`
  margin: 0 0 4px;
  color: ${({ theme }) => theme.colors.primary.DEFAULT};
  font-size: 10px;
  font-weight: 800;
  letter-spacing: 0.16em;
`;

export const ProgressStep = styled.span`
  color: ${({ theme }) => theme.colors.muted.foreground};
  font-size: 12px;
`;

export const ProgressTrack = styled.div`
  width: 160px;
  height: 4px;
  overflow: hidden;
  border-radius: 4px;
  background: ${({ theme }) => theme.colors.muted.DEFAULT};
`;

export const ProgressFill = styled.div<{ $progress: number }>`
  height: 100%;
  width: ${({ $progress }) => `${$progress * 100}%`};
  background: ${({ theme }) => theme.colors.secondary.DEFAULT};
  transition: width ${({ theme }) => theme.transitions.base};
`;

export const StepDots = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 6px;
  margin: 25px 0 38px;
`;

export const StepDot = styled.div<{ $active: boolean; $complete: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  color: ${({ theme, $active }) => ($active ? theme.colors.primary.DEFAULT : theme.colors.muted.foreground)};
  font-size: 10px;
  font-weight: 800;
  letter-spacing: 0.06em;
  text-transform: uppercase;

  span {
    display: grid;
    width: 25px;
    height: 25px;
    place-items: center;
    border: 2px solid
      ${({ theme, $active, $complete }) => ($active || $complete ? theme.colors.secondary.DEFAULT : theme.colors.border)};
    border-radius: 50%;
    background: ${({ theme, $active, $complete }) => ($active || $complete ? theme.colors.secondary.DEFAULT : "transparent")};
    color: ${({ theme, $active, $complete }) => ($active || $complete ? theme.colors.secondary.foreground : theme.colors.secondary.DEFAULT)};
    transition: all ${({ theme }) => theme.transitions.base};
  }

  label {
    white-space: nowrap;
  }

  @media (max-width: 580px) {
    font-size: 9px;

    label {
      white-space: normal;
    }
  }
`;
