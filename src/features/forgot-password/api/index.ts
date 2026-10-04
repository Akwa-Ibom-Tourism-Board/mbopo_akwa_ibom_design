import { request } from "@/lib/http";
import type { ForgotPasswordInput, ResetPasswordInput } from "../types";

export async function requestPasswordReset(
  input: ForgotPasswordInput,
): Promise<void> {
  await request<void>("/auth/forgot-password", {
    method: "POST",
    body: JSON.stringify(input),
  });
}

export async function resetPassword(input: ResetPasswordInput): Promise<void> {
  await request<void>("/auth/reset-password", {
    method: "POST",
    body: JSON.stringify(input),
  });
}
