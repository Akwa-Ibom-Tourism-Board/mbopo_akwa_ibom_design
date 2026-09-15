import { delay } from "@/lib/mockDelay";
import {
  clearPendingRegistration,
  regeneratePendingRegistrationCode,
  verifyPendingRegistrationCode,
} from "@/lib/pendingRegistrationStore";
import { createUser, mintToken } from "@/lib/mockUsersStore";
import { sonnerToast } from "@/shared/ui";
import type {
  ResendOtpInput,
  VerifyOtpAndCreateAccountInput,
  VerifyOtpAndCreateAccountResult,
} from "../types";

export async function verifyOtpAndCreateAccount({
  pendingId,
  code,
  password,
}: VerifyOtpAndCreateAccountInput): Promise<VerifyOtpAndCreateAccountResult> {
  await delay();

  const pending = verifyPendingRegistrationCode(pendingId, code);

  const record = createUser({
    firstName: pending.ninRecord.firstName,
    lastName: pending.ninRecord.lastName,
    nin: pending.ninRecord.nin,
    vin: pending.ninRecord.vin,
    lga: pending.ninRecord.lga,
    ward: pending.ninRecord.ward,
    gender: pending.ninRecord.gender,
    dateOfBirth: pending.ninRecord.dateOfBirth,
    email: pending.email,
    password,
  });

  clearPendingRegistration();

  return {
    token: mintToken(record.id),
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
  };
}

export async function resendOtp({ pendingId }: ResendOtpInput): Promise<void> {
  await delay(500, 200);

  const record = regeneratePendingRegistrationCode(pendingId);
  if (!record) return;

  console.info(
    `[mock] New verification code for ${record.email}: ${record.code}`,
  );
  sonnerToast(`A new code was sent to ${record.email}`, {
    description: `(Mock) Your code is ${record.code}`,
    duration: 8000,
  });
}
