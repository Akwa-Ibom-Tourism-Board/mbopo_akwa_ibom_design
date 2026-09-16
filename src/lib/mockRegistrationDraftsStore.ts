import { localStore, STORAGE_KEYS } from "./storage";
import type { RegistrationDraft } from "@/features/mbopo-registration/types";

// An in-progress (not yet submitted) application, keyed by user id — what
// "save and exit" persists. Separate from mockApplicationsStore, which only
// ever holds a *submitted* application; a user has at most one of each.
type DraftsById = Record<string, RegistrationDraft>;

function readAll(): DraftsById {
  return (
    localStore.get<DraftsById>(STORAGE_KEYS.mockRegistrationDraftsDb) ?? {}
  );
}

export function saveDraft(userId: string, record: RegistrationDraft): void {
  const all = readAll();
  localStore.set(STORAGE_KEYS.mockRegistrationDraftsDb, {
    ...all,
    [userId]: record,
  });
}

export function findDraftByUserId(
  userId: string,
): RegistrationDraft | undefined {
  return readAll()[userId];
}

export function clearDraft(userId: string): void {
  const all = readAll();
  if (!(userId in all)) return;
  const { [userId]: _removed, ...rest } = all;
  localStore.set(STORAGE_KEYS.mockRegistrationDraftsDb, rest);
}
