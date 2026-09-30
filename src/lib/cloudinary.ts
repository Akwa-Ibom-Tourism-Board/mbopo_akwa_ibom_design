/* eslint-disable @typescript-eslint/no-explicit-any */
import { CLOUDINARY_CLOUD_NAME, CLOUDINARY_UPLOAD_PRESET } from "./config";

// Direct browser-to-Cloudinary upload — the file goes straight from the
// applicant's device to Cloudinary, never through our own server, so
// registration-form uploads (passport photo, certificate, the two full
// images, the video pitch) don't cost our backend any bandwidth or disk.
//
// Unsigned-preset uploads, deliberately: this works standalone, with no
// backend endpoint required, using only the public cloud name + preset
// name from .env.example. Nothing here needs the account's API secret,
// which must never reach frontend code.
//
// No feature wires this in yet — usePhotoUpload/useVideoRecorder still
// hold picked files as local blob URLs, persisted as data URLs the way
// the rest of the mock layer does. Swapping a given upload over to
// Cloudinary means calling uploadToCloudinary() where that file is picked
// and storing the returned `url` instead of re-encoding it locally; the
// backend then just needs to accept & store that URL instead of receiving
// the file itself.
//
// Signed uploads (recommended once the backend exists — an unsigned
// preset can be hit by anyone who finds its name, not just this app) only
// change how the request is authorized: have the backend compute a
// signature and timestamp and pass them in here instead of
// upload_preset. Everything else below stays the same.

export interface CloudinaryUploadResult {
  url: string;
  publicId: string;
  resourceType: string;
  format: string;
  bytes: number;
}

export interface UploadToCloudinaryOptions {
  // Cloudinary can auto-detect image vs. video from the file itself
  // ("auto", the default) — set this explicitly only if you need to force
  // one or the other.
  resourceType?: "auto" | "image" | "video";
  // Overrides the upload preset's own folder, if it has one.
  folder?: string;
  onProgress?: (percent: number) => void;
  signal?: AbortSignal;
}

export class CloudinaryConfigError extends Error {
  constructor() {
    super(
      "Cloudinary isn't configured — set VITE_CLOUDINARY_CLOUD_NAME and VITE_CLOUDINARY_UPLOAD_PRESET (see .env.example).",
    );
    this.name = "CloudinaryConfigError";
  }
}

export class CloudinaryUploadError extends Error {
  constructor(message = "We couldn't upload that file. Please try again.") {
    super(message);
    this.name = "CloudinaryUploadError";
  }
}

export function uploadToCloudinary(
  file: File | Blob,
  options: UploadToCloudinaryOptions = {},
): Promise<CloudinaryUploadResult> {
  if (!CLOUDINARY_CLOUD_NAME || !CLOUDINARY_UPLOAD_PRESET) {
    return Promise.reject(new CloudinaryConfigError());
  }

  const resourceType = options.resourceType ?? "auto";
  const endpoint = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/${resourceType}/upload`;

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
  if (options.folder) formData.append("folder", options.folder);

  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", endpoint);

    if (options.onProgress) {
      xhr.upload.onprogress = (event) => {
        if (event.lengthComputable) {
          options.onProgress!(Math.round((event.loaded / event.total) * 100));
        }
      };
    }

    options.signal?.addEventListener("abort", () => xhr.abort());

    xhr.onload = () => {
      let body: any;
      try {
        body = JSON.parse(xhr.responseText);
      } catch {
        reject(
          new CloudinaryUploadError(
            "Cloudinary returned an unexpected response.",
          ),
        );
        return;
      }

      if (xhr.status < 200 || xhr.status >= 300) {
        reject(new CloudinaryUploadError(body?.error?.message));
        return;
      }

      resolve({
        url: body.secure_url,
        publicId: body.public_id,
        resourceType: body.resource_type,
        format: body.format,
        bytes: body.bytes,
      });
    };

    xhr.onerror = () =>
      reject(new CloudinaryUploadError("Network error during upload."));
    xhr.onabort = () => reject(new CloudinaryUploadError("Upload cancelled."));

    xhr.send(formData);
  });
}
