import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { Navigate, useNavigate } from "react-router-dom";
import { PageShell, PageHeroBanner, Container } from "@/shared/components";
import { usePendingRegistration } from "@/shared/hooks";
import { Button, sonnerToast } from "@/shared/ui";
import {
  OTP_LENGTH,
  OtpExpiredError,
  OtpIncorrectError,
} from "@/lib/pendingRegistrationStore";
import { useAuth } from "@/features/auth";
import { OtpForm } from "../components/OtpForm";
import { CreatePasswordForm } from "../components/CreatePasswordForm";
import { verifyOtpAndCreateAccount, resendOtp } from "../api";
import {
  PageFrame,
  FormCard,
  FormTitle,
  FormCopy,
  ErrorBanner,
} from "./VerifyEmailPage.styles";

const RESEND_COOLDOWN_SECONDS = 30;

const passwordSchema = z
  .object({
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
  })
  .refine((values) => values.password === values.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type PasswordFormValues = z.infer<typeof passwordSchema>;

export function VerifyEmailPage() {
  const pending = usePendingRegistration();
  const navigate = useNavigate();
  const { login: setSession } = useAuth();

  const [otp, setOtp] = useState("");
  const [cooldown, setCooldown] = useState(0);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PasswordFormValues>({ resolver: zodResolver(passwordSchema) });

  useEffect(() => {
    document.title = "Verify Email | Mbopo Akwa Ibom";
  }, []);

  useEffect(() => {
    if (cooldown <= 0) return;
    const timer = setInterval(
      () => setCooldown((seconds) => Math.max(0, seconds - 1)),
      1000,
    );
    return () => clearInterval(timer);
  }, [cooldown]);

  useEffect(() => {
    if (!pending) {
      sonnerToast.error("Your session expired. Please look up your NIN again.");
    }
  }, [pending]);

  const verifyMutation = useMutation({
    mutationFn: verifyOtpAndCreateAccount,
    onSuccess: (session) => {
      setSession(session);
      sonnerToast.success("Your email has been verified.");
      navigate("/dashboard", { replace: true });
    },
  });

  const resendMutation = useMutation({
    mutationFn: resendOtp,
    onSuccess: () => setCooldown(RESEND_COOLDOWN_SECONDS),
  });

  if (!pending) {
    return <Navigate to="/register" replace />;
  }

  const otpComplete = otp.length === OTP_LENGTH;

  const errorMessage =
    verifyMutation.error instanceof OtpExpiredError ||
    verifyMutation.error instanceof OtpIncorrectError
      ? verifyMutation.error.message
      : verifyMutation.isError
        ? "Something went wrong. Please try again."
        : undefined;

  const onSubmit = handleSubmit((values) => {
    verifyMutation.mutate({
      pendingId: pending.pendingId,
      code: otp,
      password: values.password,
    });
  });

  return (
    <PageShell>
      <PageHeroBanner eyebrow="One last step" title="Verify your email" />
      <PageFrame>
        <Container>
          <FormCard>
            <FormTitle>Enter your verification code</FormTitle>
            <FormCopy>
              We sent a {OTP_LENGTH}-digit code to{" "}
              <strong>{pending.email}</strong>.
            </FormCopy>

            {errorMessage && <ErrorBanner>{errorMessage}</ErrorBanner>}

            <form onSubmit={onSubmit} noValidate>
              <OtpForm
                value={otp}
                onChange={setOtp}
                onResend={() =>
                  resendMutation.mutate({ pendingId: pending.pendingId })
                }
                resendDisabled={cooldown > 0 || resendMutation.isPending}
                resendLabel={
                  cooldown > 0 ? `Resend in ${cooldown}s` : "Resend code"
                }
              />

              {otpComplete && (
                <CreatePasswordForm register={register} errors={errors} />
              )}

              <Button
                type="submit"
                size="lg"
                style={{ width: "100%" }}
                disabled={!otpComplete || verifyMutation.isPending}
              >
                {verifyMutation.isPending
                  ? "Verifying…"
                  : "Verify and continue"}
              </Button>
            </form>
          </FormCard>
        </Container>
      </PageFrame>
    </PageShell>
  );
}
