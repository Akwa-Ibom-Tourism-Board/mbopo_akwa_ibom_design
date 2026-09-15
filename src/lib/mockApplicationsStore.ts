import { localStore, STORAGE_KEYS } from "./storage";
import type { RegistrationFormValues } from "@/features/mbopo-registration/schema";

// Shared, storage-backed record of submitted applications, keyed by user
// id. Written by features/mbopo-registration (on submit) and read by
// features/dashboard (to surface the reference code) — neither reaches
// into the other's internals.
export interface ApplicationRecord {
  referenceCode: string;
  values: RegistrationFormValues;
  submittedAt: number;
}

type ApplicationsById = Record<string, ApplicationRecord>;

function readAll(): ApplicationsById {
  return (
    localStore.get<ApplicationsById>(STORAGE_KEYS.mockApplicationsDb) ?? {}
  );
}

export function saveApplication(
  userId: string,
  record: ApplicationRecord,
): void {
  const all = readAll();
  localStore.set(STORAGE_KEYS.mockApplicationsDb, { ...all, [userId]: record });
}

export function findApplicationByUserId(
  userId: string,
): ApplicationRecord | undefined {
  return readAll()[userId];
}
