import type { ChangeEvent } from "react";
import type { FieldErrors, UseFormRegister } from "react-hook-form";
import { Input } from "@/shared/ui";
import type { User } from "@/features/auth";
import type { RegistrationFormValues } from "../../schema";
import { Field } from "../Field";
import { FieldGrid, LockedValue } from "../Field.styles";
import { PhotoUpload } from "../PhotoUpload";
import { StepContent, StepTitle, StepHint } from "../StepShell.styles";

export interface PersonalStepProps {
  user: User;
  register: UseFormRegister<RegistrationFormValues>;
  errors: FieldErrors<RegistrationFormValues>;
  passportPhotoUrl: string;
  passportPhotoError?: string;
  onPassportPhotoChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export function PersonalStep({
  user,
  register,
  errors,
  passportPhotoUrl,
  passportPhotoError,
  onPassportPhotoChange,
}: PersonalStepProps) {
  return (
    <StepContent>
      <StepTitle>Personal information</StepTitle>
      <StepHint>Let&apos;s begin with the essentials.</StepHint>
      <FieldGrid>
        <Field label="Surname">
          <LockedValue>{user.lastName}</LockedValue>
        </Field>
        <Field label="First name">
          <LockedValue>{user.firstName}</LockedValue>
        </Field>
        <Field label="Middle name" error={errors.middleName?.message}>
          <Input placeholder="Optional" {...register("middleName")} />
        </Field>
        <Field label="Phone number" required error={errors.phone?.message}>
          <Input
            type="tel"
            placeholder="080 0000 0000"
            autoComplete="tel"
            {...register("phone")}
          />
        </Field>
        <Field label="Email address">
          <LockedValue>{user.email}</LockedValue>
        </Field>
        <Field
          label="Social Media Handles"
          error={errors.socialMedia?.message}
          wide
        >
          <Input
            placeholder="e.g. Instagram: @handle, Twitter: @handle, Facebook: handle"
            {...register("socialMedia")}
          />
        </Field>
        <Field
          label="Next of kin full name"
          required
          error={errors.nextOfKin?.message}
        >
          <Input placeholder="Full name" {...register("nextOfKin")} />
        </Field>
        <Field
          label="Next of kin phone"
          required
          error={errors.nextOfKinPhone?.message}
        >
          <Input
            type="tel"
            placeholder="080 0000 0000"
            {...register("nextOfKinPhone")}
          />
        </Field>
      </FieldGrid>
      <PhotoUpload
        label="Passport photograph"
        previewUrl={passportPhotoUrl}
        error={passportPhotoError}
        onChange={onPassportPhotoChange}
      />
    </StepContent>
  );
}
