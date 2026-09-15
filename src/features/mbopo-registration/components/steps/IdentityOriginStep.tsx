import type { ChangeEvent } from "react";
import {
  Controller,
  type Control,
  type FieldErrors,
  type UseFormRegister,
} from "react-hook-form";
import { format } from "date-fns";
import {
  Input,
  Textarea,
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/shared/ui";
import type { User } from "@/features/auth";
import type { RegistrationFormValues } from "../../schema";
import { NIGERIAN_STATES } from "../../constants";
import { Field } from "../Field";
import { FieldGrid, LockedValue } from "../Field.styles";
import { PhotoUpload } from "../PhotoUpload";
import {
  StepContent,
  StepTitle,
  StepHint,
  LockedFieldsNote,
} from "../StepShell.styles";

export interface IdentityOriginStepProps {
  user: User;
  register: UseFormRegister<RegistrationFormValues>;
  control: Control<RegistrationFormValues>;
  errors: FieldErrors<RegistrationFormValues>;
  certificateUrl: string;
  certificateError?: string;
  onCertificateChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export function IdentityOriginStep({
  user,
  register,
  control,
  errors,
  certificateUrl,
  certificateError,
  onCertificateChange,
}: IdentityOriginStepProps) {
  return (
    <StepContent>
      <StepTitle>Identity &amp; origin</StepTitle>
      <StepHint>Help us understand where you represent.</StepHint>

      <LockedFieldsNote>
        Your identity was verified from your NIN and VIN and can&apos;t be
        edited here.
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
        <Field label="Voter Identification Number (VIN)" wide>
          <LockedValue>{user.vin}</LockedValue>
        </Field>
        <Field label="Local Government Area of origin">
          <LockedValue>{user.lga}</LockedValue>
        </Field>
        <Field label="Ward">
          <LockedValue>{user.ward}</LockedValue>
        </Field>

        <Field label="Village" required error={errors.village?.message}>
          <Input
            placeholder="Your village of origin"
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
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger invalid={Boolean(errors.residenceState)}>
                  <SelectValue placeholder="Select your state" />
                </SelectTrigger>
                <SelectContent>
                  {NIGERIAN_STATES.map((state) => (
                    <SelectItem key={state} value={state}>
                      {state}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
        </Field>
        <Field
          label="Town / city of residence"
          required
          error={errors.city?.message}
        >
          <Input placeholder="Town or city" {...register("city")} />
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
            {...register("address")}
          />
        </Field>
      </FieldGrid>

      <PhotoUpload
        label="Certificate of Origin"
        previewUrl={certificateUrl}
        error={certificateError}
        onChange={onCertificateChange}
        accept="image/png,image/jpeg,application/pdf"
        hint="JPG, PNG or PDF · Max 5MB"
      />
    </StepContent>
  );
}
