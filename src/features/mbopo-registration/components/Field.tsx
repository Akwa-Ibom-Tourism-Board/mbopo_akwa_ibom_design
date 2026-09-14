import type { ReactNode } from "react";
import {
  FieldWrap,
  FieldLabel,
  Required,
  FieldErrorText,
} from "./Field.styles";

export interface FieldProps {
  label: string;
  children: ReactNode;
  required?: boolean;
  error?: string;
  wide?: boolean;
  htmlFor?: string;
}

export function Field({
  label,
  children,
  required,
  error,
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
      {error && <FieldErrorText>{error}</FieldErrorText>}
    </FieldWrap>
  );
}
