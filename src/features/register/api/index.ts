import { request } from "@/lib/http";
import { rememberPendingEmailVerification } from "@/lib/emailVerificationStore";
import type { RegisterInput, RegisterResult } from "../types";

export async function registerAccount({
  email,
  password,
  captchaToken,
}: RegisterInput): Promise<RegisterResult> {
  const result = await request<RegisterResult>("/auth/register", {
    method: "POST",
    body: JSON.stringify({ email, password, captchaToken }),
  });
  rememberPendingEmailVerification(result.email);
  return result;
}
