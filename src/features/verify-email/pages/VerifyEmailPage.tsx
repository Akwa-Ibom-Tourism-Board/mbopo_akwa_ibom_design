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
import { OTP_LENGTH } from "@/lib/emailVerificationStore";
import { friendlyMessage } from "@/lib/http";
import { OtpForm } from "../components/OtpForm";
import { verifyOtp, resendOtp } from "../api";

const RESEND_COOLDOWN_SECONDS = 30;

export function VerifyEmailPage() {
  const pending = usePendingRegistration();
  const navigate = useNavigate();

  const [otp, setOtp] = useState("");
  // Starts counting down from the moment this page is reached, not just
  // after an explicit resend — both ways of landing here (a fresh
  // registration, or login's auto-resend redirect) already have a code
  // queued server-side, which isn't processed until ~5s later. Without
  // this, Resend is clickable instantly and an impatient tap fires a
  // second send before the first one has even left the queue.
  const [cooldown, setCooldown] = useState(RESEND_COOLDOWN_SECONDS);

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
    onSuccess: () => {
      setCooldown(RESEND_COOLDOWN_SECONDS);
      sonnerToast.success(`A new code was sent to ${pending?.email}`);
    },
    onError: (error) => {
      sonnerToast.error(
        friendlyMessage(
          error,
          "We could not resend your code. Please try again.",
        ),
      );
    },
  });

  if (!pending) {
    return <Navigate to="/register" replace />;
  }

  const otpComplete = otp.length === OTP_LENGTH;

  const errorMessage = verifyMutation.isError
    ? friendlyMessage(verifyMutation.error)
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
