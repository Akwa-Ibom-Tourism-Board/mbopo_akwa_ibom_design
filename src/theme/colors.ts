// Light-mode color tokens — ported from the Akwa Ibom Tourism Board's main
// website (main-website-frontend/src/theme/colors.ts) so Mbobpo Akwa Ibom
// shares one visual identity with the rest of the board's digital presence.

export const colors = {
  background: "#FFFFFF",
  foreground: "#0B4923",

  card: "#FFFFFF",
  cardForeground: "#0B4923",

  popover: "#FFFFFF",
  popoverForeground: "#0B4923",

  primary: "#0B4923",
  primaryForeground: "#FFFFFF",

  secondary: "#FE6301",
  secondaryForeground: "#FFFFFF",

  muted: "#F3F7F5",
  mutedForeground: "#677E76",

  accent: "#E77918",
  accentForeground: "#FFFFFF",

  destructive: "#EF4444",
  destructiveForeground: "#FFFFFF",

  border: "#E0EBE7",
  input: "#E0EBE7",
  ring: "#0B4923",

  white: "#FFFFFF",
  black: "#000000",

  // Dropdown/nav hover green — distinct from `primary`.
  navHover: "#287B60",

  // Highlight yellow used for registration call-to-action emphasis.
  highlight: "#FACC14",
  highlightMuted: "#FDDF49",

  // Neutral grays for chrome that isn't tied to the brand palette.
  gray700: "#384252",
  gray500: "#6B7280",

  // Mid stop of the hero gradient (a lighter step of `primary`).
  primaryLight: "#0B4923",
  // Near-black with a hint of green — dark end of the hero gradient.
  heroDeep: "#04120C",

  servicesBackground: "#F5F7FB",

  // Footer gradient: near-black base with a soft green glow at top-center.
  footerDark: "#02110D",
  footerGlow: "#04261A",
} as const;

export type ColorTokens = Record<keyof typeof colors, string>;
