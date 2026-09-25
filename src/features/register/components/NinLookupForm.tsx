import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ArrowRight } from "lucide-react";
import ReCAPTCHA from "react-google-recaptcha";
import { RECAPTCHA_SITE_KEY } from "@/lib/config";
import {
  Heading,
  Subtitle,
  FormBlock,
  Field,
  FieldLabel,
  StyledField,
  ErrorText,
  CaptchaField,
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
  onSubmit: (values: NinLookupFormValues, captchaToken: string) => void;
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

  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const recaptchaRef = useRef<ReCAPTCHA>(null);

  // A reCAPTCHA token is single-use, so a failed lookup (NIN/VIN not
  // found, wrong captcha, etc.) needs a fresh one before trying again.
  useEffect(() => {
    if (!submitError) return;
    recaptchaRef.current?.reset();
    setCaptchaToken(null);
  }, [submitError]);

  return (
    <>
      <Heading>Verify Your Identity</Heading>
      <Subtitle>
        Enter your National Identification Number (NIN) and Voter Identification
        Number (VIN) to start your application.
      </Subtitle>

      <FormBlock
        onSubmit={handleSubmit((values) => {
          if (!captchaToken) return;
          onSubmit(values, captchaToken);
        })}
        noValidate
      >
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

        <CaptchaField>
          <ReCAPTCHA
            ref={recaptchaRef}
            sitekey={RECAPTCHA_SITE_KEY}
            onChange={setCaptchaToken}
            onExpired={() => setCaptchaToken(null)}
          />
        </CaptchaField>

        <SubmitButton
          type="submit"
          size="lg"
          variant="secondary"
          disabled={isSubmitting || !captchaToken}
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
