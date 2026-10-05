import type { ChangeEvent } from "react";
import {
  Controller,
  type Control,
  type FieldErrors,
  type UseFormRegister,
} from "react-hook-form";
import { format } from "date-fns";
import { ShieldCheck } from "lucide-react";
import { Input, Textarea, Combobox } from "@/shared/ui";
import type { VerifiedUser } from "@/features/auth";
import type { RegistrationFormValues } from "../../schema";
import { NIGERIAN_STATES, AKWA_IBOM_LGAS } from "../../constants";
import { Field } from "../Field";
import { FieldGrid, LockedValue } from "../Field.styles";
import { PhotoUpload } from "../PhotoUpload";
import {
  StepContent,
  StepTitle,
  StepHint,
  LockedFieldsNote,
  PrivacyNote,
} from "../StepShell.styles";

export interface IdentityOriginStepProps {
  user: VerifiedUser;
  register: UseFormRegister<RegistrationFormValues>;
  control: Control<RegistrationFormValues>;
  errors: FieldErrors<RegistrationFormValues>;
  certificateUrl: string;
  certificateIsPdf?: boolean;
  certificateError?: string;
  certificateUploading?: boolean;
  onCertificateChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export function IdentityOriginStep({
  user,
  register,
  control,
  errors,
  certificateUrl,
  certificateIsPdf,
  certificateError,
  certificateUploading,
  onCertificateChange,
}: IdentityOriginStepProps) {
  return (
    <StepContent>
      <StepTitle>Identity &amp; origin</StepTitle>
      <StepHint>Help us understand where you represent.</StepHint>

      <LockedFieldsNote>
        Your identity was verified from your NIN and cannot be edited here.
      </LockedFieldsNote>

      <FieldGrid>
        <Field label="Surname">
          <LockedValue>{user.lastName}</LockedValue>
        </Field>
        <Field label="First name">
          <LockedValue>{user.firstName}</LockedValue>
        </Field>
        <Field label="Gender">
          <LockedValue style={{ textTransform: "capitalize" }}>
            {user.gender}
          </LockedValue>
        </Field>
        <Field label="Date of birth">
          <LockedValue>
            {format(new Date(user.dateOfBirth), "d MMMM yyyy")}
          </LockedValue>
        </Field>
        <Field label="National Identification Number (NIN)" wide>
          <LockedValue>{user.nin}</LockedValue>
        </Field>
        <Field
          label="Local Government Area of origin"
          required
          error={errors.localGovernment?.message}
        >
          <Controller
            control={control}
            name="localGovernment"
            render={({ field }) => (
              <Combobox
                value={field.value}
                onValueChange={field.onChange}
                options={AKWA_IBOM_LGAS}
                placeholder="Select your LGA of origin"
                searchPlaceholder="Search LGAs…"
                invalid={Boolean(errors.localGovernment)}
              />
            )}
          />
        </Field>

        <Field label="Village" required error={errors.village?.message}>
          <Input
            placeholder="Your village of origin"
            maxLength={100}
            {...register("village")}
          />
        </Field>
        <Field
          label="State of residence"
          required
          error={errors.residenceState?.message}
        >
          <Controller
            control={control}
            name="residenceState"
            render={({ field }) => (
              <Combobox
                value={field.value}
                onValueChange={field.onChange}
                options={NIGERIAN_STATES}
                placeholder="Select state of residence"
                searchPlaceholder="Search states…"
                invalid={Boolean(errors.residenceState)}
              />
            )}
          />
        </Field>
        <Field
          label="Town / city of residence"
          required
          error={errors.city?.message}
        >
          <Input
            placeholder="Town or city"
            maxLength={100}
            {...register("city")}
          />
        </Field>
        <Field
          label="Home address"
          required
          error={errors.address?.message}
          wide
        >
          <Textarea
            rows={4}
            placeholder="Your residential address"
            maxLength={300}
            {...register("address")}
          />
        </Field>
      </FieldGrid>

      <PhotoUpload
        label="Certificate of Origin"
        previewUrl={certificateUrl}
        isPdf={certificateIsPdf}
        error={certificateError}
        onChange={onCertificateChange}
        accept="image/png,image/jpeg,application/pdf"
        hint="JPG, PNG or PDF · Max 5MB"
        isUploading={certificateUploading}
      />
      <PrivacyNote>
        <ShieldCheck size={14} aria-hidden />
        <span>
          Used only to confirm your indigeneship for this application — never
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
