import { useEffect, useState, type ChangeEvent } from "react";
import { Camera } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { DashboardShell } from "@/shared/components";
import { AvatarImage, AvatarFallback, sonnerToast } from "@/shared/ui";
import { useAuth, updateAvatar } from "@/features/auth";
import { toPersistableDataUrl } from "@/lib/photoEncoding";
import { ProfileSummaryCard } from "../components/ProfileSummaryCard";
import { ChangePasswordCard } from "../components/ChangePasswordCard";
import {
  Stack,
  AvatarCard,
  AvatarFrame,
  LargeAvatar,
  AvatarUploadButton,
  AvatarMeta,
  AvatarName,
  AvatarHint,
  AvatarError,
} from "./ProfilePage.styles";

export function ProfilePage() {
  const { user, updateUser } = useAuth();
  const [error, setError] = useState<string>();

  useEffect(() => {
    document.title = "Your Profile | Mbopo Akwa Ibom";
  }, []);

  const uploadMutation = useMutation({
    mutationFn: (avatarDataUrl: string) =>
      updateAvatar(user!.id, avatarDataUrl),
    onSuccess: (updated) => {
      updateUser({ avatarUrl: updated.avatarUrl });
      sonnerToast.success("Profile photo updated.");
    },
    onError: () => {
      sonnerToast.error("We couldn't update your photo. Please try again.");
    },
  });

  if (!user) return null;

  const displayName = user.firstName
    ? `${user.firstName} ${user.lastName}`
    : user.email;
  const initials = (
    user.firstName
      ? `${user.firstName[0] ?? ""}${user.lastName?.[0] ?? ""}`
      : (user.email[0] ?? "")
  ).toUpperCase();

  const onFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Please choose an image file.");
      return;
    }

    setError(undefined);
    const dataUrl = await toPersistableDataUrl(file);
    uploadMutation.mutate(dataUrl);
  };

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
            <AvatarUploadButton aria-label="Change profile photo">
              <Camera size={14} />
              <input
                type="file"
                accept="image/png,image/jpeg"
                onChange={onFileChange}
                disabled={uploadMutation.isPending}
              />
            </AvatarUploadButton>
          </AvatarFrame>
          <AvatarMeta>
            <AvatarName>{displayName}</AvatarName>
            <AvatarHint>
              {uploadMutation.isPending
                ? "Uploading…"
                : "JPEG or PNG. Shown across the dashboard until you change it."}
            </AvatarHint>
            {error && <AvatarError>{error}</AvatarError>}
          </AvatarMeta>
        </AvatarCard>

        <ProfileSummaryCard user={user} />
        <ChangePasswordCard />
      </Stack>
    </DashboardShell>
  );
}
