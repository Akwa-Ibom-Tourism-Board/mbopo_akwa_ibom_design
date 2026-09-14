import { differenceInYears } from "date-fns";
import type { EligibilityResult, NinRecord } from "./types";

export const MINIMUM_ELIGIBLE_AGE = 22;
export const MAXIMUM_ELIGIBLE_AGE = 27;

export function calculateAge(dateOfBirth: string): number {
  return differenceInYears(new Date(), new Date(dateOfBirth));
}

export function evaluateEligibility(record: NinRecord): EligibilityResult {
  const reasons: string[] = [];
  const age = calculateAge(record.dateOfBirth);

  if (record.gender !== "female") {
    reasons.push("Mbobpo Akwa Ibom is open to female applicants only.");
  }

  if (age < MINIMUM_ELIGIBLE_AGE || age > MAXIMUM_ELIGIBLE_AGE) {
    reasons.push(
      `Applicants must be between ${MINIMUM_ELIGIBLE_AGE} and ${MAXIMUM_ELIGIBLE_AGE} years old. Our records show you are ${age}.`,
    );
  }

  return { eligible: reasons.length === 0, reasons };
}
