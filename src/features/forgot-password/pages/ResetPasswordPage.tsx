import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { AuthLayout } from "@/shared/components";
import { sonnerToast } from "@/shared/ui";
import { friendlyMessage } from "@/lib/http";
import {
  Heading,
  Subtitle,
  FormBlock,
  ErrorText,
  SubmitButton,
  FormFooter,
  InlineLink,
} from "@/shared/components/AuthForm.styles";
import { CreatePasswordForm } from "@/features/register";
import { resetPassword } from "../api";

const resetPasswordSchema = z
  .object({
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
  })
  .refine((values) => values.password === values.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>;

export function ResetPasswordPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
  });

  useEffect(() => {
    document.title = "Reset Password | Mbopo Akwa Ibom";
  }, []);

  const resetMutation = useMutation({
    mutationFn: resetPassword,
    onSuccess: () => {
      sonnerToast.success("Your password has been reset. Please log in.");
      navigate("/login", { replace: true });
    },
    onError: (error) => {
      sonnerToast.error(friendlyMessage(error));
    },
  });

  if (!token) {
    return (
      <AuthLayout carouselVariant="login">
        <Heading>Invalid reset link</Heading>
        <Subtitle>This password reset link is missing or malformed.</Subtitle>
        <FormFooter>
          <InlineLink to="/forgot-password">Request a new link</InlineLink>
        </FormFooter>
      </AuthLayout>
    );
  }

  const resetError = resetMutation.isError
    ? friendlyMessage(resetMutation.error)
    : undefined;

  return (
    <AuthLayout carouselVariant="login">
      <Heading>Set a new password</Heading>
      <Subtitle>Choose a new password for your account.</Subtitle>

      <FormBlock
        onSubmit={handleSubmit((values) =>
          resetMutation.mutate({ token, password: values.password }),
        )}
        noValidate
      >
        <CreatePasswordForm
          passwordField={register("password")}
          confirmPasswordField={register("confirmPassword")}
          passwordError={errors.password?.message}
          confirmPasswordError={errors.confirmPassword?.message}
        />

        {resetError && <ErrorText>{resetError}</ErrorText>}

        <SubmitButton
          type="submit"
          size="lg"
          variant="secondary"
          disabled={resetMutation.isPending}
        >
          {resetMutation.isPending ? "Resetting…" : "Reset password"}
          <ArrowRight size={18} />
        </SubmitButton>
      </FormBlock>

      <FormFooter>
        {resetError && (
          <>
            <InlineLink to="/forgot-password">
              Request a new reset link
            </InlineLink>
            <br />
          </>
        )}
        Remembered your password? <InlineLink to="/login">Log in</InlineLink>
      </FormFooter>
    </AuthLayout>
  );
}
