export type Gender = "female" | "male";

export interface VerifyIdentityInput {
  nin: string;
  firstName: string;
  lastName: string;
  middleName?: string;
  // Base64 JPEG data URI captured from the live selfie camera.
  image: string;
}

// verify-identity.service.ts runs eligibility (gender, age, Akwa Ibom
// indigene) as part of the same call that checks the name and selfie match
// — on failure it responds 422 with these reasons, which need a dedicated
// list UI (IneligibleNotice) rather than a generic toast.
export class IneligibleAfterVerificationError extends Error {
  constructor(public reasons: string[]) {
    super("You are not eligible to register");
    this.name = "IneligibleAfterVerificationError";
  }
}
