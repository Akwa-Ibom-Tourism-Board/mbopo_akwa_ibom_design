import { type ReactNode } from "react";
import { ThemeProvider } from "styled-components";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster, SonnerToaster, TooltipProvider } from "@/shared/ui";
import {
  ThemeModeProvider,
  useThemeMode,
  GlobalStyle,
  lightTheme,
  darkTheme,
} from "@/theme";
import { AuthProvider } from "@/features/auth";

const queryClient = new QueryClient();

function StyledThemeBridge({ children }: { children: ReactNode }) {
  const { mode } = useThemeMode();
  return (
    <ThemeProvider theme={mode === "dark" ? darkTheme : lightTheme}>
      <GlobalStyle />
      {children}
    </ThemeProvider>
  );
}

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <ThemeModeProvider>
      <StyledThemeBridge>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <TooltipProvider>
              <Toaster />
              <SonnerToaster />
              {children}
            </TooltipProvider>
          </AuthProvider>
        </QueryClientProvider>
      </StyledThemeBridge>
    </ThemeModeProvider>
  );
}
