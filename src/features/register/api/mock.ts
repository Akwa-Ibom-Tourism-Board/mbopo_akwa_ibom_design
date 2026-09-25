import { delay } from "@/lib/mockDelay";
import { LOCAL_GOVERNMENT_AREAS } from "@/lib/akwaIbomLgas";
import { createPendingRegistration } from "@/lib/pendingRegistrationStore";
import { sonnerToast } from "@/shared/ui";
import {
  NinNotFoundError,
  VinNotFoundError,
  type Gender,
  type NinRecord,
  type RequestEmailVerificationInput,
  type RequestEmailVerificationResult,
} from "../types";

const NIN_PATTERN = /^\d{11}$/;
const VIN_PATTERN = /^[A-Z0-9]{19}$/;

const FEMALE_FIRST_NAMES = [
  "Uduak",
  "Mfoniso",
  "Idara",
  "Ekaette",
  "Eno",
  "Itoro",
  "Edidiong",
  "Aniedi",
];
const MALE_FIRST_NAMES = [
  "Nsikak",
  "Emmanuel",
  "Kufre",
  "Ubong",
  "Otobong",
  "Ifiok",
  "Akaninyene",
  "Ime",
];
const LAST_NAMES = [
  "Akpan",
  "Udoh",
  "Etim",
  "Umoh",
  "Ekong",
  "Bassey",
  "Essien",
  "Inyang",
  "Effiong",
  "Okon",
];
const WARD_COUNT = 12;

function hashString(value: string): number {
  let hash = 0;
  for (let i = 0; i < value.length; i++) {
    hash = (hash * 31 + value.charCodeAt(i)) >>> 0;
  }
  return hash;
}

function pick<T>(items: T[], seed: number): T {
  // seed can exceed 2^31 (from the unsigned hash), so a plain `%` on a
  // negative seed (e.g. after a signed right-shift) would produce a
  // negative index — normalize to a non-negative index first.
  const index = ((seed % items.length) + items.length) % items.length;
  const item = items[index];
  if (item === undefined) throw new Error("Cannot pick from an empty list");
  return item;
}

function dateOfBirthForAge(age: number, dayOffset: number): string {
  const today = new Date();
  const birthYear = today.getFullYear() - age;
  const birthDate = new Date(birthYear, 0, 1 + (dayOffset % 365));
  return birthDate.toISOString().slice(0, 10);
}

function buildRecordFromSeed(
  nin: string,
  vin: string,
  gender: Gender,
  age: number,
): NinRecord {
  const seed = hashString(nin);
  const firstNamePool =
    gender === "female" ? FEMALE_FIRST_NAMES : MALE_FIRST_NAMES;

  // The VIN carries the voter's registered LGA and ward, so both are
  // derived from it (not the NIN) and never left for the applicant to edit.
  const vinSeed = hashString(vin);
  const wardNumber = 1 + ((vinSeed >>> 4) % WARD_COUNT);

  return {
    nin,
    vin,
    firstName: pick(firstNamePool, seed),
    lastName: pick(LAST_NAMES, seed >>> 3),
    gender,
    dateOfBirth: dateOfBirthForAge(age, seed),
    lga: pick([...LOCAL_GOVERNMENT_AREAS], vinSeed),
    ward: `Ward ${wardNumber}`,
  };
}

// Deterministic mock dataset. Reserved leading digits let the flow's every
// branch be exercised on demand during development/demo:
//   1… -> eligible female, 22-27          2… -> ineligible (male)
//   3… -> ineligible female, outside 22-27 00000000000 -> NIN not found
// A VIN of all zeros ("0" x 19) simulates a VIN that doesn't match any
// record. Anything else -> a stable, hash-derived record (same NIN always
// returns the same person, mirroring a real idempotent lookup).
// captchaToken is accepted so this mock's signature matches the real
// contract, but isn't checked here — a real backend must verify it against
// Google's siteverify endpoint before running the lookup.
export async function lookupNin(
  nin: string,
  vin: string,
  captchaToken: string,
): Promise<NinRecord> {
  await delay();

  if (!NIN_PATTERN.test(nin) || nin === "00000000000") {
    throw new NinNotFoundError();
  }
  if (!VIN_PATTERN.test(vin) || vin === "0".repeat(19)) {
    throw new VinNotFoundError();
  }

  const seed = hashString(nin);

  if (nin.startsWith("1"))
    return buildRecordFromSeed(nin, vin, "female", 22 + (seed % 6));
  if (nin.startsWith("2"))
    return buildRecordFromSeed(nin, vin, "male", 22 + (seed % 6));
  if (nin.startsWith("3"))
    return buildRecordFromSeed(nin, vin, "female", seed % 2 === 0 ? 19 : 32);

  const gender: Gender = seed % 2 === 0 ? "female" : "male";
  const age = 19 + (seed % 15);
  return buildRecordFromSeed(nin, vin, gender, age);
}

export async function requestEmailVerification({
  ninRecord,
  email,
}: RequestEmailVerificationInput): Promise<RequestEmailVerificationResult> {
  await delay();

  const record = createPendingRegistration(ninRecord, email);

  // No real email provider is wired up — surface the code so the flow is
  // testable end to end without an inbox.
  console.info(`[mock] Verification code for ${email}: ${record.code}`);
  sonnerToast(`Verification code sent to ${email}`, {
    description: `(Mock) Your code is ${record.code}`,
    duration: 8000,
  });

  return { pendingId: record.pendingId, email };
}
