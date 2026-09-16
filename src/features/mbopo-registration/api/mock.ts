import { delay } from "@/lib/mockDelay";
import { markApplicationSubmitted } from "@/lib/mockUsersStore";
import {
  saveApplication,
  findApplicationByUserId,
} from "@/lib/mockApplicationsStore";
import {
  saveDraft,
  findDraftByUserId,
  clearDraft,
} from "@/lib/mockRegistrationDraftsStore";
import type {
  SubmitApplicationInput,
  SubmitApplicationResult,
  SubmittedApplication,
  SaveDraftInput,
  RegistrationDraft,
} from "../types";

function generateReferenceCode(): string {
  const year = new Date().getFullYear();
  const suffix = Math.floor(100000 + Math.random() * 900000);
  return `MAI-${year}-${suffix}`;
}

export async function submitApplication({
  userId,
  values,
  photos,
}: SubmitApplicationInput): Promise<SubmitApplicationResult> {
  await delay(1000, 400);

  const referenceCode = generateReferenceCode();

  saveApplication(userId, {
    referenceCode,
    values,
    photos,
    submittedAt: Date.now(),
  });
  markApplicationSubmitted(userId);
  clearDraft(userId);

  return { referenceCode };
}

export async function getSubmittedApplication(
  userId: string,
): Promise<SubmittedApplication | null> {
  await delay(400, 200);
  // react-query (v5) treats a queryFn resolving to `undefined` as an
  // error — "no submission yet" has to be a real value.
  return findApplicationByUserId(userId) ?? null;
}

export async function saveRegistrationDraft({
  userId,
  values,
  currentStepIndex,
  photos,
}: SaveDraftInput): Promise<void> {
  await delay(400, 200);
  saveDraft(userId, {
    values,
    currentStepIndex,
    photos,
    updatedAt: Date.now(),
  });
}

export async function getRegistrationDraft(
  userId: string,
): Promise<RegistrationDraft | null> {
  await delay(300, 150);
  return findDraftByUserId(userId) ?? null;
}
