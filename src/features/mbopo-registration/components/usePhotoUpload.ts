import { useCallback, useEffect, useState, type ChangeEvent } from "react";
import { toPersistableDataUrl } from "../utils/photoEncoding";

export interface UsePhotoUploadOptions {
  accept?: string;
  allowPdf?: boolean;
  invalidTypeMessage?: string;
  // A previously-saved photo (draft or submitted application) to show
  // until the user picks a new file. Arrives asynchronously — set once
  // the draft/submission fetch resolves — so it's applied via an effect
  // rather than read only at first render.
  initialDataUrl?: string;
}

export interface UsePhotoUploadResult {
  file: File | null;
  previewUrl: string;
  error: string | undefined;
  hasPhoto: boolean;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  // The value to persist (draft save or submit): re-encodes a freshly
  // picked file, or passes a hydrated one through unchanged.
  getPersistableDataUrl: () => Promise<string>;
}

// Replaces the three near-identical onPhotoChange/onFullImageChange/
// onCertificateChange handlers from the original single-file form with one
// reusable hook, shared by every PhotoUpload instance on this page.
export function usePhotoUpload({
  accept = "image/png,image/jpeg",
  allowPdf = false,
  invalidTypeMessage = "Please choose an image file.",
  initialDataUrl,
}: UsePhotoUploadOptions = {}): UsePhotoUploadResult {
  const [file, setFile] = useState<File | null>(null);
  const [objectUrl, setObjectUrl] = useState("");
  const [hydratedUrl, setHydratedUrl] = useState(initialDataUrl ?? "");
  const [error, setError] = useState<string>();

  useEffect(() => {
    if (initialDataUrl && !file) setHydratedUrl(initialDataUrl);
  }, [initialDataUrl, file]);

  const onChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const selected = event.target.files?.[0];
      if (!selected) return;

      const isImage = selected.type.startsWith("image/");
      const isAllowedPdf = allowPdf && selected.type === "application/pdf";
      if (!isImage && !isAllowedPdf) {
        setError(invalidTypeMessage);
        return;
      }

      setFile(selected);
      setObjectUrl(URL.createObjectURL(selected));
      setError(undefined);
    },
    [allowPdf, invalidTypeMessage],
  );

  const previewUrl = objectUrl || hydratedUrl;

  const getPersistableDataUrl = useCallback(async () => {
    if (file) return toPersistableDataUrl(file);
    return hydratedUrl;
  }, [file, hydratedUrl]);

  return {
    file,
    previewUrl,
    error,
    hasPhoto: Boolean(previewUrl),
    onChange,
    getPersistableDataUrl,
  };
}
