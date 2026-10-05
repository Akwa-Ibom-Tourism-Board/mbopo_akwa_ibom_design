import { useEffect, useState, type ChangeEvent } from "react";
import { Camera } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { DashboardShell } from "@/shared/components";
import { AvatarImage, AvatarFallback, sonnerToast } from "@/shared/ui";
import { useAuth, updateAvatar } from "@/features/auth";
import { uploadToCloudinary, MAX_IMAGE_BYTES } from "@/lib/cloudinary";
import { friendlyMessage } from "@/lib/http";
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
    mutationFn: async (file: File) => {
      const uploaded = await uploadToCloudinary("avatar", file);
      return updateAvatar({
        url: uploaded.url,
        publicId: uploaded.publicId,
        bytes: uploaded.bytes,
      });
    },
    onSuccess: (updated) => {
      updateUser({ avatarUrl: updated.avatarUrl });
      sonnerToast.success("Profile photo updated.");
    },
    onError: (error) => {
      sonnerToast.error(
        friendlyMessage(
          error,
          "We could not update your photo. Please try again.",
        ),
      );
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

  const onFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Please choose an image file.");
      return;
    }

    if (file.size > MAX_IMAGE_BYTES) {
      const message = `That file is ${(file.size / (1024 * 1024)).toFixed(1)}MB, please choose one under 5MB.`;
      setError(message);
      sonnerToast.error(message);
      return;
    }

    setError(undefined);
    uploadMutation.mutate(file);
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
            {/* Once identity verification sets a NIN-sourced photo, it
                becomes the permanent profile image — no more self-upload,
                matching the backend's own lock on this endpoint (see
                FIX_ME.md §8). Only an applicant who hasn't verified yet
                (no NIN photo to lock in) can still pick their own. */}
            {!user.identityVerified && (
              <AvatarUploadButton aria-label="Change profile photo">
                <Camera size={14} />
                <input
                  type="file"
                  accept="image/png,image/jpeg"
                  onChange={onFileChange}
                  disabled={uploadMutation.isPending}
                />
              </AvatarUploadButton>
            )}
          </AvatarFrame>
          <AvatarMeta>
            <AvatarName>{displayName}</AvatarName>
            <AvatarHint>
              {user.identityVerified
                ? "Set from your verified NIN and can't be changed."
                : uploadMutation.isPending
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
