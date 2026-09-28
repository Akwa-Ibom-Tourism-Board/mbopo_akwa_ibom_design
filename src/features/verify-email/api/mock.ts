import { delay } from "@/lib/mockDelay";
import { clearPendingEmailVerification } from "@/lib/emailVerificationStore";
import {
  verifyUserEmailOtp,
  regenerateUserEmailOtp,
} from "@/lib/mockUsersStore";
import { createNotification } from "@/lib/mockNotificationsStore";
import { sonnerToast } from "@/shared/ui";
import type { ResendOtpInput, VerifyOtpInput, VerifyOtpResult } from "../types";

export async function verifyOtp({
  email,
  code,
}: VerifyOtpInput): Promise<VerifyOtpResult> {
  await delay();

  const record = verifyUserEmailOtp(email, code);
  clearPendingEmailVerification();

  createNotification({
    userId: record.id,
    title: "Welcome to Mbopo Akwa Ibom",
    body: "Your email has been verified. You can now log in.",
    type: "account",
  });
}

export async function resendOtp({ email }: ResendOtpInput): Promise<void> {
  await delay(500, 200);

  const result = regenerateUserEmailOtp(email);
  if (!result) return;

  console.info(`[mock] New verification code for ${email}: ${result.code}`);
  sonnerToast(`A new code was sent to ${email}`, {
    description: `(Mock) Your code is ${result.code}`,
    duration: 8000,
  });
}
