import { Moon, Sun } from "lucide-react";
import styled from "styled-components";
import { useThemeMode } from "@/theme";
import { Switch } from "@/shared/ui";

const ToggleFrame = styled.label<{ $light: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;

  svg {
    color: ${({ theme, $light }) => ($light ? theme.colors.white : theme.colors.muted.foreground)};
  }
`;

export interface ThemeToggleProps {
  // Mirrors Navbar's `$light` — true while sitting over a transparent, dark
  // hero image, so the sun/moon icons stay legible instead of defaulting to
  // a mid-tone that only reads well over a solid navbar background.
  light?: boolean;
}

export function ThemeToggle({ light = false }: ThemeToggleProps) {
  const { mode, toggleMode } = useThemeMode();
  const isDark = mode === "dark";

  return (
    <ToggleFrame
      $light={light}
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
    >
      <Sun size={16} aria-hidden />
      <Switch
        checked={isDark}
        onCheckedChange={toggleMode}
        aria-label="Toggle dark mode"
      />
      <Moon size={16} aria-hidden />
    </ToggleFrame>
  );
}
