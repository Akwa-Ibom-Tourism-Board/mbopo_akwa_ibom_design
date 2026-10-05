import {
  Controller,
  useWatch,
  type Control,
  type FieldErrors,
  type UseFormRegister,
} from "react-hook-form";
import { Input, Combobox } from "@/shared/ui";
import type { RegistrationFormValues } from "../../schema";
import { EDUCATION_LEVELS, OCCUPATIONS } from "../../constants";
import { NIGERIAN_INSTITUTIONS } from "../../data/institutions";
import { Field } from "../Field";
import { FieldGrid } from "../Field.styles";
import { StepContent, StepTitle, StepHint } from "../StepShell.styles";

const INSTITUTION_OPTIONS = [...NIGERIAN_INSTITUTIONS, "Other"];

export interface EducationStepProps {
  register: UseFormRegister<RegistrationFormValues>;
  control: Control<RegistrationFormValues>;
  errors: FieldErrors<RegistrationFormValues>;
}

export function EducationStep({
  register,
  control,
  errors,
}: EducationStepProps) {
  const occupation = useWatch({ control, name: "occupation" });
  const institution = useWatch({ control, name: "institution" });

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
              <Combobox
                value={field.value}
                onValueChange={field.onChange}
                options={EDUCATION_LEVELS}
                placeholder="Select qualification"
                searchPlaceholder="Search qualifications…"
                invalid={Boolean(errors.education)}
              />
            )}
          />
        </Field>
        <Field label="Institution attended" error={errors.institution?.message}>
          <Controller
            control={control}
            name="institution"
            render={({ field }) => (
              <Combobox
                value={field.value}
                onValueChange={field.onChange}
                options={INSTITUTION_OPTIONS}
                placeholder="Select your institution"
                searchPlaceholder="Search institutions…"
                emptyMessage="No institution found — choose Other"
                invalid={Boolean(errors.institution)}
              />
            )}
          />
        </Field>
        {institution === "Other" && (
          <Field
            label="Name your institution"
            required
            error={errors.institutionOther?.message}
          >
            <Input
              placeholder="School or institution name"
              maxLength={150}
              {...register("institutionOther")}
            />
          </Field>
        )}
        <Field label="Occupation" required error={errors.occupation?.message}>
          <Controller
            control={control}
            name="occupation"
            render={({ field }) => (
              <Combobox
                value={field.value}
                onValueChange={field.onChange}
                options={OCCUPATIONS}
                placeholder="Select your occupation"
                searchPlaceholder="Search occupations…"
                invalid={Boolean(errors.occupation)}
              />
            )}
          />
        </Field>
        {occupation === "Other" && (
          <Field
            label="Name your occupation"
            required
            error={errors.occupationOther?.message}
          >
            <Input
              placeholder="What do you do?"
              maxLength={100}
              {...register("occupationOther")}
            />
          </Field>
        )}
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
    </StepContent>
  );
}
