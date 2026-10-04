import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { DashboardShell } from "@/shared/components";
import { useAuth } from "@/features/auth";
import { getMyApplication } from "@/features/mbopo-registration";
import { ProfileSummaryCard } from "../components/ProfileSummaryCard";
import { ApplicationStatusCard } from "../components/ApplicationStatusCard";
import { StartRegistrationCta } from "../components/StartRegistrationCta";
import { Stack, Greeting, CardGrid, LoadingText } from "./DashboardPage.styles";

export function DashboardPage() {
  const { user } = useAuth();

  useEffect(() => {
    document.title = "Dashboard | Mbopo Akwa Ibom";
  }, []);

  // Same query key mbopo-registration's own page uses — the two share one
  // cache entry for "my application," so a submit/draft-save made there
  // is already reflected here without a second round-trip.
  const applicationQuery = useQuery({
    queryKey: ["mbopo-registration", "application", user?.id],
    queryFn: getMyApplication,
    enabled: Boolean(user),
  });

  if (!user) return null;

  const application = applicationQuery.data ?? undefined;
  const referenceCode = application?.referenceCode ?? undefined;

  return (
    <DashboardShell title="Dashboard" referenceCode={referenceCode}>
      <Stack>
        <Greeting>Welcome back, {user.firstName ?? user.email}.</Greeting>
        {applicationQuery.isLoading && (
          <LoadingText>Loading your dashboard…</LoadingText>
        )}
        <StartRegistrationCta application={application} />
        <CardGrid>
          <ProfileSummaryCard user={user} referenceCode={referenceCode} />
          <ApplicationStatusCard
            application={application}
            memberSince={user.createdAt}
          />
        </CardGrid>
      </Stack>
    </DashboardShell>
  );
}
