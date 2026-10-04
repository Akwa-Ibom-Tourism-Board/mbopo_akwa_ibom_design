import { request } from "@/lib/http";
import { rememberPendingEmailVerification } from "@/lib/emailVerificationStore";
import type { RegisterInput, RegisterResult } from "../types";

export async function registerAccount({
  email,
  password,
}: RegisterInput): Promise<RegisterResult> {
  const result = await request<RegisterResult>("/auth/register", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
  rememberPendingEmailVerification(result.email);
  return result;
}
