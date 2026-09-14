import { Moon, Sun } from "lucide-react";
import styled from "styled-components";
import { useThemeMode } from "@/theme";
import { Switch } from "@/shared/ui";

const ToggleFrame = styled.label`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;

  svg {
    color: ${({ theme }) => theme.colors.muted.foreground};
  }
`;

export function ThemeToggle() {
  const { mode, toggleMode } = useThemeMode();
  const isDark = mode === "dark";

  return (
    <ToggleFrame aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}>
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
