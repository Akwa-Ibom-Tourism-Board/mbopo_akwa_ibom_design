import { delay } from "@/lib/mockDelay";
import { findUserById } from "@/lib/mockUsersStore";
import { findApplicationByUserId } from "@/lib/mockApplicationsStore";
import { findDraftByUserId } from "@/lib/mockRegistrationDraftsStore";
import type { DashboardSummary } from "../types";

export async function getDashboardSummary(
  userId: string,
): Promise<DashboardSummary> {
  await delay(500, 300);

  const record = findUserById(userId);
  if (!record) {
    throw new Error("We couldn't find your profile. Please log in again.");
  }

  return {
    user: {
      id: record.id,
      firstName: record.firstName,
      lastName: record.lastName,
      nin: record.nin,
      vin: record.vin,
      lga: record.lga,
      ward: record.ward,
      gender: record.gender,
      dateOfBirth: record.dateOfBirth,
      email: record.email,
      applicationStatus: record.applicationStatus,
    },
    memberSince: new Date(record.createdAt).toISOString(),
    referenceCode: findApplicationByUserId(userId)?.referenceCode,
    hasDraft: Boolean(findDraftByUserId(userId)),
  };
}
