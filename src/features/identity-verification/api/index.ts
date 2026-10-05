import { ApiError, request } from "@/lib/http";
import type { User } from "@/features/auth";
import {
  IneligibleAfterVerificationError,
  type VerifyIdentityInput,
} from "../types";

// The one-time NIN + selfie verification-and-commit — attaches the
// verified identity to the current account and returns the full updated
// User (see the backend's serializeUser), including the NIN-sourced
// profile photo. No separate preview call any more: a single request
// either succeeds (identity locked in) or fails with a specific reason
// (name mismatch, selfie mismatch, ineligible, etc.) — see FIX_ME.md on
// the backend for the full list of distinct error messages this can
// return, which are already clear enough to show directly.
export async function verifyIdentity(
  input: VerifyIdentityInput,
): Promise<User> {
  try {
    return await request<User>("/applicants/verify-identity", {
      method: "POST",
      body: JSON.stringify(input),
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
