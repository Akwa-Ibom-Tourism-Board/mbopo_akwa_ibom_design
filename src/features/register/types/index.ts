export interface RegisterInput {
  email: string;
  password: string;
  // Google reCAPTCHA token from the widget above the submit button. Mocked
  // today (see api/mock.ts); a real backend must verify it server-side
  // against Google's siteverify endpoint before creating the account.
  captchaToken: string;
}

export interface RegisterResult {
  email: string;
}
