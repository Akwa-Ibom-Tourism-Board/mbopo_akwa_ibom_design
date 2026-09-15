import { delay } from "@/lib/mockDelay";
import {
  findUserByEmail,
  findUserById,
  mintToken,
  readTokenPayload,
  verifyPassword,
  type MockUserRecord,
} from "@/lib/mockUsersStore";
import {
  InvalidCredentialsError,
  SessionExpiredError,
  type LoginInput,
  type Session,
  type User,
} from "../types";

function toPublicUser(record: MockUserRecord): User {
  return {
    id: record.id,
    firstName: record.firstName,
    lastName: record.lastName,
    nin: record.nin,
    vin: record.vin,
    lga: record.lga,
    ward: record.ward,
    gender: record.gender,
    dateOfBirth: record.dateOfBirth,
    email: record.email,
    applicationStatus: record.applicationStatus,
  };
}

export async function login({ email, password }: LoginInput): Promise<Session> {
  await delay();

  const record = findUserByEmail(email);
  if (!record || !verifyPassword(record, password)) {
    throw new InvalidCredentialsError();
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
