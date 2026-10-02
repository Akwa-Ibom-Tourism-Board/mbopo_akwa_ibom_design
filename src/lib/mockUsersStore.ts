import { localStore, STORAGE_KEYS } from "./storage";
import {
  OTP_LENGTH,
  OtpExpiredError,
  OtpIncorrectError,
} from "./emailVerificationStore";
import type { Gender, NinRecord } from "@/features/identity-verification/types";

// A fake "users table" kept in localStorage so the register/OTP/login flow
// has somewhere to persist accounts without a real backend. This mirrors
// the real backend's design: the account row is created at registration
// time (email + password only) with the OTP hash/expiry living on that
// same row, and identity (NIN/VIN) is verified and attached later, once,
// from the dashboard — not at registration time.
//
// This is mock-only scaffolding, not a security reference: `passwordDigest`
// is a reversible placeholder, not a real password hash. A real backend
// would never do this.
export interface MockUserRecord {
  id: string;
  email: string;
  passwordDigest: string;
  applicationStatus: "not_started" | "submitted";
  avatarUrl?: string;
  createdAt: number;

  emailVerified: boolean;
  emailOtpCode?: string;
  emailOtpExpiresAt?: number;
  emailOtpAttempts: number;

  // Set only while a forgot-password link is outstanding; cleared the
  // moment it's used (or replaced by a newer request). Mirrors the real
  // backend's passwordResetTokenHash/passwordResetExpiresAt columns, minus
  // the hashing — there's no secret worth protecting in a localStorage mock.
  passwordResetToken?: string;
  passwordResetExpiresAt?: number;

  // Unset until the applicant completes the NIN/VIN identity check from
  // their dashboard — a one-time step, gated by `identityVerified`.
  identityVerified: boolean;
  firstName?: string;
  lastName?: string;
  nin?: string;
  vin?: string;
  lga?: string;
  ward?: string;
  gender?: Gender;
  dateOfBirth?: string;
}

const OTP_TTL_MS = 10 * 60 * 1000;
const MAX_OTP_ATTEMPTS = 5;
// Matches the real backend's RESET_TOKEN_TTL_MS.
const PASSWORD_RESET_TTL_MS = 60 * 60 * 1000;

function digestPassword(password: string): string {
  return btoa(unescape(encodeURIComponent(password)));
}

function generateOtpCode(): string {
  return Array.from({ length: OTP_LENGTH }, () =>
    Math.floor(Math.random() * 10),
  ).join("");
}

function generateResetToken(): string {
  return Array.from({ length: 32 }, () =>
    Math.floor(Math.random() * 16).toString(16),
  ).join("");
}

function readUsers(): MockUserRecord[] {
  return localStore.get<MockUserRecord[]>(STORAGE_KEYS.mockUsersDb) ?? [];
}

function writeUsers(users: MockUserRecord[]): void {
  localStore.set(STORAGE_KEYS.mockUsersDb, users);
}

function updateUser(
  userId: string,
  patch: Partial<MockUserRecord>,
): MockUserRecord | undefined {
  const users = readUsers();
  let updated: MockUserRecord | undefined;
  writeUsers(
    users.map((user) => {
      if (user.id !== userId) return user;
      updated = { ...user, ...patch };
      return updated;
    }),
  );
  return updated;
}

export function findUserByEmail(email: string): MockUserRecord | undefined {
  return readUsers().find(
    (user) => user.email.toLowerCase() === email.toLowerCase(),
  );
}

export function findUserById(id: string): MockUserRecord | undefined {
  return readUsers().find((user) => user.id === id);
}

function findUserByNin(nin: string): MockUserRecord | undefined {
  return readUsers().find((user) => user.nin === nin);
}

function findUserByVin(vin: string): MockUserRecord | undefined {
  return readUsers().find((user) => user.vin === vin);
}

export class EmailAlreadyRegisteredError extends Error {
  constructor() {
    super("An account with this email already exists.");
    this.name = "EmailAlreadyRegisteredError";
  }
}

