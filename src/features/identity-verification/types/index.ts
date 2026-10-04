export type Gender = "female" | "male";

export interface NinRecord {
  nin: string;
  vin: string;
  firstName: string;
  lastName: string;
  gender: Gender;
  dateOfBirth: string; // ISO date, YYYY-MM-DD
  localGovernment: string; // derived from the VIN lookup
  ward: string; // derived from the VIN lookup
}

// What POST /auth/identity-check returns — eligibility is decided entirely
// server-side (gender, calendar-year age, Akwa Ibom indigene — see the
// backend's identity-check.service.ts), never recomputed here, so this
// feature can't silently drift from the rules the backend actually
// enforces at verify time.
export interface IdentityCheckResult {
  eligible: boolean;
  reasons: string[];
  identity: NinRecord;
}

export interface VerifyIdentityInput {
  nin: string;
  vin: string;
}

// verify-identity.service.ts double-checks eligibility again at commit
// time (never trusting the client-held result of an earlier identity-check
// call) and responds 422 with these reasons if it no longer holds —
// unlikely in normal use, but the UI needs to show the real reasons rather
// than a generic failure message when it happens.
export class IneligibleAfterVerificationError extends Error {
  constructor(public reasons: string[]) {
    super("You are not eligible to register");
    this.name = "IneligibleAfterVerificationError";
  }
}
