import { localStore, STORAGE_KEYS } from "./storage";
import type { Gender } from "@/features/register/types";

// A fake "users table" kept in localStorage so the login/OTP-signup flow
// has somewhere to persist accounts without a real backend. Shared by
// features/verify-email (creates the account) and features/auth (reads it
// for login/session-restore) — neither reaches into the other's internals.
//
// This is mock-only scaffolding, not a security reference: `passwordDigest`
// is a reversible placeholder, not a real password hash. A real backend
// would never do this.
export interface MockUserRecord {
  id: string;
  firstName: string;
  lastName: string;
  nin: string;
  gender: Gender;
  dateOfBirth: string;
  email: string;
  passwordDigest: string;
  applicationStatus: "not_started" | "submitted";
  createdAt: number;
}

function digestPassword(password: string): string {
  return btoa(unescape(encodeURIComponent(password)));
}

function readUsers(): MockUserRecord[] {
  return localStore.get<MockUserRecord[]>(STORAGE_KEYS.mockUsersDb) ?? [];
}

function writeUsers(users: MockUserRecord[]): void {
  localStore.set(STORAGE_KEYS.mockUsersDb, users);
}

export function findUserByEmail(email: string): MockUserRecord | undefined {
  return readUsers().find(
    (user) => user.email.toLowerCase() === email.toLowerCase(),
  );
}

export function findUserById(id: string): MockUserRecord | undefined {
  return readUsers().find((user) => user.id === id);
}

export interface CreateUserInput {
  firstName: string;
  lastName: string;
  nin: string;
  gender: Gender;
  dateOfBirth: string;
  email: string;
  password: string;
}

export function createUser(input: CreateUserInput): MockUserRecord {
  const users = readUsers();
  const record: MockUserRecord = {
    id: `user_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
    firstName: input.firstName,
    lastName: input.lastName,
    nin: input.nin,
    gender: input.gender,
    dateOfBirth: input.dateOfBirth,
    email: input.email,
    passwordDigest: digestPassword(input.password),
    applicationStatus: "not_started",
    createdAt: Date.now(),
  };
  writeUsers([...users, record]);
  return record;
}

export function verifyPassword(
  user: MockUserRecord,
  password: string,
): boolean {
  return user.passwordDigest === digestPassword(password);
}

export function markApplicationSubmitted(userId: string): void {
  const users = readUsers();
  writeUsers(
    users.map((user) =>
      user.id === userId
        ? { ...user, applicationStatus: "submitted" as const }
        : user,
    ),
  );
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
