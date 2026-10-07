import { useEffect } from "react";
import { DashboardShell } from "@/shared/components";
import { AvatarImage, AvatarFallback } from "@/shared/ui";
import { useAuth } from "@/features/auth";
import { ProfileSummaryCard } from "../components/ProfileSummaryCard";
import { ChangePasswordCard } from "../components/ChangePasswordCard";
import {
  Stack,
  AvatarCard,
  AvatarFrame,
  LargeAvatar,
  AvatarMeta,
  AvatarName,
  AvatarHint,
} from "./ProfilePage.styles";

export function ProfilePage() {
  const { user } = useAuth();

  useEffect(() => {
    document.title = "Your Profile | Mbopo Akwa Ibom";
  }, []);

  if (!user) return null;

  const displayName = user.firstName
    ? `${user.firstName} ${user.lastName}`
    : user.email;
  const initials = (
    user.firstName
      ? `${user.firstName[0] ?? ""}${user.lastName?.[0] ?? ""}`
      : (user.email[0] ?? "")
  ).toUpperCase();

  return (
    <DashboardShell title="Profile">
      <Stack>
        <AvatarCard>
          <AvatarFrame>
            <LargeAvatar>
              {user.avatarUrl && (
                <AvatarImage src={user.avatarUrl} alt={displayName} />
              )}
              <AvatarFallback>{initials}</AvatarFallback>
            </LargeAvatar>
            {/* No self-upload control here, ever — the applicant's own
                live selfie from identity verification is the profile
                photo, and the backend locks the avatar endpoint once
                identityVerified is true (see FIX_ME.md §8). Before
                verification there's nothing to upload a stand-in for
                either, since it would just be overwritten the moment
                they verify. */}
          </AvatarFrame>
          <AvatarMeta>
            <AvatarName>{displayName}</AvatarName>
            <AvatarHint>
              {user.identityVerified
                ? "Set from your identity verification photo and can't be changed."
                : "Your profile photo will be set automatically once you verify your identity."}
            </AvatarHint>
          </AvatarMeta>
        </AvatarCard>

        <ProfileSummaryCard user={user} />
        <ChangePasswordCard />
      </Stack>
    </DashboardShell>
  );
}
