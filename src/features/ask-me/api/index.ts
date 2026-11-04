import { request } from "@/lib/http";
import {
  postToCloudinary,
  type SignedUpload,
  type CloudinaryUploadResult,
  type UploadToCloudinaryOptions,
} from "@/lib/cloudinary";
import type { AskMeAttachment, AskMeInput } from "../types";

export const MAX_ATTACHMENTS = 3;
export const MAX_ATTACHMENT_BYTES = 5 * 1024 * 1024;

// Public (no auth), so http.ts's token attachment is simply a no-op here
// for an anonymous visitor and harmless for a logged-in one.
export async function submitMessage(input: AskMeInput): Promise<void> {
  await request<void>("/messages", {
    method: "POST",
    body: JSON.stringify(input),
  });
}

// Signed per-file against /messages/attachment-signature (a separate,
// public signing endpoint — the applicant-only one in lib/cloudinary.ts
// doesn't apply to an anonymous widget submission), then uploaded with
// that same module's generic Cloudinary upload mechanics.
export async function uploadAskMeAttachment(
  submissionId: string,
  slot: number,
  file: File,
  options: UploadToCloudinaryOptions = {},
): Promise<AskMeAttachment> {
  const signed = await request<SignedUpload>("/messages/attachment-signature", {
    method: "POST",
    body: JSON.stringify({ submissionId, slot }),
  });

  const result: CloudinaryUploadResult = await postToCloudinary(
    signed,
    file,
    options,
  );
  return { url: result.url, filename: file.name, bytes: result.bytes };
}
