import type { ReactNode } from "react";
import {
  FieldWrap,
  FieldLabel,
  Required,
  FieldErrorText,
  FieldHintText,
} from "./Field.styles";

export interface FieldProps {
  label: string;
  children: ReactNode;
  required?: boolean;
  error?: string;
  // Short neutral helper text shown below the field, only when there's no
  // error to show instead — e.g. explaining when/how a field gets checked.
  hint?: string;
  wide?: boolean;
  htmlFor?: string;
}

export function Field({
  label,
  children,
  required,
  error,
  hint,
  wide,
  htmlFor,
}: FieldProps) {
  return (
    <FieldWrap $wide={wide}>
      <FieldLabel htmlFor={htmlFor}>
        {label}
        {required && <Required> *</Required>}
      </FieldLabel>
      {children}
      {error ? (
        <FieldErrorText>{error}</FieldErrorText>
      ) : (
        hint && <FieldHintText>{hint}</FieldHintText>
      )}
    </FieldWrap>
  );
}
