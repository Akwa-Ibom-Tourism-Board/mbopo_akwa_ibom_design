// Dark-mode counterparts of `colors.ts`. The reference site has no dark
// mode, so these are new — same key shape, same primary/secondary/accent
// hues, tuned for contrast on dark surfaces.
import type { ColorTokens } from "./colors";

export const colorsDark: ColorTokens = {
  background: "#04120C",
  foreground: "#F3F7F5",

  card: "#0A2118",
  cardForeground: "#F3F7F5",

  popover: "#0A2118",
  popoverForeground: "#F3F7F5",

  primary: "#22995F",
  primaryForeground: "#04120C",

  secondary: "#FF7A1F",
  secondaryForeground: "#04120C",

  muted: "#0E2A20",
  mutedForeground: "#9FB3AC",

  accent: "#F0A046",
  accentForeground: "#0B2920",

  destructive: "#F87171",
  destructiveForeground: "#3A0B0B",

  border: "rgba(255, 255, 255, 0.12)",
  input: "rgba(255, 255, 255, 0.14)",
  ring: "#22995F",

  white: "#FFFFFF",
  black: "#000000",

  navHover: "#2E9E6C",

  highlight: "#FACC14",
  highlightMuted: "#FDDF49",

  gray700: "#CBD5D9",
  gray500: "#94A3A8",

  primaryLight: "#22995F",
  heroDeep: "#04120C",

  servicesBackground: "#0A1F17",

  footerDark: "#02110D",
  footerGlow: "#04261A",
} as const;
