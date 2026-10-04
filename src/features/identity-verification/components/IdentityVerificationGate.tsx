import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { ArrowRight } from "lucide-react";
import ReCAPTCHA from "react-google-recaptcha";
import { RECAPTCHA_SITE_KEY } from "@/lib/config";
import { sonnerToast } from "@/shared/ui";
import type { User } from "@/features/auth";
import {
  Field,
  FieldLabel,
  StyledField,
  ErrorText,
  CaptchaField,
  SubmitButton,
} from "@/shared/components/AuthForm.styles";
import { lookupNin, verifyIdentity } from "../api";
import { IneligibleAfterVerificationError, type NinRecord } from "../types";
import { IneligibleNotice } from "./IneligibleNotice";
import { IdentityConfirmPanel } from "./IdentityConfirmPanel";
import {
  Wrap,
  Intro,
  Eyebrow,
  Title,
  IntroCopy,
  Card,
  FieldRow,
} from "./IdentityVerificationGate.styles";

const ninVinSchema = z.object({
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

type NinVinFormValues = z.infer<typeof ninVinSchema>;

type GateStage = "lookup" | "confirm" | "ineligible";

export interface IdentityVerificationGateProps {
  onVerified: (user: User) => void;
}

export function IdentityVerificationGate({
  onVerified,
}: IdentityVerificationGateProps) {
  const [stage, setStage] = useState<GateStage>("lookup");
  const [ninRecord, setNinRecord] = useState<NinRecord | undefined>();
  const [ineligibleReasons, setIneligibleReasons] = useState<string[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<NinVinFormValues>({ resolver: zodResolver(ninVinSchema) });

  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const recaptchaRef = useRef<ReCAPTCHA>(null);

  // The reCAPTCHA widget is a client-side anti-bot gate only — neither
  // /auth/identity-check nor /applicants/verify-identity accept or check a
  // captcha token, so it's never sent, only required to enable submit.
  const lookupMutation = useMutation({
    mutationFn: (values: NinVinFormValues) => lookupNin(values.nin, values.vin),
    onSuccess: (result) => {
      if (result.eligible) {
        setNinRecord(result.identity);
        setStage("confirm");
      } else {
        setIneligibleReasons(result.reasons);
        setStage("ineligible");
      }
    },
  });

  // A reCAPTCHA token is single-use, so a failed lookup needs a fresh one
  // before trying again.
  useEffect(() => {
    if (!lookupMutation.isError) return;
    recaptchaRef.current?.reset();
    setCaptchaToken(null);
  }, [lookupMutation.isError]);

  const verifyMutation = useMutation({
    mutationFn: verifyIdentity,
    onSuccess: (user) => {
      sonnerToast.success("Your identity has been verified.");
      onVerified(user);
    },
    onError: (error) => {
      // The backend re-checks eligibility at commit time too (never trusts
      // the earlier identity-check result) — rare, but if it no longer
      // holds, show the real reasons instead of a generic failure.
      if (error instanceof IneligibleAfterVerificationError) {
        setIneligibleReasons(error.reasons);
        setStage("ineligible");
        return;
      }
      sonnerToast.error("We couldn't verify your identity. Please try again.");
    },
  });

  const resetToLookup = () => {
    setNinRecord(undefined);
    setIneligibleReasons([]);
    setStage("lookup");
  };

  return (
    <Wrap>
      <Intro>
        <Eyebrow>Step 1 of 2</Eyebrow>
        <Title>Verify your identity</Title>
        <IntroCopy>
          Before you begin your Mbopo Akwa Ibom application, we need to verify
          your National Identification Number (NIN) and Voter Identification
          Number (VIN). This only needs to happen once.
        </IntroCopy>
      </Intro>

      <Card>
        {stage === "ineligible" && (
          <IneligibleNotice
            reasons={ineligibleReasons}
            onTryAgain={resetToLookup}
          />
        )}

        {stage === "confirm" && ninRecord && (
          <IdentityConfirmPanel
            record={ninRecord}
            isSubmitting={verifyMutation.isPending}
            onChangeNin={resetToLookup}
            onConfirm={() =>
              verifyMutation.mutate({ nin: ninRecord.nin, vin: ninRecord.vin })
            }
          />
        )}

        {stage === "lookup" && (
          <form
            onSubmit={handleSubmit((values) => {
              if (!captchaToken) return;
              lookupMutation.mutate(values);
            })}
            noValidate
          >
            <FieldRow>
              <Field>
                <FieldLabel htmlFor="gate-nin">
                  National Identification Number
                </FieldLabel>
                <StyledField
                  id="gate-nin"
                  inputMode="numeric"
                  maxLength={11}
                  placeholder="11-digit NIN"
                  invalid={Boolean(errors.nin ?? lookupMutation.error)}
                  {...register("nin")}
                />
                {errors.nin && <ErrorText>{errors.nin.message}</ErrorText>}
              </Field>
              <Field>
                <FieldLabel htmlFor="gate-vin">
                  Voter Identification Number
                </FieldLabel>
                <StyledField
                  id="gate-vin"
                  maxLength={19}
                  placeholder="19-character VIN"
                  style={{ textTransform: "uppercase" }}
                  invalid={Boolean(errors.vin ?? lookupMutation.error)}
                  {...register("vin")}
                />
                {errors.vin && <ErrorText>{errors.vin.message}</ErrorText>}
              </Field>
            </FieldRow>
            {!errors.nin && !errors.vin && lookupMutation.isError && (
              <ErrorText>{lookupMutation.error.message}</ErrorText>
            )}

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
              disabled={lookupMutation.isPending || !captchaToken}
            >
              {lookupMutation.isPending ? "Verifying…" : "Continue"}
              <ArrowRight size={18} />
            </SubmitButton>
          </form>
        )}
      </Card>
    </Wrap>
  );
}
