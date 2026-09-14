import styled from "styled-components";

export const FieldGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 20px 16px;

  @media (max-width: 580px) {
    grid-template-columns: 1fr;
  }
`;

export const FieldWrap = styled.div<{ $wide?: boolean }>`
  grid-column: ${({ $wide }) => ($wide ? "1 / -1" : "auto")};
`;

export const FieldLabel = styled.label`
  display: block;
  margin: 0 0 8px;
  color: ${({ theme }) => theme.colors.foreground};
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 0.045em;
`;

export const Required = styled.span`
  color: ${({ theme }) => theme.colors.secondary.DEFAULT};
`;

export const FieldErrorText = styled.small`
  display: block;
  margin-top: 6px;
  color: ${({ theme }) => theme.colors.destructive.DEFAULT};
  font-size: 10px;
`;

export const LockedValue = styled.div`
  display: flex;
  align-items: center;
  height: 49px;
  padding: 0 14px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.sm};
  background: ${({ theme }) => theme.colors.muted.DEFAULT};
  color: ${({ theme }) => theme.colors.muted.foreground};
  font-size: 13px;
`;
