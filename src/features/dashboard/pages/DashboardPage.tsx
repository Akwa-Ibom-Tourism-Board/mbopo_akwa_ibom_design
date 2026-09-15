import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { DashboardShell } from "@/shared/components";
import { useAuth } from "@/features/auth";
import { getDashboardSummary } from "../api";
import { ProfileSummaryCard } from "../components/ProfileSummaryCard";
import { ApplicationStatusCard } from "../components/ApplicationStatusCard";
import { StartRegistrationCta } from "../components/StartRegistrationCta";
import { Stack, Greeting, CardGrid, LoadingText } from "./DashboardPage.styles";

export function DashboardPage() {
  const { user } = useAuth();

  useEffect(() => {
    document.title = "Dashboard | Mbobpo Akwa Ibom";
  }, []);

  const summaryQuery = useQuery({
    queryKey: ["dashboard", "summary", user?.id],
    queryFn: () => getDashboardSummary(user!.id),
    enabled: Boolean(user),
  });

  if (!user) return null;

  const displayUser = summaryQuery.data?.user ?? user;
  const referenceCode = summaryQuery.data?.referenceCode;

  return (
    <DashboardShell title="Overview" referenceCode={referenceCode}>
      <Stack>
        <Greeting>Welcome back, {displayUser.firstName}.</Greeting>
        {summaryQuery.isLoading && (
          <LoadingText>Loading your dashboard…</LoadingText>
        )}
        <StartRegistrationCta status={displayUser.applicationStatus} />
        <CardGrid>
          <ProfileSummaryCard
            user={displayUser}
            referenceCode={referenceCode}
          />
          <ApplicationStatusCard status={displayUser.applicationStatus} />
        </CardGrid>
      </Stack>
    </DashboardShell>
  );
}
