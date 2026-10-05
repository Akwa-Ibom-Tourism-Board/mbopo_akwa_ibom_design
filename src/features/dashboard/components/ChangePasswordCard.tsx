import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  Button,
  Label,
  PasswordInput,
  sonnerToast,
} from "@/shared/ui";
import {
  useAuth,
  changePassword,
  IncorrectPasswordError,
} from "@/features/auth";
import { friendlyMessage } from "@/lib/http";
import { MAX_PASSWORD_LENGTH } from "@/lib/validation";
import { CreatePasswordForm } from "@/features/register";
import {
  PasswordForm,
  Field,
  ErrorText,
  Divider,
  SubmitRow,
} from "./ChangePasswordCard.styles";

const changePasswordSchema = z
  .object({
    currentPassword: z
      .string()
      .min(1, "Current password is required")
      .max(MAX_PASSWORD_LENGTH, "That password is too long"),
    newPassword: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(
        MAX_PASSWORD_LENGTH,
        `Keep this under ${MAX_PASSWORD_LENGTH} characters`,
      ),
    confirmPassword: z.string(),
  })
  .refine((values) => values.newPassword === values.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type ChangePasswordFormValues = z.infer<typeof changePasswordSchema>;

export function ChangePasswordCard() {
  const { user } = useAuth();

  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm<ChangePasswordFormValues>({
    resolver: zodResolver(changePasswordSchema),
  });

  const changePasswordMutation = useMutation({
    mutationFn: (values: ChangePasswordFormValues) =>
      changePassword({
        currentPassword: values.currentPassword,
        newPassword: values.newPassword,
      }),
    onSuccess: () => {
      reset();
      sonnerToast.success("Your password has been changed.");
    },
    onError: (error) => {
      if (error instanceof IncorrectPasswordError) {
        setError("currentPassword", { message: error.message });
        return;
      }
      sonnerToast.error(
        friendlyMessage(
          error,
          "We could not change your password. Please try again.",
        ),
      );
    },
  });

  if (!user) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Change password</CardTitle>
        <CardDescription>
          Use a strong password you do not reuse anywhere else.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <PasswordForm
          onSubmit={handleSubmit((values) =>
            changePasswordMutation.mutate(values),
          )}
          noValidate
        >
          <Field>
            <Label htmlFor="currentPassword">Current password</Label>
            <PasswordInput
              id="currentPassword"
              autoComplete="current-password"
              maxLength={MAX_PASSWORD_LENGTH}
              invalid={Boolean(errors.currentPassword)}
              {...register("currentPassword")}
            />
            {errors.currentPassword && (
              <ErrorText>{errors.currentPassword.message}</ErrorText>
            )}
          </Field>

          <Divider />

          <CreatePasswordForm
            passwordField={register("newPassword")}
            confirmPasswordField={register("confirmPassword")}
            passwordError={errors.newPassword?.message}
            confirmPasswordError={errors.confirmPassword?.message}
          />

          <SubmitRow>
            <Button
              type="submit"
              variant="secondary"
              disabled={changePasswordMutation.isPending}
            >
              {changePasswordMutation.isPending
                ? "Changing…"
                : "Change password"}
            </Button>
          </SubmitRow>
        </PasswordForm>
      </CardContent>
    </Card>
  );
}
