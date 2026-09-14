import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { HomePage } from "@/features/home";
import { RegisterPage } from "@/features/register";
import { VerifyEmailPage } from "@/features/verify-email";
import { LoginPage } from "@/features/auth";
import { DashboardPage } from "@/features/dashboard";
import { MbopoRegistrationPage } from "@/features/mbopo-registration";
import { TermsPage, PrivacyPage } from "@/features/legal";
import { NotFoundPage } from "@/features/not-found";
import { ProtectedRoute } from "./ProtectedRoute";

// react-pdf pulls in pdf.js, which is heavy — load it only when someone
// actually visits /presentation instead of bloating the main bundle.
const PresentationPage = lazy(() =>
  import("@/features/presentation").then((module) => ({
    default: module.PresentationPage,
  })),
);

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/verify-email" element={<VerifyEmailPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/terms" element={<TermsPage />} />
      <Route path="/privacy" element={<PrivacyPage />} />
      <Route
        path="/presentation"
        element={
          <Suspense fallback={null}>
            <PresentationPage />
          </Suspense>
        }
      />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/mbopo-registration"
        element={
          <ProtectedRoute>
            <MbopoRegistrationPage />
          </ProtectedRoute>
        }
      />

      {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
