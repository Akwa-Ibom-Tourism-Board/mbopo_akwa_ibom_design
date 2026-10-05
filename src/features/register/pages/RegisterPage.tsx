import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import ReCAPTCHA from "react-google-recaptcha";
import { AuthLayout } from "@/shared/components";
import { sonnerToast } from "@/shared/ui";
import { RECAPTCHA_SITE_KEY } from "@/lib/config";
import { friendlyMessage } from "@/lib/http";
import { MAX_EMAIL_LENGTH, MAX_PASSWORD_LENGTH } from "@/lib/validation";
import {
  Heading,
  Subtitle,
  FormBlock,
  Field,
  FieldLabel,
  RequiredMark,
  StyledField,
  ErrorText,
  CaptchaField,
  SubmitButton,
  FormFooter,
  InlineLink,
} from "@/shared/components/AuthForm.styles";
import { registerAccount } from "../api";
import { CreatePasswordForm } from "../components/CreatePasswordForm";

const registerSchema = z
  .object({
    email: z
      .string()
      .trim()
      .min(1, "Email is required")
      .max(MAX_EMAIL_LENGTH, "That email address is too long")
      .email("Enter a valid email address"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(
        MAX_PASSWORD_LENGTH,
        `Keep this under ${MAX_PASSWORD_LENGTH} characters`,
      ),
    confirmPassword: z.string(),
  })
  .refine((values) => values.password === values.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type RegisterFormValues = z.infer<typeof registerSchema>;

export function RegisterPage() {
  const navigate = useNavigate();
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const recaptchaRef = useRef<ReCAPTCHA>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({ resolver: zodResolver(registerSchema) });

  useEffect(() => {
    document.title = "Register | Mbopo Akwa Ibom";
  }, []);

  const registerMutation = useMutation({
    mutationFn: registerAccount,
    onSuccess: ({ email }) => {
      navigate("/verify-email", { state: { email } });
    },
    onError: (error) => {
      sonnerToast.error(
        friendlyMessage(
          error,
          "We could not create your account. Please try again.",
        ),
      );
      // A reCAPTCHA token is single-use, so a failed submit needs a fresh
      // one before trying again.
      recaptchaRef.current?.reset();
      setCaptchaToken(null);
    },
  });

  return (
    <AuthLayout carouselVariant="signup">
      <Heading>Create Your Account</Heading>
      <Subtitle>
        Register with your email to begin your Mbopo Akwa Ibom application.
      </Subtitle>

      <FormBlock
        onSubmit={handleSubmit((values) => {
          if (!captchaToken) return;
          registerMutation.mutate({ ...values, captchaToken });
        })}
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
            maxLength={MAX_EMAIL_LENGTH}
            invalid={Boolean(errors.email)}
            {...register("email")}
          />
          {errors.email && <ErrorText>{errors.email.message}</ErrorText>}
        </Field>

        <CreatePasswordForm
          passwordField={register("password")}
          confirmPasswordField={register("confirmPassword")}
          passwordError={errors.password?.message}
          confirmPasswordError={errors.confirmPassword?.message}
        />

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
          disabled={registerMutation.isPending || !captchaToken}
        >
          {registerMutation.isPending ? "Creating account…" : "Create Account"}
          <ArrowRight size={18} />
        </SubmitButton>
      </FormBlock>

      <FormFooter>
        Already registered? <InlineLink to="/login">Log in</InlineLink>
      </FormFooter>
    </AuthLayout>
  );
}
