import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Link } from "react-router-dom";
import { Button, Input, Label } from "@/shared/ui";
import {
  FormCard,
  FormTitle,
  FormCopy,
  Field,
  ErrorText,
  SubmitRow,
  FormFooter,
} from "./NinLookupForm.styles";

const ninLookupSchema = z.object({
  nin: z
    .string()
    .trim()
    .length(11, "Your NIN must be exactly 11 digits")
    .regex(/^\d+$/, "Your NIN can only contain digits"),
});

export type NinLookupFormValues = z.infer<typeof ninLookupSchema>;

export interface NinLookupFormProps {
  onSubmit: (values: NinLookupFormValues) => void;
  isSubmitting: boolean;
  submitError?: string;
}

export function NinLookupForm({
  onSubmit,
  isSubmitting,
  submitError,
}: NinLookupFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<NinLookupFormValues>({ resolver: zodResolver(ninLookupSchema) });

  return (
    <FormCard>
      <FormTitle>Start your application</FormTitle>
      <FormCopy>
        Enter your National Identification Number (NIN). We&apos;ll use it to
        confirm your identity and eligibility before you continue.
      </FormCopy>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Field>
          <Label htmlFor="nin">National Identification Number</Label>
          <Input
            id="nin"
            inputMode="numeric"
            maxLength={11}
            placeholder="11-digit NIN"
            invalid={Boolean(errors.nin ?? submitError)}
            {...register("nin")}
          />
          {errors.nin && <ErrorText>{errors.nin.message}</ErrorText>}
          {!errors.nin && submitError && <ErrorText>{submitError}</ErrorText>}
        </Field>
        <SubmitRow>
          <Button
            type="submit"
            size="lg"
            style={{ width: "100%" }}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Verifying…" : "Continue"}
          </Button>
        </SubmitRow>
      </form>
      <FormFooter>
        Already registered? <Link to="/login">Log in</Link>
      </FormFooter>
    </FormCard>
  );
}
