import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { DashboardShell } from "@/shared/components";
import { useAuth } from "@/features/auth";
import { getSubmittedApplication, getRegistrationDraft } from "../api";
import { RegistrationForm } from "../components/RegistrationForm";
import { SubmittedApplicationView } from "../components/SubmittedApplicationView";
import { LoadingShell } from "../components/RegistrationForm.styles";

export function MbopoRegistrationPage() {
  const { user } = useAuth();

  useEffect(() => {
    document.title = "Mbopo Registration | Mbopo Akwa Ibom";
  }, []);

  // The source of truth for "has this user submitted" is whether a
  // submitted-application record exists — not the (react-query-cached,
  // occasionally stale) user.applicationStatus — so a fresh submit is
  // reflected immediately on the next visit without relying on that
  // cache's timing.
  const submittedQuery = useQuery({
    queryKey: ["mbopo-registration", "submitted", user?.id],
    queryFn: () => getSubmittedApplication(user!.id),
    enabled: Boolean(user),
  });

  const hasSubmission = Boolean(submittedQuery.data);

  const draftQuery = useQuery({
    queryKey: ["mbopo-registration", "draft", user?.id],
    queryFn: () => getRegistrationDraft(user!.id),
    enabled: Boolean(user) && !submittedQuery.isLoading && !hasSubmission,
  });

  if (!user) return null;

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
