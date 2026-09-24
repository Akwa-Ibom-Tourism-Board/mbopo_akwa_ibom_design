import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { PageShell, PageHeroBanner, Container } from "@/shared/components";
import { Button, Input, Label, PasswordInput, sonnerToast } from "@/shared/ui";
import { useAuth } from "../context/AuthContext";
import { login } from "../api";
import { InvalidCredentialsError } from "../types";
import {
  PageFrame,
  FormCard,
  Field,
  ErrorText,
  FormFooter,
} from "./LoginPage.styles";

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
    },
  });

  useEffect(() => {
    document.title = "Log In | Mbopo Akwa Ibom";
  }, []);

  if (status === "authenticated") {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <PageShell>
      <PageHeroBanner eyebrow="Welcome back" title="Log in to your account" />
      <PageFrame>
        <Container>
          <FormCard>
            <form
              onSubmit={handleSubmit((values) => loginMutation.mutate(values))}
              noValidate
            >
              <Field>
                <Label htmlFor="email">Email address</Label>
                <Input
                  id="email"
                  type="email"
                  autoComplete="email"
                  invalid={Boolean(errors.email)}
                  {...register("email")}
                />
                {errors.email && <ErrorText>{errors.email.message}</ErrorText>}
              </Field>
              <Field>
                <Label htmlFor="password">Password</Label>
                <PasswordInput
                  id="password"
                  autoComplete="current-password"
                  invalid={Boolean(errors.password)}
                  {...register("password")}
                />
                {errors.password && (
                  <ErrorText>{errors.password.message}</ErrorText>
                )}
              </Field>
              <Button
                type="submit"
                size="lg"
                style={{ width: "100%" }}
                disabled={isSubmitting || loginMutation.isPending}
              >
                {loginMutation.isPending ? "Logging in…" : "Log in"}
              </Button>
            </form>
            <FormFooter>
              New to Mbopo Akwa Ibom?{" "}
              <Link to="/register">Start your registration</Link>
            </FormFooter>
          </FormCard>
        </Container>
      </PageFrame>
    </PageShell>
  );
}
