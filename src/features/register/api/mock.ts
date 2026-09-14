import { delay } from "@/lib/mockDelay";
import { createPendingRegistration } from "@/lib/pendingRegistrationStore";
import { sonnerToast } from "@/shared/ui";
import {
  NinNotFoundError,
  type Gender,
  type NinRecord,
  type RequestEmailVerificationInput,
  type RequestEmailVerificationResult,
} from "../types";

const NIN_PATTERN = /^\d{11}$/;

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
  gender: Gender,
  age: number,
): NinRecord {
  const seed = hashString(nin);
  const firstNamePool =
    gender === "female" ? FEMALE_FIRST_NAMES : MALE_FIRST_NAMES;
  return {
    nin,
    firstName: pick(firstNamePool, seed),
    lastName: pick(LAST_NAMES, seed >>> 3),
    gender,
    dateOfBirth: dateOfBirthForAge(age, seed),
  };
}

// Deterministic mock dataset. Reserved leading digits let the flow's every
// branch be exercised on demand during development/demo:
//   1… -> eligible female, 22-27          2… -> ineligible (male)
//   3… -> ineligible female, outside 22-27 00000000000 -> not found
// Anything else -> a stable, hash-derived record (same NIN always returns
// the same person, mirroring a real idempotent lookup).
export async function lookupNin(nin: string): Promise<NinRecord> {
  await delay();

  if (!NIN_PATTERN.test(nin) || nin === "00000000000") {
    throw new NinNotFoundError();
  }

  const seed = hashString(nin);

  if (nin.startsWith("1"))
    return buildRecordFromSeed(nin, "female", 22 + (seed % 6));
  if (nin.startsWith("2"))
    return buildRecordFromSeed(nin, "male", 22 + (seed % 6));
  if (nin.startsWith("3"))
    return buildRecordFromSeed(nin, "female", seed % 2 === 0 ? 19 : 32);

  const gender: Gender = seed % 2 === 0 ? "female" : "male";
  const age = 19 + (seed % 15);
  return buildRecordFromSeed(nin, gender, age);
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
