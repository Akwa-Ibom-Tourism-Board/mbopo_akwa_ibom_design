import styled from "styled-components";

export const StatusRow = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const StatusBadge = styled.span<{ $submitted: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  border-radius: ${({ theme }) => theme.radii.full};
  background: ${({ theme, $submitted }) =>
    $submitted
      ? theme.alpha(theme.colors.primary.DEFAULT, 0.12)
      : theme.alpha(theme.colors.highlight, 0.2)};
  color: ${({ theme, $submitted }) => ($submitted ? theme.colors.primary.DEFAULT : theme.colors.accent.DEFAULT)};
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
`;
