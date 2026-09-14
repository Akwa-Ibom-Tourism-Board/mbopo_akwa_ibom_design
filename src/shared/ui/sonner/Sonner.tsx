import { Toaster as SonnerToaster, type ToasterProps } from "sonner";
import { useTheme, useThemeMode } from "@/theme";

export const Toaster = (props: ToasterProps) => {
  const theme = useTheme();
  const { mode } = useThemeMode();

  return (
    <SonnerToaster
      theme={mode}
      toastOptions={{
        style: {
          background: theme.colors.card,
          color: theme.colors.cardForeground,
          border: `1px solid ${theme.colors.border}`,
          boxShadow: theme.shadows.lg,
        },
      }}
      {...props}
    />
  );
};

export { toast } from "sonner";
