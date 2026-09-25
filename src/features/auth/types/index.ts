import type { Gender } from "@/features/register/types";

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  nin: string;
  vin: string;
  lga: string;
  ward: string;
  gender: Gender;
  dateOfBirth: string;
  email: string;
  applicationStatus: "not_started" | "submitted";
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

export class SessionExpiredError extends Error {
  constructor() {
    super("Your session has expired. Please log in again.");
    this.name = "SessionExpiredError";
  }
}
