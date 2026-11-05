import {
  Controller,
  type Control,
  type FieldErrors,
  type UseFormRegister,
} from "react-hook-form";
import { Input, Combobox } from "@/shared/ui";
import type { VerifiedUser } from "@/features/auth";
import { digitsOnlyOnChange } from "@/lib/validation";
import type { RegistrationFormValues } from "../../schema";
import { MARITAL_STATUSES } from "../../constants";
import { Field } from "../Field";
import { FieldGrid, LockedValue } from "../Field.styles";
import { StepContent, StepTitle, StepHint } from "../StepShell.styles";

export interface PersonalStepProps {
  user: VerifiedUser;
  register: UseFormRegister<RegistrationFormValues>;
  control: Control<RegistrationFormValues>;
  errors: FieldErrors<RegistrationFormValues>;
}

export function PersonalStep({
  user,
  register,
  control,
  errors,
}: PersonalStepProps) {
  const phoneField = register("phone");
  const nextOfKinPhoneField = register("nextOfKinPhone");

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
            placeholder="08012345678"
            autoComplete="tel"
            maxLength={13}
            {...phoneField}
            onChange={digitsOnlyOnChange(phoneField.onChange)}
          />
        </Field>
        <Field label="Email address">
          <LockedValue>{user.email}</LockedValue>
        </Field>
        <Field
          label="Marital status"
          required
          error={errors.maritalStatus?.message}
        >
          <Controller
            control={control}
            name="maritalStatus"
            render={({ field }) => (
              <Combobox
                value={field.value}
                onValueChange={field.onChange}
                options={MARITAL_STATUSES}
                placeholder="Select marital status"
                searchPlaceholder="Search…"
                invalid={Boolean(errors.maritalStatus)}
              />
            )}
          />
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
            placeholder="08012345678"
            maxLength={13}
            {...nextOfKinPhoneField}
            onChange={digitsOnlyOnChange(nextOfKinPhoneField.onChange)}
          />
        </Field>
        <Field
          label="Relationship with next of kin"
          required
          error={errors.nextOfKinRelationship?.message}
        >
          <Input
            placeholder="e.g. Mother, Father, Sibling, Guardian"
            maxLength={50}
            {...register("nextOfKinRelationship")}
          />
        </Field>
      </FieldGrid>
    </StepContent>
  );
}
