import { sessionStore, STORAGE_KEYS } from "./storage";

// Remembers which email is mid-verification so /verify-email survives a
// hard refresh — the account itself already exists by this point (created
// at registration time), this is just enough state to re-render the OTP
// screen without the router state that got it there.
const PENDING_TTL_MS = 30 * 60 * 1000;
export const OTP_LENGTH = 6;

export interface PendingEmailVerification {
  email: string;
  createdAt: number;
}

export function rememberPendingEmailVerification(email: string): void {
  sessionStore.set(STORAGE_KEYS.pendingRegistration, {
    email,
    createdAt: Date.now(),
  } satisfies PendingEmailVerification);
}

export function readPendingEmailVerification():
  PendingEmailVerification | undefined {
  const record = sessionStore.get<PendingEmailVerification>(
    STORAGE_KEYS.pendingRegistration,
  );
  if (!record) return undefined;
  if (Date.now() - record.createdAt > PENDING_TTL_MS) {
    sessionStore.remove(STORAGE_KEYS.pendingRegistration);
    return undefined;
  }
  return record;
}

export function clearPendingEmailVerification(): void {
  sessionStore.remove(STORAGE_KEYS.pendingRegistration);
}

export class OtpExpiredError extends Error {
  constructor() {
    super("Your verification code expired. Please request a new one.");
    this.name = "OtpExpiredError";
  }
}

export class OtpIncorrectError extends Error {
  constructor(public attemptsRemaining: number) {
    super(
      attemptsRemaining > 0
        ? `Incorrect code. ${attemptsRemaining} attempt${attemptsRemaining === 1 ? "" : "s"} remaining.`
        : "Too many incorrect attempts. Please request a new code.",
    );
    this.name = "OtpIncorrectError";
  }
}
