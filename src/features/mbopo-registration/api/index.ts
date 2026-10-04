import { ApiError, request } from "@/lib/http";
import type { UploadField } from "@/lib/cloudinary";
import type {
  Application,
  SaveDraftInput,
  SubmitApplicationResult,
} from "../types";

async function getOrNull(path: string): Promise<Application | null> {
  try {
    return await request<Application>(path);
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) return null;
    throw error;
  }
}

// The single source of truth for "has this applicant started/submitted" —
// 404 means no Application row exists yet (truly not started); otherwise
// its `status` tells draft from submitted. See get-mine.service.ts.
export function getMyApplication(): Promise<Application | null> {
  return getOrNull("/applicants/application");
}

export function getRegistrationDraft(): Promise<Application | null> {
  return getOrNull("/applicants/application/draft");
}

// POST /draft creates-or-updates (lockOrCreateDraft on the backend) — one
// call covers both the first save and every save after it, so there's no
// separate "create" vs "update" path to pick between here.
export function saveRegistrationDraft(
  values: SaveDraftInput,
): Promise<Application> {
  return request<Application>("/applicants/application/draft", {
    method: "POST",
    body: JSON.stringify(values),
  });
}

export interface SavePhotoInput {
  field: UploadField;
  url: string;
  publicId: string;
  bytes?: number;
}

// Persists one already-uploaded Cloudinary asset onto the application —
// each photo/video field is saved the moment it's picked, independently of
// the draft's text fields (see usePhotoUpload/useVideoRecorder), not
// batched with the rest of the form.
export function savePhoto(
  input: SavePhotoInput,
): Promise<{ field: string; url: string }> {
  return request("/applicants/application/photo", {
    method: "POST",
    body: JSON.stringify(input),
  });
}

// Every photo/video URL must already be on the row (from its own earlier
// savePhoto call) before this succeeds — submit.service.ts validates the
// full merged record, it doesn't accept media URLs in this payload.
export async function submitApplication(
  values: SaveDraftInput,
): Promise<SubmitApplicationResult> {
  const application = await request<Application>(
    "/applicants/application/submit",
    { method: "POST", body: JSON.stringify(values) },
  );
  return { referenceCode: application.referenceCode as string };
}
