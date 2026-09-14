export type Gender = "female" | "male";

export interface NinRecord {
  nin: string;
  firstName: string;
  lastName: string;
  gender: Gender;
  dateOfBirth: string; // ISO date, YYYY-MM-DD
}

export interface EligibilityResult {
  eligible: boolean;
  reasons: string[];
}

export class NinNotFoundError extends Error {
  constructor(
    message = "No record was found for this NIN. Please check the number and try again.",
  ) {
    super(message);
    this.name = "NinNotFoundError";
  }
}

export interface RequestEmailVerificationInput {
  ninRecord: NinRecord;
  email: string;
}

export interface RequestEmailVerificationResult {
  pendingId: string;
  email: string;
}
