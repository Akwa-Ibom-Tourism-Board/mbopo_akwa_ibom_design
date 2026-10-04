import styled from "styled-components";

export const Wrap = styled.div`
  position: fixed;
  bottom: 3.5rem;
  right: 1.25rem;
  z-index: ${({ theme }) => theme.zIndex.floatingAction};
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Trigger = styled.button`
  width: 3.5rem;
  height: 3.5rem;
  border-radius: 999px;
  border: none;
  cursor: pointer;
  background: ${({ theme }) => theme.colors.secondary.DEFAULT};
  color: ${({ theme }) => theme.colors.secondary.foreground};
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: ${({ theme }) => theme.shadows.cta};
  transition: transform ${({ theme }) => theme.transitions.base};

  &:hover {
    transform: scale(1.06);
  }
`;

export const Label = styled.span`
  margin-top: 0.4rem;
  padding: 0.15rem 0.5rem;
  border-radius: ${({ theme }) => theme.radii.full};
  background: ${({ theme }) => theme.colors.card};
  box-shadow: ${({ theme }) => theme.shadows.sm};
  font-size: 0.6875rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.foreground};
`;
