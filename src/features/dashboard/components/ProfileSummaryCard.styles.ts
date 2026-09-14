import styled from "styled-components";

export const DetailGrid = styled.dl`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 18px;
  margin: 0;
`;

export const DetailItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3px;
  /* Grid items default to min-width: auto, so an unbroken long value (a
     long email) would otherwise force this track — and the page — wider
     than the viewport instead of wrapping. */
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
