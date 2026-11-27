import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { DashboardShell } from "@/shared/components";
import { useAuth, isVerifiedUser } from "@/features/auth";
import { IdentityVerificationGate } from "@/features/identity-verification";
import { useRegistrationStatus } from "@/features/registration-status";
import { getMyApplication } from "../api";
import { RegistrationForm } from "../components/RegistrationForm";
import { SubmittedApplicationView } from "../components/SubmittedApplicationView";
import {
  LoadingShell,
  ClosedShell,
} from "../components/RegistrationForm.styles";

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

  // Only the fully-"closed" state reaches here — "new_intake_closed" only
  // ever stops someone from signing up in the first place (see
  // RegisterPage.tsx); once they already have an account, nothing here
  // changes for them.
  const registrationStatus = useRegistrationStatus().data?.status;

  if (!user) return null;

  const application = applicationQuery.data;
  const hasSubmission = application?.status === "submitted";

  // A submitted application is read-only already — nothing to block.
  // Everything else (identity verification not yet done, or a draft still
  // in progress) can no longer be edited once registration is fully closed.
  if (
    registrationStatus === "closed" &&
    !hasSubmission &&
    !applicationQuery.isLoading
  ) {
    return (
      <DashboardShell title="Mbopo Registration">
        <ClosedShell>
          <h2>Registration has ended</h2>
          <p>
            Applications can no longer be edited or submitted. If you believe
            this is a mistake, please contact support.
          </p>
        </ClosedShell>
      </DashboardShell>
    );
  }

  if (!isVerifiedUser(user)) {
    return (
      <DashboardShell title="Mbopo Registration">
        <IdentityVerificationGate onVerified={updateUser} />
      </DashboardShell>
    );
  }

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
