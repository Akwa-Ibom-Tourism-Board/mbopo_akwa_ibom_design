import { useCallback, useState, type ChangeEvent } from "react";

export interface UsePhotoUploadOptions {
  accept?: string;
  allowPdf?: boolean;
  invalidTypeMessage?: string;
}

export interface UsePhotoUploadResult {
  file: File | null;
  previewUrl: string;
  error: string | undefined;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

// Replaces the three near-identical onPhotoChange/onFullImageChange/
// onCertificateChange handlers from the original single-file form with one
// reusable hook, shared by every PhotoUpload instance on this page.
export function usePhotoUpload({
  accept = "image/png,image/jpeg",
  allowPdf = false,
  invalidTypeMessage = "Please choose an image file.",
}: UsePhotoUploadOptions = {}): UsePhotoUploadResult {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [error, setError] = useState<string>();

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
      setPreviewUrl(URL.createObjectURL(selected));
      setError(undefined);
    },
    [allowPdf, invalidTypeMessage],
  );

  return { file, previewUrl, error, onChange };
}
