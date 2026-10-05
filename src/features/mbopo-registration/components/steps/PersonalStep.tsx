import type { ChangeEvent } from "react";
import type { FieldErrors, UseFormRegister } from "react-hook-form";
import { ShieldCheck } from "lucide-react";
import { Input } from "@/shared/ui";
import type { VerifiedUser } from "@/features/auth";
import type { RegistrationFormValues } from "../../schema";
import { Field } from "../Field";
import { FieldGrid, LockedValue } from "../Field.styles";
import { PhotoUpload } from "../PhotoUpload";
import {
  StepContent,
  StepTitle,
  StepHint,
  PrivacyNote,
} from "../StepShell.styles";

export interface PersonalStepProps {
  user: VerifiedUser;
  register: UseFormRegister<RegistrationFormValues>;
  errors: FieldErrors<RegistrationFormValues>;
  passportPhotoUrl: string;
  passportPhotoError?: string;
  passportPhotoUploading?: boolean;
  onPassportPhotoChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export function PersonalStep({
  user,
  register,
  errors,
  passportPhotoUrl,
  passportPhotoError,
  passportPhotoUploading,
  onPassportPhotoChange,
}: PersonalStepProps) {
  return (
    <StepContent>
      <StepTitle>Personal information</StepTitle>
      <StepHint>Let us begin with the essentials.</StepHint>
      <FieldGrid>
        <Field label="Surname">
          <LockedValue>{user.lastName}</LockedValue>
        </Field>
        <Field label="First name">
          <LockedValue>{user.firstName}</LockedValue>
        </Field>
        <Field label="Middle name" error={errors.middleName?.message}>
          <Input
            placeholder="Optional"
            maxLength={100}
            {...register("middleName")}
          />
        </Field>
        <Field label="Phone number" required error={errors.phone?.message}>
          <Input
            type="tel"
            inputMode="numeric"
            placeholder="080 0000 0000"
            autoComplete="tel"
            maxLength={13}
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
            maxLength={300}
            {...register("socialMedia")}
          />
        </Field>
        <Field
          label="Next of kin full name"
          required
          error={errors.nextOfKin?.message}
        >
          <Input
            placeholder="Full name"
            maxLength={100}
            {...register("nextOfKin")}
          />
        </Field>
        <Field
          label="Next of kin phone"
          required
          error={errors.nextOfKinPhone?.message}
        >
          <Input
            type="tel"
            inputMode="numeric"
            placeholder="080 0000 0000"
            maxLength={13}
            {...register("nextOfKinPhone")}
          />
        </Field>
      </FieldGrid>
      <PhotoUpload
        label="Passport photograph"
        hint="JPG or PNG · Max 5MB · Recent photo, white background"
        previewUrl={passportPhotoUrl}
        error={passportPhotoError}
        onChange={onPassportPhotoChange}
        isUploading={passportPhotoUploading}
      />
      <PrivacyNote>
        <ShieldCheck size={14} aria-hidden />
        <span>
          Used only to verify your identity and present your application — never
          sold, rented, or shared beyond the Mbopo Akwa Ibom programme. See our{" "}
          <a href="/privacy" target="_blank" rel="noopener noreferrer">
            Privacy Policy
          </a>
          .
        </span>
      </PrivacyNote>
    </StepContent>
  );
}
