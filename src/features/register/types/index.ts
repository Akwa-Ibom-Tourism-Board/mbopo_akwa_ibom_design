export interface RegisterInput {
  email: string;
  password: string;
  // Google reCAPTCHA token from the widget above the submit button;
  // verified server-side (see the backend's configurations/captcha.ts).
  captchaToken: string;
}

export interface RegisterResult {
  email: string;
}
