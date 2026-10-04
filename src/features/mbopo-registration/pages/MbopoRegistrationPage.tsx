import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { DashboardShell } from "@/shared/components";
import { useAuth, isVerifiedUser } from "@/features/auth";
import { IdentityVerificationGate } from "@/features/identity-verification";
import { getMyApplication } from "../api";
import { RegistrationForm } from "../components/RegistrationForm";
import { SubmittedApplicationView } from "../components/SubmittedApplicationView";
import { LoadingShell } from "../components/RegistrationForm.styles";

export function MbopoRegistrationPage() {
  const { user, updateUser } = useAuth();

  useEffect(() => {
    document.title = "Mbopo Registration | Mbopo Akwa Ibom";
  }, []);

  // One row is both the draft and the eventual submission (see the
  // backend's Application model) — a single fetch, gated on identity
  // verification since there's nothing to have started before that.
  const identityVerified = Boolean(user?.identityVerified);

  const applicationQuery = useQuery({
    queryKey: ["mbopo-registration", "application", user?.id],
    queryFn: getMyApplication,
    enabled: Boolean(user) && identityVerified,
  });

  if (!user) return null;

  if (!isVerifiedUser(user)) {
    return (
      <DashboardShell title="Mbopo Registration">
        <IdentityVerificationGate onVerified={updateUser} />
      </DashboardShell>
    );
  }

  const application = applicationQuery.data;
  const hasSubmission = application?.status === "submitted";
  const referenceCode = application?.referenceCode ?? undefined;

  return (
    <DashboardShell title="Mbopo Registration" referenceCode={referenceCode}>
      {applicationQuery.isLoading ? (
        <LoadingShell>Loading your application…</LoadingShell>
      ) : hasSubmission && application ? (
        <SubmittedApplicationView user={user} application={application} />
      ) : (
        <RegistrationForm user={user} initialDraft={application} />
      )}
    </DashboardShell>
  );
}
