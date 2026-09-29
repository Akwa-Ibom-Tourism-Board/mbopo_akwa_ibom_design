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
  font-size: clamp(0.6875rem, 0.65rem + 0.1vw, 0.75rem);
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
`;

export const MetaList = styled.dl`
  display: flex;
  flex-direction: column;
  gap: 14px;
  margin: 20px 0 0;
  padding-top: 18px;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
`;

export const MetaRow = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const MetaIcon = styled.span`
  display: grid;
  flex: 0 0 auto;
  place-items: center;
  width: 30px;
  height: 30px;
  border-radius: ${({ theme }) => theme.radii.full};
  background: ${({ theme }) => theme.colors.muted.DEFAULT};
  color: ${({ theme }) => theme.colors.muted.foreground};
`;

export const MetaText = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 0;
`;

export const MetaLabel = styled.dt`
  font-size: clamp(0.625rem, 0.58rem + 0.15vw, 0.6875rem);
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.muted.foreground};
`;

export const MetaValue = styled.dd`
  margin: 0;
  font-size: clamp(0.8125rem, 0.78rem + 0.15vw, 0.875rem);
  font-weight: 600;
  color: ${({ theme }) => theme.colors.foreground};
  overflow-wrap: anywhere;
`;
