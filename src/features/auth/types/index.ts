import type { Gender } from "@/features/identity-verification/types";

export interface User {
  id: string;
  email: string;
  applicationStatus: "not_started" | "submitted";
  // Data URL in the mock (see mockUsersStore.ts); a real backend serves
  // this as an uploaded-file URL instead (POST /auth/avatar). Undefined
  // until the applicant uploads one — the UI falls back to a placeholder.
  avatarUrl?: string;

  // Unset until the applicant completes the one-time NIN/VIN identity
  // check from their dashboard (see @/features/identity-verification) —
  // not collected at registration time any more.
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

// `User` narrowed to the shape every step past the identity-verification
// gate can rely on — those steps read `user.nin`, `user.firstName`, etc.
// as locked, already-verified fields, so they take this type instead of
// plain `User` and the gate is the only place responsible for the narrowing.
export interface VerifiedUser extends User {
  firstName: string;
  lastName: string;
  nin: string;
  vin: string;
  lga: string;
  ward: string;
  gender: Gender;
  dateOfBirth: string;
  identityVerified: true;
}

export function isVerifiedUser(user: User): user is VerifiedUser {
  return (
    user.identityVerified &&
    Boolean(user.firstName) &&
    Boolean(user.lastName) &&
    Boolean(user.nin) &&
    Boolean(user.vin) &&
    Boolean(user.lga) &&
    Boolean(user.ward) &&
    Boolean(user.gender) &&
    Boolean(user.dateOfBirth)
  );
}

export interface Session {
  token: string;
  user: User;
}

export interface LoginInput {
  email: string;
  password: string;
  // Google reCAPTCHA token from the widget above the submit button. Mocked
  // today (see api/mock.ts); a real backend must verify it server-side
  // against Google's siteverify endpoint before checking credentials.
  captchaToken: string;
}

export class InvalidCredentialsError extends Error {
  constructor() {
    super("Incorrect email or password.");
    this.name = "InvalidCredentialsError";
  }
}

export class EmailNotVerifiedError extends Error {
  constructor() {
    super("Please verify your email before logging in.");
    this.name = "EmailNotVerifiedError";
  }
}

export class SessionExpiredError extends Error {
  constructor() {
    super("Your session has expired. Please log in again.");
    this.name = "SessionExpiredError";
  }
}
