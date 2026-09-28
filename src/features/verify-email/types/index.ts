export interface VerifyOtpInput {
  email: string;
  code: string;
}

export interface ResendOtpInput {
  email: string;
}

export type VerifyOtpResult = void;
