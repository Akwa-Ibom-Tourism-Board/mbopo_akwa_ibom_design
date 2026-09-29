import styled from "styled-components";

// Plain `1fr` tracks default to min-width: auto, so an unbroken long value
// (the 19-character VIN, especially) forced its column — and the whole
// card — wider than the viewport on mobile instead of wrapping.
// minmax(0, 1fr) caps each track at its fair share; overflow-wrap on the
// value is the second line of defense for anything that still doesn't fit.
export const DetailGrid = styled.dl`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px 16px;
  margin: 4px 0 20px;
  padding: 16px;
  border-radius: ${({ theme }) => theme.radii.lg};
  background: ${({ theme }) => theme.colors.muted.DEFAULT};
`;

export const DetailItem = styled.div<{ $wide?: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 3px;
  grid-column: ${({ $wide }) => ($wide ? "1 / -1" : "auto")};
  min-width: 0;
`;

export const DetailLabel = styled.dt`
  font-size: 0.6875rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.muted.foreground};
`;

export const DetailValue = styled.dd`
  margin: 0;
  font-size: 0.9375rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.foreground};
  overflow-wrap: anywhere;
`;

// NIN/VIN get their own visually distinct row — long, official-looking
// identifiers read better in a monospace-style grid than squeezed into a
// half-width column alongside "Female" or "Ward 8".
export const IdNumberValue = styled(DetailValue)`
  font-variant-numeric: tabular-nums;
  letter-spacing: 0.02em;
`;

export const ConfirmActions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 20px;

  button {
    width: 100%;
  }
`;

export const ChangeNinButton = styled.button`
  margin-top: 4px;
  border: none;
  background: transparent;
  padding: 0;
  color: ${({ theme }) => theme.colors.primary.DEFAULT};
  font-size: 0.8125rem;
  font-weight: 600;
  text-decoration: underline;
  cursor: pointer;
`;
