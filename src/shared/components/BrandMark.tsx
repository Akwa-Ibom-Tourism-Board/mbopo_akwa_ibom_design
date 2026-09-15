import styled from "styled-components";

type Variant = "light" | "dark";

const Mark = styled.span<{ $variant: Variant }>`
  display: inline-flex;
  align-items: center;
  gap: 9px;
  color: ${({ theme, $variant }) => ($variant === "light" ? theme.colors.white : theme.colors.primary.DEFAULT)};
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: 19px;
  font-weight: 700;
  letter-spacing: 0.02em;
  white-space: nowrap;
`;

const Crest = styled.span<{ $variant: Variant }>`
  display: grid;
  width: 32px;
  height: 32px;
  place-items: center;
  border: 1px solid
    ${({ theme, $variant }) => ($variant === "light" ? "rgba(255,255,255,.55)" : theme.colors.highlight)};
  border-radius: 50%;
  color: ${({ theme }) => theme.colors.secondary.DEFAULT};
  font-family: ${({ theme }) => theme.fonts.sans};
  font-size: 11px;
  font-weight: 800;
  letter-spacing: -0.08em;
`;

export function BrandMark({ variant = "dark" }: { variant?: Variant }) {
  return (
    <Mark $variant={variant}>
      <Crest $variant={variant}>M.A</Crest>
      Mbopo
    </Mark>
  );
}
