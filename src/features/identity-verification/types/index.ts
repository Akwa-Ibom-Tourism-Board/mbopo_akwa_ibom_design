export type Gender = "female" | "male";

export interface NinRecord {
  nin: string;
  vin: string;
  firstName: string;
  lastName: string;
  gender: Gender;
  dateOfBirth: string; // ISO date, YYYY-MM-DD
  lga: string; // derived from the VIN lookup
  ward: string; // derived from the VIN lookup, formatted "Ward <n>"
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

export class VinNotFoundError extends Error {
  constructor(
    message = "No record was found for this VIN. Please check the number and try again.",
  ) {
    super(message);
    this.name = "VinNotFoundError";
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
