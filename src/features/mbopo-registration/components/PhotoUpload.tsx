import { FileText, Loader2, Upload } from "lucide-react";
import type { ChangeEvent } from "react";
import { Field } from "./Field";
import {
  PhotoField,
  PhotoDrop,
  PhotoIcon,
  PhotoPreview,
  PdfPreview,
  UploadingOverlay,
} from "./PhotoUpload.styles";

export interface PhotoUploadProps {
  label: string;
  previewUrl: string;
  // A PDF can't be rendered through an <img> tag — when true, a simple
  // file-type badge is shown instead of attempting an image preview.
  isPdf?: boolean;
  error?: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  accept?: string;
  hint?: string;
  isUploading?: boolean;
}

export function PhotoUpload({
  label,
  previewUrl,
  isPdf = false,
  error,
  onChange,
  accept = "image/png,image/jpeg",
  hint = "JPG or PNG · Max 5MB",
  isUploading = false,
}: PhotoUploadProps) {
  const inputId = `${label.toLowerCase().replace(/\s+/g, "-")}-upload`;

  return (
    <PhotoField>
      <Field label={label} required error={error} htmlFor={inputId}>
        <PhotoDrop htmlFor={inputId} $hasPhoto={Boolean(previewUrl)}>
          {previewUrl ? (
            isPdf ? (
              <PdfPreview>
                <FileText size={28} aria-hidden />
                <span>PDF uploaded</span>
              </PdfPreview>
            ) : (
              <PhotoPreview src={previewUrl} alt={`${label} preview`} />
            )
          ) : (
            <>
              <PhotoIcon>
                <Upload size={18} />
              </PhotoIcon>
              <strong>Upload {label}</strong>
              <span>{hint}</span>
            </>
          )}
          {isUploading && (
            <UploadingOverlay>
              <Loader2 size={20} />
              Uploading…
            </UploadingOverlay>
          )}
          <input
            id={inputId}
            type="file"
            accept={accept}
            onChange={onChange}
            disabled={isUploading}
          />
        </PhotoDrop>
      </Field>
    </PhotoField>
  );
}
