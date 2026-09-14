import type { FieldErrors, UseFormRegister } from "react-hook-form";
import { Input, Label } from "@/shared/ui";
import {
  PasswordFields,
  Field,
  ErrorText,
  HintText,
} from "./CreatePasswordForm.styles";

export interface CreatePasswordFormValues {
  password: string;
  confirmPassword: string;
}

export interface CreatePasswordFormProps {
  register: UseFormRegister<CreatePasswordFormValues>;
  errors: FieldErrors<CreatePasswordFormValues>;
}

export function CreatePasswordForm({
  register,
  errors,
}: CreatePasswordFormProps) {
  return (
    <PasswordFields>
      <Field>
        <Label htmlFor="password">Create a password</Label>
        <Input
          id="password"
          type="password"
          autoComplete="new-password"
          invalid={Boolean(errors.password)}
          {...register("password")}
        />
        <HintText>At least 8 characters.</HintText>
        {errors.password && <ErrorText>{errors.password.message}</ErrorText>}
      </Field>
      <Field>
        <Label htmlFor="confirmPassword">Confirm password</Label>
        <Input
          id="confirmPassword"
          type="password"
          autoComplete="new-password"
          invalid={Boolean(errors.confirmPassword)}
          {...register("confirmPassword")}
        />
        {errors.confirmPassword && (
          <ErrorText>{errors.confirmPassword.message}</ErrorText>
        )}
      </Field>
    </PasswordFields>
  );
}
