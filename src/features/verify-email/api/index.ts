import { request } from "@/lib/http";
import { clearPendingEmailVerification } from "@/lib/emailVerificationStore";
import type { ResendOtpInput, VerifyOtpInput } from "../types";

export async function verifyOtp({
  email,
  code,
}: VerifyOtpInput): Promise<void> {
  // The backend's field is `otp`, not `code` — kept as `code` on this
  // side since it reads better against the OtpForm/OTP_LENGTH naming.
  await request<void>("/auth/verify-email-otp", {
    method: "POST",
    body: JSON.stringify({ email, otp: code }),
  });
  clearPendingEmailVerification();
}

export async function resendOtp({ email }: ResendOtpInput): Promise<void> {
  await request<void>("/auth/resend-email-otp", {
    method: "POST",
    body: JSON.stringify({ email }),
  });
}
