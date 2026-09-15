import { delay } from "@/lib/mockDelay";
import { markApplicationSubmitted } from "@/lib/mockUsersStore";
import { saveApplication } from "@/lib/mockApplicationsStore";
import type { SubmitApplicationInput, SubmitApplicationResult } from "../types";

function generateReferenceCode(): string {
  const year = new Date().getFullYear();
  const suffix = Math.floor(100000 + Math.random() * 900000);
  return `MAI-${year}-${suffix}`;
}

export async function submitApplication({
  userId,
  values,
}: SubmitApplicationInput): Promise<SubmitApplicationResult> {
  await delay(1000, 400);

  const referenceCode = generateReferenceCode();

  saveApplication(userId, { referenceCode, values, submittedAt: Date.now() });
  markApplicationSubmitted(userId);

  return { referenceCode };
}
