import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ArrowRight } from "lucide-react";
import {
  Heading,
  Subtitle,
  FormBlock,
  Field,
  FieldLabel,
  StyledField,
  ErrorText,
  SubmitButton,
  FormFooter,
  InlineLink,
} from "@/shared/components/AuthForm.styles";

const ninLookupSchema = z.object({
  nin: z
    .string()
    .trim()
    .length(11, "Your NIN must be exactly 11 digits")
    .regex(/^\d+$/, "Your NIN can only contain digits"),
  vin: z
    .string()
    .trim()
    .toUpperCase()
    .length(19, "Your VIN must be exactly 19 characters")
    .regex(/^[A-Z0-9]+$/, "Your VIN can only contain letters and digits"),
});

export type NinLookupFormValues = z.infer<typeof ninLookupSchema>;

export interface NinLookupFormProps {
  onSubmit: (values: NinLookupFormValues) => void;
  isSubmitting: boolean;
  submitError?: string;
}

export function NinLookupForm({
  onSubmit,
  isSubmitting,
  submitError,
}: NinLookupFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<NinLookupFormValues>({ resolver: zodResolver(ninLookupSchema) });

  return (
    <>
      <Heading>Verify Your Identity</Heading>
      <Subtitle>
        Enter your National Identification Number (NIN) and Voter Identification
        Number (VIN) to start your application.
      </Subtitle>

      <FormBlock onSubmit={handleSubmit(onSubmit)} noValidate>
        <Field>
          <FieldLabel htmlFor="nin">National Identification Number</FieldLabel>
          <StyledField
            id="nin"
            inputMode="numeric"
            maxLength={11}
            placeholder="11-digit NIN"
            invalid={Boolean(errors.nin ?? submitError)}
            {...register("nin")}
          />
          {errors.nin && <ErrorText>{errors.nin.message}</ErrorText>}
        </Field>
        <Field>
          <FieldLabel htmlFor="vin">Voter Identification Number</FieldLabel>
          <StyledField
            id="vin"
            maxLength={19}
            placeholder="19-character VIN"
            style={{ textTransform: "uppercase" }}
            invalid={Boolean(errors.vin ?? submitError)}
            {...register("vin")}
          />
          {errors.vin && <ErrorText>{errors.vin.message}</ErrorText>}
          {!errors.nin && !errors.vin && submitError && (
            <ErrorText>{submitError}</ErrorText>
          )}
        </Field>

        <SubmitButton
          type="submit"
          size="lg"
          variant="secondary"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Verifying…" : "Continue"}
          <ArrowRight size={18} />
        </SubmitButton>
      </FormBlock>

      <FormFooter>
        Already registered? <InlineLink to="/login">Log in</InlineLink>
      </FormFooter>
    </>
  );
}
