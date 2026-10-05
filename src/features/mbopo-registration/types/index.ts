import type { RegistrationFormValues } from "../schema";

export type PhotoFieldKey = "certificateOfOrigin" | "fullImage" | "fullImage2";

// Display-only map of friendly field keys to their Cloudinary delivery
// URLs, used by ApplicationSummary/ReviewSubmitModal.
export type RegistrationPhotoUrls = Record<PhotoFieldKey, string>;

export type ApplicationStatus = "draft" | "submitted";

// Mirrors the backend's Application row exactly (see its
// src/applicants/application/Application.ts) — one table holds the
// free-form draft fields and the five persisted media URLs together, so a
// single GET /applicants/application fetch is "the whole application,"
// whatever stage it's at. Each draft field is nullable there (a fresh
// draft has nothing filled in yet), hence Partial here rather than the
// form's own fully-required RegistrationFormValues.
export interface Application extends Partial<RegistrationFormValues> {
  id: string;
  status: ApplicationStatus;
  referenceCode?: string | null;
  submittedAt?: string | null;
  createdAt: string;
  // Legacy-only: passport photo upload was removed from the product (the
  // NIN-verified profile photo replaces its purpose) — no new code writes
  // this, but an already-submitted pre-rework application may still have
  // one on file.
  passportPhotoUrl?: string | null;
  certificateOfOriginUrl?: string | null;
  fullImageUrl?: string | null;
  fullImageUrl2?: string | null;
  videoPitchUrl?: string | null;
}

export type SaveDraftInput = Partial<RegistrationFormValues>;

export interface SubmitApplicationResult {
  referenceCode: string;
}
