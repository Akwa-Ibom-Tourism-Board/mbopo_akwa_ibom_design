import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { DashboardShell } from "@/shared/components";
import { useAuth, isVerifiedUser } from "@/features/auth";
import { IdentityVerificationGate } from "@/features/identity-verification";
import { getSubmittedApplication, getRegistrationDraft } from "../api";
import { RegistrationForm } from "../components/RegistrationForm";
import { SubmittedApplicationView } from "../components/SubmittedApplicationView";
import { LoadingShell } from "../components/RegistrationForm.styles";

export function MbopoRegistrationPage() {
  const { user, updateUser } = useAuth();

  useEffect(() => {
    document.title = "Mbopo Registration | Mbopo Akwa Ibom";
  }, []);

  // The source of truth for "has this user submitted" is whether a
  // submitted-application record exists — not the (react-query-cached,
  // occasionally stale) user.applicationStatus — so a fresh submit is
  // reflected immediately on the next visit without relying on that
  // cache's timing. Neither query is worth running until identity is
  // verified — there's nothing to submit or draft before that gate.
  const identityVerified = Boolean(user?.identityVerified);

  const submittedQuery = useQuery({
    queryKey: ["mbopo-registration", "submitted", user?.id],
    queryFn: () => getSubmittedApplication(user!.id),
    enabled: Boolean(user) && identityVerified,
  });

  const hasSubmission = Boolean(submittedQuery.data);

  const draftQuery = useQuery({
    queryKey: ["mbopo-registration", "draft", user?.id],
    queryFn: () => getRegistrationDraft(user!.id),
    enabled:
      Boolean(user) &&
      identityVerified &&
      !submittedQuery.isLoading &&
      !hasSubmission,
  });

  if (!user) return null;

  if (!isVerifiedUser(user)) {
    return (
      <DashboardShell title="Mbopo Registration">
        <IdentityVerificationGate user={user} onVerified={updateUser} />
      </DashboardShell>
    );
  }

  const referenceCode = submittedQuery.data?.referenceCode;
  const stillLoading =
    submittedQuery.isLoading || (!hasSubmission && draftQuery.isLoading);

  return (
    <DashboardShell title="Mbopo Registration" referenceCode={referenceCode}>
      {stillLoading ? (
        <LoadingShell>Loading your application…</LoadingShell>
      ) : submittedQuery.data ? (
        <SubmittedApplicationView
          user={user}
          application={submittedQuery.data}
        />
      ) : (
        <RegistrationForm user={user} initialDraft={draftQuery.data} />
      )}
    </DashboardShell>
  );
}
