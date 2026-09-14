import { Upload } from "lucide-react";
import type { ChangeEvent } from "react";
import { Field } from "./Field";
import {
  PhotoField,
  PhotoDrop,
  PhotoIcon,
  PhotoPreview,
} from "./PhotoUpload.styles";

export interface PhotoUploadProps {
  label: string;
  previewUrl: string;
  error?: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  accept?: string;
  hint?: string;
}

export function PhotoUpload({
  label,
  previewUrl,
  error,
  onChange,
  accept = "image/png,image/jpeg",
  hint = "JPG or PNG · Max 5MB",
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
          <input id={inputId} type="file" accept={accept} onChange={onChange} />
        </PhotoDrop>
      </Field>
    </PhotoField>
  );
}
