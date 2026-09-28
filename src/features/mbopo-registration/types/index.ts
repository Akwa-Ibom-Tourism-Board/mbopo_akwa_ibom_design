import type { User } from "@/features/auth";
import type { RegistrationFormValues } from "../schema";

export type PhotoFieldKey =
  "passportPhoto" | "certificateOfOrigin" | "fullImage" | "fullImage2";

// Photos are persisted (drafts and submissions alike) as data URLs — the
// mock backend is just localStorage, so there's nowhere else to put a
// File. See usePhotoUpload's toPersistableDataUrl for how these are
// produced (downscaled for images; passed through as-is for PDFs).
export type RegistrationPhotoDataUrls = Record<PhotoFieldKey, string>;

export interface SubmitApplicationInput {
  userId: User["id"];
  values: RegistrationFormValues;
  photos: RegistrationPhotoDataUrls;
  // Locked in at the video step itself (see useVideoRecorder's
  // submitVideo), not at final submit — by this point it's already been
  // persisted and can no longer change. See mockVideoStore.ts.
  videoPitchUrl: string;
}

export interface SubmitApplicationResult {
  referenceCode: string;
}

export interface SubmittedApplication {
  referenceCode: string;
  values: RegistrationFormValues;
  photos: RegistrationPhotoDataUrls;
  videoPitchUrl?: string;
  submittedAt: number;
}

export interface SaveDraftInput {
  userId: User["id"];
  values: Partial<RegistrationFormValues>;
  currentStepIndex: number;
  photos: Partial<RegistrationPhotoDataUrls>;
  // Present only once the applicant has explicitly submitted their
  // recording (see useVideoRecorder's "locked" status) — everything else
  // in a draft stays freely editable, but a locked video never does.
  videoPitchUrl?: string;
}

export interface RegistrationDraft {
  values: Partial<RegistrationFormValues>;
  currentStepIndex: number;
  photos: Partial<RegistrationPhotoDataUrls>;
  videoPitchUrl?: string;
  updatedAt: number;
}
