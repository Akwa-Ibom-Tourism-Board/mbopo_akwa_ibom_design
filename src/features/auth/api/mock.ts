import { delay } from "@/lib/mockDelay";
import {
  findUserByEmail,
  findUserById,
  mintToken,
  readTokenPayload,
  verifyPassword,
  updateUserAvatar,
  type MockUserRecord,
} from "@/lib/mockUsersStore";
import {
  EmailNotVerifiedError,
  InvalidCredentialsError,
  SessionExpiredError,
  type LoginInput,
  type Session,
  type User,
} from "../types";

function toPublicUser(record: MockUserRecord): User {
  return {
    id: record.id,
    email: record.email,
    applicationStatus: record.applicationStatus,
    avatarUrl: record.avatarUrl,
    identityVerified: record.identityVerified,
    firstName: record.firstName,
    lastName: record.lastName,
    nin: record.nin,
    vin: record.vin,
    lga: record.lga,
    ward: record.ward,
    gender: record.gender,
    dateOfBirth: record.dateOfBirth,
  };
}

// captchaToken is accepted to keep this mock's signature matching the real
// LoginInput contract, but isn't checked here — a real backend must verify
// it against Google's siteverify endpoint before checking credentials.
export async function login({ email, password }: LoginInput): Promise<Session> {
  await delay();

  const record = findUserByEmail(email);
  if (!record || !verifyPassword(record, password)) {
    throw new InvalidCredentialsError();
  }
  if (!record.emailVerified) {
    throw new EmailNotVerifiedError();
  }

  return { token: mintToken(record.id), user: toPublicUser(record) };
}

// Simulates a `/me` session-restore call: decodes the stored token and
// re-fetches the current user record, the way a real backend would
// validate a bearer token server-side.
export async function getCurrentUser(token: string): Promise<User> {
  await delay(400, 200);

  const payload = readTokenPayload(token);
  const record = payload && findUserById(payload.sub);
  if (!record) {
    throw new SessionExpiredError();
  }

  return toPublicUser(record);
}

// Mirrors the real backend's POST /auth/avatar (multipart) — mocked here as
// a data-URL update on the stored user record, matching how the
// registration flow's own photo fields are persisted (see photoEncoding.ts).
export async function updateAvatar(
  userId: string,
  avatarDataUrl: string,
): Promise<User> {
  await delay();

  const record = updateUserAvatar(userId, avatarDataUrl);
  if (!record) {
    throw new SessionExpiredError();
  }

  return toPublicUser(record);
}
