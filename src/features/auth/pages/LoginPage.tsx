import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { ArrowRight } from "lucide-react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";
import { AuthLayout } from "@/shared/components";
import { Checkbox, sonnerToast } from "@/shared/ui";
import { RECAPTCHA_SITE_KEY } from "@/lib/config";
import { ApiError, friendlyMessage } from "@/lib/http";
import { rememberPendingEmailVerification } from "@/lib/emailVerificationStore";
import { MAX_EMAIL_LENGTH, MAX_PASSWORD_LENGTH } from "@/lib/validation";
import { resendOtp } from "@/features/verify-email";
import { useAuth } from "../context/AuthContext";
import { login } from "../api";
import {
  Heading,
  Subtitle,
  FormBlock,
  Field,
  FieldLabel,
  RequiredMark,
  StyledField,
  StyledPasswordField,
  ErrorText,
  CaptchaField,
  OptionsRow,
  RememberRow,
  SubmitButton,
  FormFooter,
  InlineLink,
} from "@/shared/components/AuthForm.styles";

const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "Email is required")
    .max(MAX_EMAIL_LENGTH, "That email address is too long")
    .email("Enter a valid email address"),
  password: z
    .string()
    .min(1, "Password is required")
    .max(MAX_PASSWORD_LENGTH, "That password is too long"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export function LoginPage() {
  const { status, login: setSession } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [rememberMe, setRememberMe] = useState(true);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const recaptchaRef = useRef<ReCAPTCHA>(null);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({ resolver: zodResolver(loginSchema) });

  const loginMutation = useMutation({
    mutationFn: login,
    onSuccess: (session) => {
      setSession(session);
      const redirectTo =
        (location.state as { from?: string } | null)?.from ?? "/dashboard";
      navigate(redirectTo, { replace: true });
    },
    onError: (error, variables) => {
      // A reCAPTCHA token is single-use, so any failed submit needs a
      // fresh one before trying again.
      recaptchaRef.current?.reset();
      setCaptchaToken(null);

      // Login's own 403 means the account exists and the password is
      // correct — it's only blocked on email verification. Rather than
      // just saying so and leaving the applicant stuck, send them
      // straight to the OTP screen with a fresh code already on the way,
      // the same place a fresh registration lands them.
      if (error instanceof ApiError && error.status === 403) {
        const { email } = variables;
        rememberPendingEmailVerification(email);
        void resendOtp({ email }).catch(() => {});
        sonnerToast.info(
          "Please verify your email first. We have sent a new code to your inbox.",
        );
        navigate("/verify-email", { state: { email } });
        return;
      }

      const message = friendlyMessage(error);
      setError("password", { message });
      sonnerToast.error(message);
    },
  });

  useEffect(() => {
    document.title = "Log In | Mbopo Akwa Ibom";
  }, []);

  if (status === "authenticated") {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <AuthLayout carouselVariant="login">
      <Heading>Welcome Back</Heading>
      <Subtitle>Sign in to continue to your account</Subtitle>

      <FormBlock
        onSubmit={handleSubmit((values) => {
          if (!captchaToken) return;
          loginMutation.mutate({ ...values, captchaToken });
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
        <Field>
          <FieldLabel htmlFor="password">
            Password<RequiredMark>*</RequiredMark>
          </FieldLabel>
          <StyledPasswordField
            id="password"
            placeholder="Enter your password"
            autoComplete="current-password"
            maxLength={MAX_PASSWORD_LENGTH}
            invalid={Boolean(errors.password)}
            {...register("password")}
          />
          {errors.password && <ErrorText>{errors.password.message}</ErrorText>}
        </Field>

        <OptionsRow>
          <RememberRow>
            <Checkbox
              checked={rememberMe}
              onCheckedChange={(checked) => setRememberMe(checked === true)}
            />
            Remember me
          </RememberRow>
          <InlineLink to="/forgot-password">Forgot password?</InlineLink>
        </OptionsRow>

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
          disabled={isSubmitting || loginMutation.isPending || !captchaToken}
        >
          {loginMutation.isPending ? "Signing in…" : "Sign In"}
          <ArrowRight size={18} />
        </SubmitButton>
      </FormBlock>

      <FormFooter>
        Do not have an account?{" "}
        <InlineLink to="/register">Create one here</InlineLink>
      </FormFooter>
    </AuthLayout>
  );
}
