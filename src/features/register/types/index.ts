export interface RegisterInput {
  email: string;
  password: string;
  // Google reCAPTCHA token from the widget above the submit button. The
  // real backend doesn't accept or verify one (see its auth.routes.ts) —
  // purely a client-side anti-bot gate, same as login's.
  captchaToken: string;
}

export interface RegisterResult {
  email: string;
}
