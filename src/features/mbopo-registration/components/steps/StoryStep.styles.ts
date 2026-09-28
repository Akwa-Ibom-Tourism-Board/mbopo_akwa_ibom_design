import styled from "styled-components";

export const WordCount = styled.div<{ $over: boolean }>`
  margin-top: 7px;
  color: ${({ theme, $over }) => ($over ? theme.colors.destructive.DEFAULT : theme.colors.muted.foreground)};
  font-size: 10px;
  text-align: right;
`;

export const ImportantNotice = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 10px;
  margin-top: 28px;
  padding: 14px 16px;
  border-radius: ${({ theme }) => theme.radii.lg};
  background: ${({ theme }) => theme.alpha(theme.colors.destructive.DEFAULT, 0.08)};
  color: ${({ theme }) => theme.colors.foreground};
  font-size: 12px;
  line-height: 1.6;

  svg {
    flex: 0 0 auto;
    margin-top: 1px;
    color: ${({ theme }) => theme.colors.destructive.DEFAULT};
  }

  strong {
    font-weight: 700;
  }
`;

export const Declarations = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-top: 32px;
  padding-top: 26px;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
`;

export const DeclarationRow = styled.label<{ $invalid?: boolean }>`
  display: flex;
  align-items: flex-start;
  gap: 11px;
  color: ${({ theme, $invalid }) => ($invalid ? theme.colors.destructive.DEFAULT : theme.colors.muted.foreground)};
  font-size: 12px;
  line-height: 1.55;
  cursor: pointer;

  a {
    color: ${({ theme }) => theme.colors.primary.DEFAULT};
    text-decoration: underline;
  }
`;
