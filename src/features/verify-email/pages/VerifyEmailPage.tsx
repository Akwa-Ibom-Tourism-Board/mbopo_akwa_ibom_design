import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
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
} from "@/lib/pendingRegistrationStore";
import { useAuth } from "@/features/auth";
import { OtpForm } from "../components/OtpForm";
import { CreatePasswordForm } from "../components/CreatePasswordForm";
import { verifyOtpAndCreateAccount, resendOtp } from "../api";

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
    <AuthLayout>
      <Heading>One Last Step</Heading>
      <Subtitle>
        We sent a {OTP_LENGTH}-digit code to <strong>{pending.email}</strong>.
      </Subtitle>

      <FormBlock onSubmit={onSubmit} noValidate>
        <OtpForm
          value={otp}
          onChange={setOtp}
          onResend={() =>
            resendMutation.mutate({ pendingId: pending.pendingId })
          }
          resendDisabled={cooldown > 0 || resendMutation.isPending}
          resendLabel={cooldown > 0 ? `Resend in ${cooldown}s` : "Resend code"}
        />

        {errorMessage && <ErrorText>{errorMessage}</ErrorText>}

        {otpComplete && (
          <CreatePasswordForm register={register} errors={errors} />
        )}

        <SubmitButton
          type="submit"
          size="lg"
          variant="secondary"
          disabled={!otpComplete || verifyMutation.isPending}
        >
          {verifyMutation.isPending ? "Verifying…" : "Verify and continue"}
        </SubmitButton>
      </FormBlock>
    </AuthLayout>
  );
}
