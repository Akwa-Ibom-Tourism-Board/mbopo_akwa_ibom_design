import { createGlobalStyle } from "styled-components";

export const theme = {
  colors: {
    green: "#015738",
    greenDeep: "#013e29",
    greenInk: "#0b2920",
    orange: "#e77917",
    orangeBright: "#f39b43",
    gold: "#cda45f",
    cream: "#fbf8f1",
    creamDeep: "#f1eadb",
    paper: "#fffdf9",
    ink: "#17201b",
    muted: "#68736d",
    line: "#dfdfd6",
    white: "#ffffff",
    error: "#a63a2b",
  },
  fonts: {
    display: "Georgia, 'Times New Roman', serif",
    sans: "'Trebuchet MS', Arial, sans-serif",
  },
  shadows: {
    soft: "0 16px 48px rgba(20, 53, 39, 0.10)",
    lifted: "0 22px 58px rgba(20, 53, 39, 0.16)",
  },
  radii: {
    sm: "10px",
    md: "18px",
    lg: "30px",
    pill: "999px",
  },
};

export type MbopoTheme = typeof theme;

export const GlobalStyle = createGlobalStyle`
  :root {
    color-scheme: light;
    font-family: ${({ theme }) => theme.fonts.sans};
    background: ${({ theme }) => theme.colors.cream};
    color: ${({ theme }) => theme.colors.ink};
    font-synthesis: none;
    text-rendering: optimizeLegibility;
  }

  *, *::before, *::after { box-sizing: border-box; }

  html { scroll-behavior: smooth; }

  body {
    margin: 0;
    min-width: 320px;
    background: ${({ theme }) => theme.colors.cream};
  }

  body, button, input, select, textarea { font-family: ${({ theme }) => theme.fonts.sans}; }

  button, a, input, select, textarea { -webkit-tap-highlight-color: transparent; }

  a { color: inherit; text-decoration: none; }

  button { cursor: pointer; }

  ::selection { background: ${({ theme }) => theme.colors.orange}; color: ${({ theme }) => theme.colors.white}; }

  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      scroll-behavior: auto !important;
      transition-duration: 0.01ms !important;
    }
  }
`;