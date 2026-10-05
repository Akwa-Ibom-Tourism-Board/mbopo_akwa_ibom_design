import type { Gender } from "@/features/identity-verification/types";

// Mirrors the backend's serializeUser exactly (see auth.helpers.ts) — note
// there's no applicationStatus here: that lives on the separate
// Application row (see @/features/mbopo-registration), fetched
// independently rather than bundled onto the user.
export interface User {
  id: string;
  email: string;
  avatarUrl?: string | null;
  emailVerified: boolean;
  // Unset until the applicant completes the one-time NIN/VIN identity
  // check from their dashboard (see @/features/identity-verification) —
  // not collected at registration time any more.
  identityVerified: boolean;
  firstName?: string | null;
  lastName?: string | null;
  middleName?: string | null;
  phoneNumber?: string | null;
  nin?: string | null;
  // Unset until the applicant reaches and verifies the VIN field on the
  // last step of registration — no longer set alongside NIN at the
  // identity-verification gate. Legacy accounts verified under the old
  // combined NIN+VIN flow already have this populated.
  vin?: string | null;
  gender?: Gender | null;
  dateOfBirth?: string | null;
  // Legacy-only: the old flow derived these from the VIN lookup. Nothing
  // writes them any more — Local Government of Origin is now picked by the
  // applicant from a fixed dropdown inside the registration form itself
  // (see @/features/mbopo-registration), and ward was removed from the
  // product outright. Kept here only so an already-verified legacy
  // account's existing values don't disappear from the type.
  localGovernment?: string | null;
  ward?: string | null;
  createdAt: string;
}

// `User` narrowed to the shape every step past the identity-verification
// gate can rely on — those steps read `user.nin`, `user.firstName`, etc.
// as locked, already-verified fields, so they take this type instead of
// plain `User` and the gate is the only place responsible for the
// narrowing. Deliberately does NOT require `vin` (verified later, at the
// end of registration, not here) or `localGovernment`/`ward` (no longer
// sourced from identity verification at all — see the fields' own
// comments on `User`).
export interface VerifiedUser extends User {
  firstName: string;
  lastName: string;
  nin: string;
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
    Boolean(user.gender) &&
    Boolean(user.dateOfBirth)
  );
}

export interface Session {
  token: string;
  refreshToken: string;
  user: User;
}

export interface LoginInput {
  email: string;
  password: string;
  // Google reCAPTCHA token from the widget above the submit button;
  // verified server-side (see the backend's configurations/captcha.ts).
  captchaToken: string;
}

// Login's 400 (wrong credentials) and 403 (unverified email) are both
// already friendly, user-safe messages — see lib/http.ts's
// friendlyMessage, used instead of per-case error classes here.

export interface ChangePasswordInput {
  currentPassword: string;
  newPassword: string;
}

export class IncorrectPasswordError extends Error {
  constructor() {
    super("Your current password is incorrect.");
    this.name = "IncorrectPasswordError";
  }
}
