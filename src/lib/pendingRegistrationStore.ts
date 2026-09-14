import { sessionStore, STORAGE_KEYS } from "./storage";
import type { NinRecord } from "@/features/register/types";

// Shared, storage-backed record for the short window between "NIN verified,
// email submitted" and "OTP confirmed, account created." Both
// features/register (writes it) and features/verify-email (reads/mutates
// it) go through this module rather than reaching into each other's
// internals.
const PENDING_REGISTRATION_TTL_MS = 30 * 60 * 1000;
const OTP_EXPIRY_MS = 10 * 60 * 1000;
export const OTP_LENGTH = 6;
const MAX_OTP_ATTEMPTS = 5;

export interface PendingRegistrationRecord {
  pendingId: string;
  email: string;
  ninRecord: NinRecord;
  code: string;
  expiresAt: number;
  attempts: number;
  createdAt: number;
}

function generateOtpCode(): string {
  return Array.from({ length: OTP_LENGTH }, () =>
    Math.floor(Math.random() * 10),
  ).join("");
}

export function createPendingRegistration(
  ninRecord: NinRecord,
  email: string,
): PendingRegistrationRecord {
  const record: PendingRegistrationRecord = {
    pendingId: `pending_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
    email,
    ninRecord,
    code: generateOtpCode(),
    expiresAt: Date.now() + OTP_EXPIRY_MS,
    attempts: 0,
    createdAt: Date.now(),
  };
  sessionStore.set(STORAGE_KEYS.pendingRegistration, record);
  return record;
}

export function readPendingRegistration():
  PendingRegistrationRecord | undefined {
  const record = sessionStore.get<PendingRegistrationRecord>(
    STORAGE_KEYS.pendingRegistration,
  );
  if (!record) return undefined;
  if (Date.now() - record.createdAt > PENDING_REGISTRATION_TTL_MS) {
    sessionStore.remove(STORAGE_KEYS.pendingRegistration);
    return undefined;
  }
  return record;
}

export function regeneratePendingRegistrationCode(
  pendingId: string,
): PendingRegistrationRecord | undefined {
  const record = readPendingRegistration();
  if (!record || record.pendingId !== pendingId) return undefined;

  const next: PendingRegistrationRecord = {
    ...record,
    code: generateOtpCode(),
    expiresAt: Date.now() + OTP_EXPIRY_MS,
    attempts: 0,
  };
  sessionStore.set(STORAGE_KEYS.pendingRegistration, next);
  return next;
}

export class OtpExpiredError extends Error {
  constructor() {
    super("Your session expired. Please look up your NIN again.");
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

// Validates a submitted OTP against the pending record, incrementing the
// attempt counter on a mismatch. Returns the record on success; the caller
// clears it once the account has actually been created.
export function verifyPendingRegistrationCode(
  pendingId: string,
  code: string,
): PendingRegistrationRecord {
  const record = readPendingRegistration();
  if (!record || record.pendingId !== pendingId) {
    throw new OtpExpiredError();
  }
  if (Date.now() > record.expiresAt) {
    clearPendingRegistration();
    throw new OtpExpiredError();
  }
  if (record.attempts >= MAX_OTP_ATTEMPTS) {
    throw new OtpIncorrectError(0);
  }
  if (record.code !== code) {
    const next: PendingRegistrationRecord = {
      ...record,
      attempts: record.attempts + 1,
    };
    sessionStore.set(STORAGE_KEYS.pendingRegistration, next);
    throw new OtpIncorrectError(MAX_OTP_ATTEMPTS - next.attempts);
  }
  return record;
}

export function clearPendingRegistration(): void {
  sessionStore.remove(STORAGE_KEYS.pendingRegistration);
}
