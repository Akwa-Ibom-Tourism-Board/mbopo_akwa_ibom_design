import { request } from "./http";

// Direct browser-to-Cloudinary upload, signed by the backend per request
// (POST /uploads/cloudinary-signature). The backend decides the resource
// type, the deterministic public_id, and every transformation/format
// restriction, then signs all of it — the file's bytes still never pass
// through our own server, but nothing about the upload is trusted from the
// client beyond "here are the bytes for this field." See the backend's
// src/configurations/cloudinary.ts for the other half of this contract.
export type UploadField =
  | "passportPhoto"
  | "certificateOfOrigin"
  | "fullImage"
  | "fullImage2"
  | "videoPitch"
  | "avatar";

interface SignedUpload {
  cloudName: string;
  apiKey: string;
  timestamp: number;
  signature: string;
  publicId: string;
  overwrite: true;
  resourceType: "image" | "video";
  uploadParams: Record<string, string | number | boolean>;
}

export interface CloudinaryUploadResult {
  url: string;
  publicId: string;
  bytes: number;
}

export interface UploadToCloudinaryOptions {
  onProgress?: (percent: number) => void;
  signal?: AbortSignal;
}

export class CloudinaryUploadError extends Error {
  constructor(message = "We couldn't upload that file. Please try again.") {
    super(message);
    this.name = "CloudinaryUploadError";
  }
}

function postToCloudinary(
  signed: SignedUpload,
  file: File | Blob,
  options: UploadToCloudinaryOptions,
): Promise<CloudinaryUploadResult> {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("api_key", signed.apiKey);
  formData.append("timestamp", String(signed.timestamp));
  formData.append("signature", signed.signature);
  // Every one of these was included in what the backend signed — sending
  // anything different (or omitting one) makes Cloudinary reject the
  // request as a signature mismatch.
  for (const [key, value] of Object.entries(signed.uploadParams)) {
    formData.append(key, String(value));
  }

  const endpoint = `https://api.cloudinary.com/v1_1/${signed.cloudName}/${signed.resourceType}/upload`;

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
      let body: {
        secure_url?: string;
        public_id?: string;
        bytes?: number;
        error?: { message?: string };
      };
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
        url: body.secure_url!,
        publicId: body.public_id!,
        bytes: body.bytes ?? 0,
      });
    };

    xhr.onerror = () =>
      reject(new CloudinaryUploadError("Network error during upload."));
    xhr.onabort = () => reject(new CloudinaryUploadError("Upload cancelled."));

    xhr.send(formData);
  });
}

export async function uploadToCloudinary(
  field: UploadField,
  file: File | Blob,
  options: UploadToCloudinaryOptions = {},
): Promise<CloudinaryUploadResult> {
  const signed = await request<SignedUpload>("/uploads/cloudinary-signature", {
    method: "POST",
    body: JSON.stringify({ field }),
  });

  return postToCloudinary(signed, file, options);
}
