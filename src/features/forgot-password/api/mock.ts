import { delay } from "@/lib/mockDelay";
import {
  generatePasswordResetToken,
  resetUserPassword,
} from "@/lib/mockUsersStore";
import { sonnerToast } from "@/shared/ui";
import type { ForgotPasswordInput, ResetPasswordInput } from "../types";

// Mirrors the real backend's POST /auth/forgot-password: resolves
// successfully whether or not the email has an account, so this screen can
// never be used to enumerate registered emails. There's no real mailer
// here, so the link that would have been emailed is surfaced via toast
// instead (same pattern as verify-email's resend-code mock).
export async function requestPasswordReset({
  email,
}: ForgotPasswordInput): Promise<void> {
  await delay();

  const result = generatePasswordResetToken(email);
  if (!result) return;

  const resetLink = `${window.location.origin}/reset-password?token=${result.token}`;
  console.info(`[mock] Password reset link for ${email}: ${resetLink}`);
  sonnerToast(`A reset link was sent to ${email}`, {
    description: `(Mock) ${resetLink}`,
    duration: 10000,
  });
}

export async function resetPassword({
  token,
  password,
}: ResetPasswordInput): Promise<void> {
  await delay();
  resetUserPassword(token, password);
}
