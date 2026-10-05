import type { ChangeEvent } from "react";
import {
  Controller,
  type Control,
  type FieldErrors,
  type UseFormRegister,
} from "react-hook-form";
import { ShieldCheck } from "lucide-react";
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
import {
  StepContent,
  StepTitle,
  StepHint,
  PrivacyNote,
} from "../StepShell.styles";

export interface EducationStepProps {
  register: UseFormRegister<RegistrationFormValues>;
  control: Control<RegistrationFormValues>;
  errors: FieldErrors<RegistrationFormValues>;
  fullImageUrl: string;
  fullImageError?: string;
  fullImageUploading?: boolean;
  onFullImageChange: (event: ChangeEvent<HTMLInputElement>) => void;
  fullImage2Url: string;
  fullImage2Error?: string;
  fullImage2Uploading?: boolean;
  onFullImage2Change: (event: ChangeEvent<HTMLInputElement>) => void;
}

export function EducationStep({
  register,
  control,
  errors,
  fullImageUrl,
  fullImageError,
  fullImageUploading,
  onFullImageChange,
  fullImage2Url,
  fullImage2Error,
  fullImage2Uploading,
  onFullImage2Change,
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
            maxLength={150}
            {...register("institution")}
          />
        </Field>
        <Field label="Occupation" required error={errors.occupation?.message}>
          <Input
            placeholder="What do you do?"
            maxLength={100}
            {...register("occupation")}
          />
        </Field>
        <Field label="Talent(s)" required error={errors.talents?.message} wide>
          <Input
            placeholder="e.g. Public speaking, dance, entrepreneurship"
            maxLength={300}
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
            maxLength={300}
            {...register("languages")}
          />
        </Field>
      </FieldGrid>
      <PhotoUpload
        label="Full Image 1"
        hint="A clear, full-length photo facing the camera"
        previewUrl={fullImageUrl}
        error={fullImageError}
        onChange={onFullImageChange}
        isUploading={fullImageUploading}
      />
      <PhotoUpload
        label="Full Image 2"
        hint="A second full-length photo from a different angle or pose"
        previewUrl={fullImage2Url}
        error={fullImage2Error}
        onChange={onFullImage2Change}
        isUploading={fullImage2Uploading}
      />
      <PrivacyNote>
        <ShieldCheck size={14} aria-hidden />
        <span>
          Used only for judging and presenting your application — never sold,
          rented, or shared beyond the Mbopo Akwa Ibom programme. See our{" "}
          <a href="/privacy" target="_blank" rel="noopener noreferrer">
            Privacy Policy
          </a>
          .
        </span>
      </PrivacyNote>
    </StepContent>
  );
}
