import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { ArrowRight, MailCheck } from "lucide-react";
import { AuthLayout } from "@/shared/components";
import { sonnerToast } from "@/shared/ui";
import { friendlyMessage } from "@/lib/http";
import {
  Heading,
  Subtitle,
  FormBlock,
  Field,
  FieldLabel,
  RequiredMark,
  StyledField,
  ErrorText,
  SubmitButton,
  FormFooter,
  InlineLink,
} from "@/shared/components/AuthForm.styles";
import { requestPasswordReset } from "../api";
import {
  ConfirmationIcon,
  ConfirmationCopy,
} from "./ForgotPasswordPage.styles";

const forgotPasswordSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "Email is required")
    .email("Enter a valid email address"),
});

type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;

export function ForgotPasswordPage() {
  const [submittedEmail, setSubmittedEmail] = useState<string>();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  useEffect(() => {
    document.title = "Forgot Password | Mbopo Akwa Ibom";
  }, []);

  const requestMutation = useMutation({
    mutationFn: requestPasswordReset,
    onSuccess: (_, { email }) => setSubmittedEmail(email),
    onError: (error) => sonnerToast.error(friendlyMessage(error)),
  });

  if (submittedEmail) {
    return (
      <AuthLayout carouselVariant="login">
        <ConfirmationIcon>
          <MailCheck size={28} />
        </ConfirmationIcon>
        <Heading>Check your email</Heading>
        <ConfirmationCopy>
          If an account exists for <strong>{submittedEmail}</strong>, we have
          sent a link to reset your password. It expires in 1 hour.
        </ConfirmationCopy>
        <FormFooter>
          <InlineLink to="/login">Back to login</InlineLink>
        </FormFooter>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout carouselVariant="login">
      <Heading>Forgot your password?</Heading>
      <Subtitle>
        Enter the email on your account and we will send you a link to reset it.
      </Subtitle>

      <FormBlock
        onSubmit={handleSubmit((values) => requestMutation.mutate(values))}
        noValidate
      >
        <Field>
          <FieldLabel htmlFor="email">
            Email Address<RequiredMark>*</RequiredMark>
          </FieldLabel>
          <StyledField
            id="email"
            type="email"
            placeholder="Enter your email"
            autoComplete="email"
            invalid={Boolean(errors.email)}
            {...register("email")}
          />
          {errors.email && <ErrorText>{errors.email.message}</ErrorText>}
        </Field>

        <SubmitButton
          type="submit"
          size="lg"
          variant="secondary"
          disabled={requestMutation.isPending}
        >
          {requestMutation.isPending ? "Sending…" : "Send reset link"}
          <ArrowRight size={18} />
        </SubmitButton>
      </FormBlock>

      <FormFooter>
        Remembered your password? <InlineLink to="/login">Log in</InlineLink>
      </FormFooter>
    </AuthLayout>
  );
}
