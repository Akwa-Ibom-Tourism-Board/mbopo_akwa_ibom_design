import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { ArrowRight } from "lucide-react";
import { sonnerToast } from "@/shared/ui";
import { friendlyMessage } from "@/lib/http";
import { NAME_REGEX, NAME_MESSAGE } from "@/lib/validation";
import type { User } from "@/features/auth";
import {
  Field,
  FieldLabel,
  RequiredMark,
  StyledField,
  ErrorText,
  SubmitButton,
} from "@/shared/components/AuthForm.styles";
import { verifyIdentity } from "../api";
import { IneligibleAfterVerificationError } from "../types";
import { IneligibleNotice } from "./IneligibleNotice";
import { SelfieCaptureModal } from "./SelfieCaptureModal";
import {
  Wrap,
  Intro,
  Eyebrow,
  Title,
  IntroCopy,
  Card,
  FieldRow,
} from "./IdentityVerificationGate.styles";

const identitySchema = z.object({
  nin: z
    .string()
    .trim()
    .length(11, "Your NIN must be exactly 11 digits")
    .regex(/^\d+$/, "Your NIN can only contain digits"),
  firstName: z
    .string()
    .trim()
    .min(1, "First name is required")
    .max(100, "Keep this under 100 characters")
    .regex(NAME_REGEX, NAME_MESSAGE),
  lastName: z
    .string()
    .trim()
    .min(1, "Last name is required")
    .max(100, "Keep this under 100 characters")
    .regex(NAME_REGEX, NAME_MESSAGE),
  middleName: z
    .string()
    .trim()
    .max(100, "Keep this under 100 characters")
    .regex(NAME_REGEX, NAME_MESSAGE)
    .or(z.literal("")),
});

type IdentityFormValues = z.infer<typeof identitySchema>;

type GateStage = "form" | "ineligible";

export interface IdentityVerificationGateProps {
  onVerified: (user: User) => void;
}

export function IdentityVerificationGate({
  onVerified,
}: IdentityVerificationGateProps) {
  const [stage, setStage] = useState<GateStage>("form");
  const [ineligibleReasons, setIneligibleReasons] = useState<string[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [pendingValues, setPendingValues] = useState<IdentityFormValues>();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IdentityFormValues>({ resolver: zodResolver(identitySchema) });

  const verifyMutation = useMutation({
    mutationFn: verifyIdentity,
    onSuccess: (user) => {
      setModalOpen(false);
      sonnerToast.success("Your identity has been verified.");
      onVerified(user);
    },
    onError: (error) => {
      if (error instanceof IneligibleAfterVerificationError) {
        setModalOpen(false);
        setIneligibleReasons(error.reasons);
        setStage("ineligible");
      }
      // Any other error is shown inline inside the still-open modal (see
      // submitError below) — the applicant's captured photo and entered
      // details stay put so they can just retry, rather than losing
      // everything and starting over.
    },
  });

  const resetToForm = () => {
    setIneligibleReasons([]);
    setStage("form");
  };

  const handleCaptured = (image: string) => {
    if (!pendingValues) return;
    verifyMutation.mutate({
      nin: pendingValues.nin,
      firstName: pendingValues.firstName,
      lastName: pendingValues.lastName,
      middleName: pendingValues.middleName || undefined,
      image,
    });
  };

  const submitError =
    verifyMutation.isError &&
    !(verifyMutation.error instanceof IneligibleAfterVerificationError)
      ? friendlyMessage(
          verifyMutation.error,
          "We could not verify your identity. Please try again.",
        )
      : undefined;

  return (
    <Wrap>
      <Intro>
        <Eyebrow>Step 1 of registration</Eyebrow>
        <Title>Verify your identity</Title>
        <IntroCopy>
          Before you begin your Mbopo Akwa Ibom application, we need to verify
          your National Identification Number (NIN) and confirm it's really you
          with a quick photo. This only needs to happen once.
        </IntroCopy>
      </Intro>

      <Card>
        {stage === "ineligible" && (
          <IneligibleNotice
            reasons={ineligibleReasons}
            onTryAgain={resetToForm}
          />
        )}

        {stage === "form" && (
          <form
            onSubmit={handleSubmit((values) => {
              setPendingValues(values);
              setModalOpen(true);
            })}
            noValidate
          >
            <Field>
              <FieldLabel htmlFor="gate-nin">
                National Identification Number
                <RequiredMark>*</RequiredMark>
              </FieldLabel>
              <StyledField
                id="gate-nin"
                inputMode="numeric"
                maxLength={11}
                placeholder="11-digit NIN"
                invalid={Boolean(errors.nin)}
                {...register("nin")}
              />
              {errors.nin && <ErrorText>{errors.nin.message}</ErrorText>}
            </Field>

            <FieldRow>
              <Field>
                <FieldLabel htmlFor="gate-first-name">
                  First name
                  <RequiredMark>*</RequiredMark>
                </FieldLabel>
                <StyledField
                  id="gate-first-name"
                  maxLength={100}
                  placeholder="As it appears on your NIN"
                  invalid={Boolean(errors.firstName)}
                  {...register("firstName")}
                />
                {errors.firstName && (
                  <ErrorText>{errors.firstName.message}</ErrorText>
                )}
              </Field>
              <Field>
                <FieldLabel htmlFor="gate-last-name">
                  Last name
                  <RequiredMark>*</RequiredMark>
                </FieldLabel>
                <StyledField
                  id="gate-last-name"
                  maxLength={100}
                  placeholder="As it appears on your NIN"
                  invalid={Boolean(errors.lastName)}
                  {...register("lastName")}
                />
                {errors.lastName && (
                  <ErrorText>{errors.lastName.message}</ErrorText>
                )}
              </Field>
            </FieldRow>

            <Field>
              <FieldLabel htmlFor="gate-middle-name">
                Middle name (Optional)
              </FieldLabel>
              <StyledField
                id="gate-middle-name"
                maxLength={100}
                placeholder="As it appears on your NIN"
                invalid={Boolean(errors.middleName)}
                {...register("middleName")}
              />
              {errors.middleName && (
                <ErrorText>{errors.middleName.message}</ErrorText>
              )}
            </Field>

            <SubmitButton type="submit" size="lg" variant="secondary">
              Continue <ArrowRight size={18} />
            </SubmitButton>
          </form>
        )}
      </Card>

      <SelfieCaptureModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        onCaptured={handleCaptured}
        isSubmitting={verifyMutation.isPending}
        submitError={submitError}
      />
    </Wrap>
  );
}
