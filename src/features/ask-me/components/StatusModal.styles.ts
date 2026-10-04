import styled from "styled-components";

export const Centered = styled.div`
  padding: 0.5rem 0 0;
  text-align: center;
`;

export const IconFrame = styled.div<{ $type: "success" | "error" }>`
  display: grid;
  place-items: center;
  width: 56px;
  height: 56px;
  margin: 0 auto 0.75rem;
  border-radius: 999px;
  color: ${({ $type, theme }) =>
    $type === "success"
      ? theme.colors.secondary.DEFAULT
      : theme.colors.destructive.DEFAULT};
  background: ${({ $type, theme }) =>
    $type === "success"
      ? theme.alpha(theme.colors.secondary.DEFAULT, 0.12)
      : theme.alpha(theme.colors.destructive.DEFAULT, 0.12)};
`;

export const Message = styled.p`
  margin: 0;
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.muted.foreground};
`;