export class IdentityAlreadyVerifiedError extends Error {
  constructor() {
    super("Your identity has already been verified.");
    this.name = "IdentityAlreadyVerifiedError";
  }
}

export class DuplicateIdentityError extends Error {
  constructor() {
    super(
      "This NIN or VIN is already linked to another account. Please contact support if you believe this is a mistake.",
    );
    this.name = "DuplicateIdentityError";
  }
}

export class InvalidResetTokenError extends Error {
  constructor() {
    super("This reset link is invalid. Please request a new one.");
    this.name = "InvalidResetTokenError";
  }
}

export class ResetTokenExpiredError extends Error {
  constructor() {
    super("This reset link has expired. Please request a new one.");
    this.name = "ResetTokenExpiredError";
  }
}

export interface CreateUserInput {
  email: string;
  password: string;
}

// Creates the account immediately (email + password only) and stamps an
// OTP onto that same row — matching the real backend, where OTP hash/expiry
// live on the User row itself rather than a separate pending-registration
// table. Returns the raw code alongside the record purely so the mock API
// layer can surface it (console + toast) in place of a real email send.
export function createUser(input: CreateUserInput): {
  record: MockUserRecord;
  code: string;
} {
  if (findUserByEmail(input.email)) {
    throw new EmailAlreadyRegisteredError();
  }

  const users = readUsers();
  const code = generateOtpCode();
  const record: MockUserRecord = {
    id: `user_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
    email: input.email,
    passwordDigest: digestPassword(input.password),
    applicationStatus: "not_started",
    createdAt: Date.now(),
    emailVerified: false,
    emailOtpCode: code,
    emailOtpExpiresAt: Date.now() + OTP_TTL_MS,
    emailOtpAttempts: 0,
    identityVerified: false,
  };
  writeUsers([...users, record]);
  return { record, code };
}

export function verifyPassword(
  user: MockUserRecord,
  password: string,
): boolean {
  return user.passwordDigest === digestPassword(password);
}

// Validates a submitted OTP against the user's own row, incrementing the
// attempt counter on a mismatch, then flips emailVerified and clears the
// OTP fields on success.
export function verifyUserEmailOtp(
  email: string,
  code: string,
): MockUserRecord {
  const user = findUserByEmail(email);
  if (!user || !user.emailOtpCode || !user.emailOtpExpiresAt) {
    throw new OtpExpiredError();
  }
  if (Date.now() > user.emailOtpExpiresAt) {
    updateUser(user.id, {
      emailOtpCode: undefined,
      emailOtpExpiresAt: undefined,
      emailOtpAttempts: 0,
    });
    throw new OtpExpiredError();
  }
  if (user.emailOtpAttempts >= MAX_OTP_ATTEMPTS) {
    throw new OtpIncorrectError(0);
  }
  if (user.emailOtpCode !== code) {
    const attempts = user.emailOtpAttempts + 1;
    updateUser(user.id, { emailOtpAttempts: attempts });
    throw new OtpIncorrectError(MAX_OTP_ATTEMPTS - attempts);
  }

  const updated = updateUser(user.id, {
    emailVerified: true,
    emailOtpCode: undefined,
    emailOtpExpiresAt: undefined,
    emailOtpAttempts: 0,
  });
  if (!updated) throw new OtpExpiredError();
  return updated;
}

export function regenerateUserEmailOtp(
  email: string,
): { record: MockUserRecord; code: string } | undefined {
  const user = findUserByEmail(email);
  if (!user || user.emailVerified) return undefined;

  const code = generateOtpCode();
  const updated = updateUser(user.id, {
    emailOtpCode: code,
    emailOtpExpiresAt: Date.now() + OTP_TTL_MS,
    emailOtpAttempts: 0,
  });
  if (!updated) return undefined;
  return { record: updated, code };
}

// Mirrors the real backend's forgot-password service: always looks the user
// up silently and returns undefined if there's no match, so the calling
// api/mock.ts layer never has anything to throw — the UI can't be used to
// enumerate which emails have accounts, same as the real endpoint's "always
// 200" response.
export function generatePasswordResetToken(
  email: string,
): { record: MockUserRecord; token: string } | undefined {
  const user = findUserByEmail(email);
  if (!user) return undefined;

  const token = generateResetToken();
  const updated = updateUser(user.id, {
    passwordResetToken: token,
    passwordResetExpiresAt: Date.now() + PASSWORD_RESET_TTL_MS,
  });
  if (!updated) return undefined;
  return { record: updated, token };
}

export function resetUserPassword(
  token: string,
  newPassword: string,
): MockUserRecord {
  const user = readUsers().find((u) => u.passwordResetToken === token);
  if (!user) {
    throw new InvalidResetTokenError();
  }
  if (!user.passwordResetExpiresAt || Date.now() > user.passwordResetExpiresAt) {
    updateUser(user.id, {
      passwordResetToken: undefined,
      passwordResetExpiresAt: undefined,
    });
    throw new ResetTokenExpiredError();
  }

  const updated = updateUser(user.id, {
    passwordDigest: digestPassword(newPassword),
    passwordResetToken: undefined,
    passwordResetExpiresAt: undefined,
  });
  if (!updated) throw new InvalidResetTokenError();
  return updated;
}

// Used by the authenticated change-password flow, once the caller has
// already verified the current password itself (see auth/api/mock.ts).
export function updateUserPasswordDigest(
  userId: string,
  newPassword: string,
): MockUserRecord | undefined {
  return updateUser(userId, { passwordDigest: digestPassword(newPassword) });
}

export function markApplicationSubmitted(userId: string): void {
  updateUser(userId, { applicationStatus: "submitted" });
}

export function updateUserAvatar(
  userId: string,
  avatarUrl: string,
): MockUserRecord | undefined {
  return updateUser(userId, { avatarUrl });
}

// The one-time step that attaches verified NIN/VIN identity to an already
// existing account — never re-runnable once `identityVerified` is true, and
// guarded against the same NIN/VIN being claimed by more than one account.
export function verifyUserIdentity(
  userId: string,
  ninRecord: NinRecord,
): MockUserRecord | undefined {
  const user = findUserById(userId);
  if (!user) return undefined;
  if (user.identityVerified) {
    throw new IdentityAlreadyVerifiedError();
  }

  const claimedByNin = findUserByNin(ninRecord.nin);
  const claimedByVin = findUserByVin(ninRecord.vin);
  if (
    (claimedByNin && claimedByNin.id !== userId) ||
    (claimedByVin && claimedByVin.id !== userId)
  ) {
    throw new DuplicateIdentityError();
  }

  return updateUser(userId, {
    firstName: ninRecord.firstName,
    lastName: ninRecord.lastName,
    nin: ninRecord.nin,
    vin: ninRecord.vin,
    lga: ninRecord.lga,
    ward: ninRecord.ward,
    gender: ninRecord.gender,
    dateOfBirth: ninRecord.dateOfBirth,
    identityVerified: true,
  });
}

// A fake, non-cryptographic "session token" — just enough shape (subject +
// expiry) to exercise a real token-restore flow on app boot.
interface MockTokenPayload {
  sub: string;
  iat: number;
  exp: number;
}

const TOKEN_TTL_MS = 7 * 24 * 60 * 60 * 1000;

export function mintToken(userId: string): string {
  const payload: MockTokenPayload = {
    sub: userId,
    iat: Date.now(),
    exp: Date.now() + TOKEN_TTL_MS,
  };
  return btoa(JSON.stringify(payload));
}

export function readTokenPayload(token: string): MockTokenPayload | undefined {
  try {
    const payload = JSON.parse(atob(token)) as MockTokenPayload;
    if (payload.exp < Date.now()) return undefined;
    return payload;
  } catch {
    return undefined;
  }
}
