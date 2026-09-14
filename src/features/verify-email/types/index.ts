import type { Session } from "@/features/auth";

export interface VerifyOtpAndCreateAccountInput {
  pendingId: string;
  code: string;
  password: string;
}

export interface ResendOtpInput {
  pendingId: string;
}

export type VerifyOtpAndCreateAccountResult = Session;
