import {
  Controller,
  useWatch,
  type Control,
  type FieldErrors,
  type UseFormRegister,
} from "react-hook-form";
import { Checkbox, Textarea } from "@/shared/ui";
import type { RegistrationFormValues } from "../../schema";
import { MAXIMUM_STORY_WORDS, MINIMUM_STORY_WORDS } from "../../constants";
import { Field } from "../Field";
import { StepContent, StepTitle, StepHint } from "../StepShell.styles";
import { WordCount, Declarations, DeclarationRow } from "./StoryStep.styles";

export interface StoryStepProps {
  register: UseFormRegister<RegistrationFormValues>;
  control: Control<RegistrationFormValues>;
  errors: FieldErrors<RegistrationFormValues>;
}

export function StoryStep({ register, control, errors }: StoryStepProps) {
  const why = useWatch({ control, name: "why" }) ?? "";
  const wordCount = why.trim()
    ? why.trim().split(/\s+/).filter(Boolean).length
    : 0;

  return (
    <StepContent>
      <StepTitle>Your story &amp; declarations</StepTitle>
      <StepHint>Purpose is personal. Tell us what yours looks like.</StepHint>

      <Field
        label="Describe any community initiative, business or skill you have undertaken"
        error={errors.initiative?.message}
      >
        <Textarea
          rows={5}
          placeholder="Share something you are proud to have started or contributed to..."
          {...register("initiative")}
        />
      </Field>

      <Field
        label="Why do you want to be Mbobpo Akwa Ibom?"
        required
        error={errors.why?.message}
      >
        <Textarea
          rows={7}
          placeholder="Write a short essay about your purpose, your community and what you hope to represent..."
          {...register("why")}
        />
        <WordCount $over={wordCount > MAXIMUM_STORY_WORDS}>
          {wordCount} words · aim for {MINIMUM_STORY_WORDS}–
          {MAXIMUM_STORY_WORDS}
        </WordCount>
      </Field>

      <Declarations>
        <Controller
          control={control}
          name="declarationIdentity"
          render={({ field }) => (
            <DeclarationRow $invalid={Boolean(errors.declarationIdentity)}>
              <Checkbox
                checked={field.value}
                onCheckedChange={field.onChange}
              />
              <span>
                I confirm I am a female Nigerian citizen indigenous to or
                resident in Akwa Ibom State.
              </span>
            </DeclarationRow>
          )}
        />
        <Controller
          control={control}
          name="declarationAccuracy"
          render={({ field }) => (
            <DeclarationRow $invalid={Boolean(errors.declarationAccuracy)}>
              <Checkbox
                checked={field.value}
                onCheckedChange={field.onChange}
              />
              <span>
                I confirm all information provided is accurate and I am
                available for the full 365-day ambassador role if selected.
              </span>
            </DeclarationRow>
          )}
        />
        <Controller
          control={control}
          name="declarationTerms"
          render={({ field }) => (
            <DeclarationRow $invalid={Boolean(errors.declarationTerms)}>
              <Checkbox
                checked={field.value}
                onCheckedChange={field.onChange}
              />
              <span>
                I agree to the{" "}
                <a href="/terms" target="_blank" rel="noopener noreferrer">
                  Terms &amp; Conditions
                </a>{" "}
                and{" "}
                <a href="/privacy" target="_blank" rel="noopener noreferrer">
                  Privacy Policy
                </a>
                .
              </span>
            </DeclarationRow>
          )}
        />
      </Declarations>
    </StepContent>
  );
}
