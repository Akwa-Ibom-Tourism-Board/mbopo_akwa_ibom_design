import { Loader2, Upload } from "lucide-react";
import type { ChangeEvent } from "react";
import { Field } from "./Field";
import {
  PhotoField,
  PhotoDrop,
  PhotoIcon,
  PhotoPreview,
  UploadingOverlay,
} from "./PhotoUpload.styles";

export interface PhotoUploadProps {
  label: string;
  previewUrl: string;
  error?: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  accept?: string;
  hint?: string;
  isUploading?: boolean;
}

export function PhotoUpload({
  label,
  previewUrl,
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
            <PhotoPreview src={previewUrl} alt={`${label} preview`} />
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
