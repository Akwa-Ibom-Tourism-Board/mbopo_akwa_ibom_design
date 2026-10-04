import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { Loader2, Send } from "lucide-react";
import { Input, Textarea, Label, Button } from "@/shared/ui";
import { friendlyMessage } from "@/lib/http";
import { WidgetContainer } from "./WidgetContainer";
import { submitMessage } from "../api";
import {
  Body,
  IntroText,
  Field,
  LabelRow,
  OptionalTag,
  RequiredMark,
  ErrorText,
  Spinner,
} from "./AskMeForm.styles";

const askMeSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name"),
  email: z
    .string()
    .trim()
    .min(1, "Email is required")
    .email("Enter a valid email address"),
  phoneNumber: z.string().trim().min(1, "Phone number is required"),
  title: z.string().trim().optional(),
  message: z
    .string()
    .trim()
    .min(10, "Please share a little more detail (at least 10 characters)")
    .max(5000, "Please keep this under 5000 characters"),
});

type AskMeFormValues = z.infer<typeof askMeSchema>;

export interface AskMeFormProps {
  onClose: () => void;
  onMinimize: () => void;
  onSuccess: () => void;
  onError: (message: string) => void;
}

export function AskMeForm({
  onClose,
  onMinimize,
  onSuccess,
  onError,
}: AskMeFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AskMeFormValues>({ resolver: zodResolver(askMeSchema) });

  const mutation = useMutation({
    mutationFn: submitMessage,
    onSuccess: () => {
      onSuccess();
      reset();
      onClose();
    },
    onError: (error) =>
      onError(
        friendlyMessage(
          error,
          "We couldn't send your message. Please try again.",
        ),
      ),
  });

  const onSubmit = (values: AskMeFormValues) => {
    mutation.mutate({
      name: values.name,
      email: values.email,
      phoneNumber: values.phoneNumber,
      title: values.title || undefined,
      message: values.message,
    });
  };

  return (
    <WidgetContainer onClose={onClose} onMinimize={onMinimize}>
      <Body>
        <IntroText>
          Have a question or something to tell us? Fill this in and we&apos;ll
          get back to you.
        </IntroText>

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <Field>
            <Label htmlFor="ask-me-name">
              Name<RequiredMark>*</RequiredMark>
            </Label>
            <Input
              id="ask-me-name"
              placeholder="Your full name"
              autoComplete="name"
              invalid={Boolean(errors.name)}
              {...register("name")}
            />
            {errors.name && <ErrorText>{errors.name.message}</ErrorText>}
          </Field>

          <Field>
            <Label htmlFor="ask-me-email">
              Email<RequiredMark>*</RequiredMark>
            </Label>
            <Input
              id="ask-me-email"
              type="email"
              placeholder="you@example.com"
              autoComplete="email"
              invalid={Boolean(errors.email)}
              {...register("email")}
            />
            {errors.email && <ErrorText>{errors.email.message}</ErrorText>}
          </Field>

          <Field>
            <Label htmlFor="ask-me-phone">
              Phone Number<RequiredMark>*</RequiredMark>
            </Label>
            <Input
              id="ask-me-phone"
              type="tel"
              placeholder="080 0000 0000"
              autoComplete="tel"
              invalid={Boolean(errors.phoneNumber)}
              {...register("phoneNumber")}
            />
            {errors.phoneNumber && (
              <ErrorText>{errors.phoneNumber.message}</ErrorText>
            )}
          </Field>

          <Field>
            <LabelRow>
              <Label htmlFor="ask-me-title">Title</Label>
              <OptionalTag>Optional</OptionalTag>
            </LabelRow>
            <Input
              id="ask-me-title"
              placeholder="What's this about?"
              {...register("title")}
            />
          </Field>

          <Field>
            <Label htmlFor="ask-me-message">
              Message<RequiredMark>*</RequiredMark>
            </Label>
            <Textarea
              id="ask-me-message"
              rows={4}
              placeholder="Tell us what's on your mind…"
              invalid={Boolean(errors.message)}
              {...register("message")}
            />
            {errors.message && <ErrorText>{errors.message.message}</ErrorText>}
          </Field>

          <Button
            type="submit"
            variant="secondary"
            style={{ width: "100%" }}
            disabled={mutation.isPending}
          >
            {mutation.isPending ? (
              <>
                <Spinner>
                  <Loader2 size={16} />
                </Spinner>
                Sending…
              </>
            ) : (
              <>
                <Send size={16} /> Send Message
              </>
            )}
          </Button>
        </form>
      </Body>
    </WidgetContainer>
  );
}
