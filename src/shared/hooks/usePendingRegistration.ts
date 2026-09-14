import { useLocation } from "react-router-dom";
import { readPendingRegistration } from "@/lib/pendingRegistrationStore";

interface PendingRegistrationLocationState {
  pendingId?: string;
  email?: string;
}

export interface PendingRegistrationHandle {
  pendingId: string;
  email: string;
}

// Reached primarily via router state (set right after the NIN modal's
// submit), falling back to the sessionStorage-backed record for a hard
// refresh of /verify-email. Returns undefined when neither source has a
// valid, unexpired pending registration.
export function usePendingRegistration():
  PendingRegistrationHandle | undefined {
  const location = useLocation();
  const state = location.state as PendingRegistrationLocationState | null;

  if (state?.pendingId && state.email) {
    return { pendingId: state.pendingId, email: state.email };
  }

  const stored = readPendingRegistration();
  if (stored) {
    return { pendingId: stored.pendingId, email: stored.email };
  }

  return undefined;
}
