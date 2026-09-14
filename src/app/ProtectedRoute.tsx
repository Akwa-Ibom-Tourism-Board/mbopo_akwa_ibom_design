import type { ReactNode } from "react";
import styled from "styled-components";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/features/auth";

const SplashFrame = styled.div`
  display: grid;
  min-height: 100vh;
  place-items: center;
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.muted.foreground};
  font-size: 0.875rem;
`;

export function ProtectedRoute({ children }: { children: ReactNode }) {
  const { status, isAuthenticated } = useAuth();
  const location = useLocation();

  if (status === "restoring") {
    return <SplashFrame>Loading…</SplashFrame>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  return <>{children}</>;
}
