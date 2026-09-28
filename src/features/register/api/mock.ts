import { delay } from "@/lib/mockDelay";
import { createUser } from "@/lib/mockUsersStore";
import { rememberPendingEmailVerification } from "@/lib/emailVerificationStore";
import { sonnerToast } from "@/shared/ui";
import type { RegisterInput, RegisterResult } from "../types";

// captchaToken is accepted to keep this mock's signature matching the real
// RegisterInput contract, but isn't checked here — a real backend must
// verify it against Google's siteverify endpoint before creating the
// account. Re-throws EmailAlreadyRegisteredError (from mockUsersStore) as
// the account-creation failure case the page's mutation handles.
export async function registerAccount({
  email,
  password,
}: RegisterInput): Promise<RegisterResult> {
  await delay();

  const { record, code } = createUser({ email, password });
  rememberPendingEmailVerification(record.email);

  // No real email provider is wired up — surface the code so the flow is
  // testable end to end without an inbox.
  console.info(`[mock] Verification code for ${record.email}: ${code}`);
  sonnerToast(`Verification code sent to ${record.email}`, {
    description: `(Mock) Your code is ${code}`,
    duration: 8000,
  });

  return { email: record.email };
}
