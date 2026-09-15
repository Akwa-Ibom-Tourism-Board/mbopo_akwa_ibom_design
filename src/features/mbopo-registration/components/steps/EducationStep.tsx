import type { ChangeEvent } from "react";
import {
  Controller,
  type Control,
  type FieldErrors,
  type UseFormRegister,
} from "react-hook-form";
import {
  Input,
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/shared/ui";
import type { RegistrationFormValues } from "../../schema";
import { EDUCATION_LEVELS } from "../../constants";
import { Field } from "../Field";
import { FieldGrid } from "../Field.styles";
import { PhotoUpload } from "../PhotoUpload";
import { StepContent, StepTitle, StepHint } from "../StepShell.styles";

export interface EducationStepProps {
  register: UseFormRegister<RegistrationFormValues>;
  control: Control<RegistrationFormValues>;
  errors: FieldErrors<RegistrationFormValues>;
  fullImageUrl: string;
  fullImageError?: string;
  onFullImageChange: (event: ChangeEvent<HTMLInputElement>) => void;
  academicCertificateUrl: string;
  academicCertificateError?: string;
  onAcademicCertificateChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export function EducationStep({
  register,
  control,
  errors,
  fullImageUrl,
  fullImageError,
  onFullImageChange,
  academicCertificateUrl,
  academicCertificateError,
  onAcademicCertificateChange,
}: EducationStepProps) {
  return (
    <StepContent>
      <StepTitle>Education &amp; background</StepTitle>
      <StepHint>Share the experiences that have shaped you.</StepHint>
      <FieldGrid>
        <Field
          label="Highest educational qualification"
          required
          error={errors.education?.message}
        >
          <Controller
            control={control}
            name="education"
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger invalid={Boolean(errors.education)}>
                  <SelectValue placeholder="Select qualification" />
                </SelectTrigger>
                <SelectContent>
                  {EDUCATION_LEVELS.map((level) => (
                    <SelectItem key={level} value={level}>
                      {level}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
        </Field>
        <Field label="Institution attended" error={errors.institution?.message}>
          <Input
            placeholder="School or institution"
            {...register("institution")}
          />
        </Field>
        <Field label="Occupation" required error={errors.occupation?.message}>
          <Input placeholder="What do you do?" {...register("occupation")} />
        </Field>
        <Field label="Talent(s)" required error={errors.talents?.message} wide>
          <Input
            placeholder="e.g. Public speaking, dance, entrepreneurship"
            {...register("talents")}
          />
        </Field>
        <Field
          label="Languages spoken, including native dialect"
          required
          error={errors.languages?.message}
          wide
        >
          <Input
            placeholder="e.g. Ibibio, English"
            {...register("languages")}
          />
        </Field>
      </FieldGrid>
      <PhotoUpload
        label="Upload Full Image"
        previewUrl={fullImageUrl}
        error={fullImageError}
        onChange={onFullImageChange}
      />
      <PhotoUpload
        label="Statement of Result / Academic Certificate"
        previewUrl={academicCertificateUrl}
        error={academicCertificateError}
        onChange={onAcademicCertificateChange}
        accept="image/png,image/jpeg,application/pdf"
        hint="JPG, PNG or PDF · Max 5MB"
      />
    </StepContent>
  );
}
