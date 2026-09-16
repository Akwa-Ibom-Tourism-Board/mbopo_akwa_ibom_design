import type { User } from "@/features/auth";
import type { RegistrationFormValues } from "../schema";

export type PhotoFieldKey =
  "passportPhoto" | "certificateOfOrigin" | "fullImage";

// Photos are persisted (drafts and submissions alike) as data URLs — the
// mock backend is just localStorage, so there's nowhere else to put a
// File. See usePhotoUpload's toPersistableDataUrl for how these are
// produced (downscaled for images; passed through as-is for PDFs).
export type RegistrationPhotoDataUrls = Record<PhotoFieldKey, string>;

export interface SubmitApplicationInput {
  userId: User["id"];
  values: RegistrationFormValues;
  photos: RegistrationPhotoDataUrls;
}

export interface SubmitApplicationResult {
  referenceCode: string;
}

export interface SubmittedApplication {
  referenceCode: string;
  values: RegistrationFormValues;
  photos: RegistrationPhotoDataUrls;
  submittedAt: number;
}

export interface SaveDraftInput {
  userId: User["id"];
  values: Partial<RegistrationFormValues>;
  currentStepIndex: number;
  photos: Partial<RegistrationPhotoDataUrls>;
}

export interface RegistrationDraft {
  values: Partial<RegistrationFormValues>;
  currentStepIndex: number;
  photos: Partial<RegistrationPhotoDataUrls>;
  updatedAt: number;
}
