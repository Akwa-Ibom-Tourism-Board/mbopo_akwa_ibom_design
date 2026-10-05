import type { UseFormRegisterReturn } from "react-hook-form";
import { Label, PasswordInput } from "@/shared/ui";
import {
  PasswordFields,
  Field,
  ErrorText,
  HintText,
} from "./CreatePasswordForm.styles";

// Takes already-bound `register(...)` results rather than the `register`
// function itself, so this doesn't need to be generic over the host form's
// full field-values shape — it only ever touches these two fields.
export interface CreatePasswordFormProps {
  passwordField: UseFormRegisterReturn;
  confirmPasswordField: UseFormRegisterReturn;
  passwordError?: string;
  confirmPasswordError?: string;
}

export function CreatePasswordForm({
  passwordField,
  confirmPasswordField,
  passwordError,
  confirmPasswordError,
}: CreatePasswordFormProps) {
  return (
    <PasswordFields>
      <Field>
        <Label htmlFor="password">Create a password</Label>
        <PasswordInput
          id="password"
          autoComplete="new-password"
          maxLength={128}
          invalid={Boolean(passwordError)}
          {...passwordField}
        />
        <HintText>At least 8 characters.</HintText>
        {passwordError && <ErrorText>{passwordError}</ErrorText>}
      </Field>
      <Field>
        <Label htmlFor="confirmPassword">Confirm password</Label>
        <PasswordInput
          id="confirmPassword"
          autoComplete="new-password"
          maxLength={128}
          invalid={Boolean(confirmPasswordError)}
          {...confirmPasswordField}
        />
        {confirmPasswordError && <ErrorText>{confirmPasswordError}</ErrorText>}
      </Field>
    </PasswordFields>
  );
}
