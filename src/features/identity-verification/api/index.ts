import { ApiError, request } from "@/lib/http";
import type { User } from "@/features/auth";
import {
  IneligibleAfterVerificationError,
  type IdentityCheckResult,
  type VerifyIdentityInput,
} from "../types";

// Preview-only — safe to call repeatedly, persists nothing. The backend
// re-verifies NIN/VIN itself at verifyIdentity time regardless of what this
// returned, so this is purely for showing the applicant their own record
// before they commit to it.
export async function lookupNin(
  nin: string,
  vin: string,
): Promise<IdentityCheckResult> {
  return request<IdentityCheckResult>("/auth/identity-check", {
    method: "POST",
    body: JSON.stringify({ nin, vin }),
  });
}

// The one-time commit — attaches verified NIN/VIN identity to the current
// account. Returns the full updated User (see the backend's serializeUser),
// not just the fields this step filled in.
export async function verifyIdentity({
  nin,
  vin,
}: VerifyIdentityInput): Promise<User> {
  try {
    return await request<User>("/applicants/verify-identity", {
      method: "POST",
      body: JSON.stringify({ nin, vin }),
    });
  } catch (error) {
    if (error instanceof ApiError && error.status === 422) {
      const reasons = (error.data as { reasons?: string[] } | undefined)
        ?.reasons;
      if (reasons) throw new IneligibleAfterVerificationError(reasons);
    }
    throw error;
  }
}
