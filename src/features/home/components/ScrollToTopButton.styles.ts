import styled from "styled-components";

export const Button = styled.button<{ $visible: boolean }>`
  position: fixed;
  z-index: ${({ theme }) => theme.zIndex.floatingAction};
  right: 20px;
  /* Stacked well above the Ask Me trigger (bottom: 1.5rem, a 56px button
     plus its "Ask Me" label — see
     features/ask-me/components/AskMeTrigger.styles.ts) rather than beside
     it, with enough clearance that the two never feel cramped together. */
  bottom: 170px;
  display: grid;
  place-items: center;
  width: 48px;
  height: 48px;
  border: none;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.secondary.DEFAULT};
  color: ${({ theme }) => theme.colors.secondary.foreground};
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  cursor: pointer;
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  transform: translateY(${({ $visible }) => ($visible ? "0" : "12px")});
  pointer-events: ${({ $visible }) => ($visible ? "auto" : "none")};
  transition:
    opacity ${({ theme }) => theme.transitions.base},
    transform ${({ theme }) => theme.transitions.base},
    background-color ${({ theme }) => theme.transitions.fast};

  &:hover {
    background: ${({ theme }) => theme.alpha(theme.colors.secondary.DEFAULT, 0.9)};
  }
`;
