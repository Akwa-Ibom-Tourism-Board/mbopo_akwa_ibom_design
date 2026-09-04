import styled from "styled-components";

const Mark = styled.span<{ $variant?: "light" | "dark" }>`
  display: inline-flex;
  align-items: center;
  gap: 9px;
  color: ${({ theme, $variant }) => ($variant === "light" ? theme.colors.white : theme.colors.green)};
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: 19px;
  font-weight: 700;
  letter-spacing: 0.02em;
  white-space: nowrap;
`;

const Crest = styled.span<{ $variant?: "light" | "dark" }>`
  display: grid;
  width: 32px;
  height: 32px;
  place-items: center;
  border: 1px solid ${({ theme, $variant }) => ($variant === "light" ? "rgba(255,255,255,.55)" : theme.colors.gold)};
  border-radius: 50%;
  color: ${({ theme }) => theme.colors.orange};
  font-family: ${({ theme }) => theme.fonts.sans};
  font-size: 11px;
  font-weight: 800;
  letter-spacing: -0.08em;
`;

export function BrandMark({ variant = "dark" }: { variant?: "light" | "dark" }) {
  return <Mark $variant={variant}><Crest $variant={variant}>M.A</Crest>MBỌPỌ</Mark>;
}

export function LogoSlot({ label, variant = "light" }: { label: string; variant?: "light" | "dark" }) {
  return <Logo $variant={variant}>{label}</Logo>;
}

const Logo = styled.span<{ $variant?: "light" | "dark" }>`
  display: grid;
  min-width: 46px;
  height: 30px;
  padding: 0 7px;
  place-items: center;
  border: 1px solid ${({ theme, $variant }) => ($variant === "light" ? "rgba(255,255,255,.48)" : theme.colors.line)};
  border-radius: 6px;
  color: ${({ theme, $variant }) => ($variant === "light" ? "rgba(255,255,255,.86)" : theme.colors.green)};
  font-size: 8px;
  font-weight: 700;
  letter-spacing: .11em;
  text-transform: uppercase;
`;