import { useLocation } from "react-router-dom";
import { readPendingEmailVerification } from "@/lib/emailVerificationStore";

interface PendingRegistrationLocationState {
  email?: string;
}

export interface PendingRegistrationHandle {
  email: string;
}

// Reached primarily via router state (set right after registration
// succeeds), falling back to the sessionStorage-backed record for a hard
// refresh of /verify-email. Returns undefined when neither source has a
// valid, unexpired pending email verification.
export function usePendingRegistration():
  PendingRegistrationHandle | undefined {
  const location = useLocation();
  const state = location.state as PendingRegistrationLocationState | null;

  if (state?.email) {
    return { email: state.email };
  }

  const stored = readPendingEmailVerification();
  if (stored) {
    return { email: stored.email };
  }

  return undefined;
}
