import { useEffect, useState, type FormEvent } from "react";
import { useMutation } from "@tanstack/react-query";
import { Navigate, useNavigate } from "react-router-dom";
import { AuthLayout } from "@/shared/components";
import {
  Heading,
  Subtitle,
  FormBlock,
  ErrorText,
  SubmitButton,
} from "@/shared/components/AuthForm.styles";
import { usePendingRegistration } from "@/shared/hooks";
import { sonnerToast } from "@/shared/ui";
import {
  OTP_LENGTH,
  OtpExpiredError,
  OtpIncorrectError,
} from "@/lib/emailVerificationStore";
import { OtpForm } from "../components/OtpForm";
import { verifyOtp, resendOtp } from "../api";

const RESEND_COOLDOWN_SECONDS = 30;

export function VerifyEmailPage() {
  const pending = usePendingRegistration();
  const navigate = useNavigate();

  const [otp, setOtp] = useState("");
  const [cooldown, setCooldown] = useState(0);

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
      sonnerToast.error("Your session expired. Please register again.");
    }
  }, [pending]);

  const verifyMutation = useMutation({
    mutationFn: verifyOtp,
    onSuccess: () => {
      sonnerToast.success("Your email has been verified. Please log in.");
      navigate("/login", { replace: true });
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

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    verifyMutation.mutate({ email: pending.email, code: otp });
  };

  return (
    <AuthLayout carouselVariant="signup">
      <Heading>One Last Step</Heading>
      <Subtitle>
        We sent a {OTP_LENGTH}-digit code to <strong>{pending.email}</strong>.
      </Subtitle>

      <FormBlock onSubmit={onSubmit} noValidate>
        <OtpForm
          value={otp}
          onChange={setOtp}
          onResend={() => resendMutation.mutate({ email: pending.email })}
          resendDisabled={cooldown > 0 || resendMutation.isPending}
          resendLabel={cooldown > 0 ? `Resend in ${cooldown}s` : "Resend code"}
        />

        {errorMessage && <ErrorText>{errorMessage}</ErrorText>}

        <SubmitButton
          type="submit"
          size="lg"
          variant="secondary"
          disabled={!otpComplete || verifyMutation.isPending}
        >
          {verifyMutation.isPending ? "Verifying…" : "Verify email"}
        </SubmitButton>
      </FormBlock>
    </AuthLayout>
  );
}
