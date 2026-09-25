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
import { useAuth } from "../context/AuthContext";
import { login } from "../api";
import { InvalidCredentialsError } from "../types";
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
    .min(1, "Email is required")
    .email("Enter a valid email address"),
  password: z.string().min(1, "Password is required"),
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
    onError: (error) => {
      const message =
        error instanceof InvalidCredentialsError
          ? error.message
          : "Something went wrong. Please try again.";
      setError("password", { message });
      sonnerToast.error(message);
      // A reCAPTCHA token is single-use, so a failed submit needs a fresh
      // one before trying again.
      recaptchaRef.current?.reset();
      setCaptchaToken(null);
    },
  });

  useEffect(() => {
    document.title = "Log In | Mbopo Akwa Ibom";
  }, []);

  if (status === "authenticated") {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <AuthLayout>
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
        Don&apos;t have an account?{" "}
        <InlineLink to="/register">Create one here</InlineLink>
      </FormFooter>
    </AuthLayout>
  );
}
