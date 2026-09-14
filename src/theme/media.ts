import { lightTheme } from "./theme";

// Min-width breakpoint helpers for styled-components:
// `${media.md} { flex-direction: row; }`
export const media = {
  xs: `@media (min-width: ${lightTheme.breakpoints.xs})`,
  sm: `@media (min-width: ${lightTheme.breakpoints.sm})`,
  md: `@media (min-width: ${lightTheme.breakpoints.md})`,
  lg: `@media (min-width: ${lightTheme.breakpoints.lg})`,
  xl: `@media (min-width: ${lightTheme.breakpoints.xl})`,
  "2xl": `@media (min-width: ${lightTheme.breakpoints["2xl"]})`,
} as const;
