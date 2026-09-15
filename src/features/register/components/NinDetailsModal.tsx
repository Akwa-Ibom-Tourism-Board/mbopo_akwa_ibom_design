import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { format } from "date-fns";
import {
  Button,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  Input,
  Label,
} from "@/shared/ui";
import type { NinRecord } from "../types";
import {
  DetailGrid,
  DetailItem,
  DetailLabel,
  DetailValue,
  Field,
  ErrorText,
  ChangeNinButton,
} from "./NinDetailsModal.styles";

const emailSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "Email is required")
    .email("Enter a valid email address"),
});

type EmailFormValues = z.infer<typeof emailSchema>;

export interface NinDetailsModalProps {
  open: boolean;
  record: NinRecord;
  isSubmitting: boolean;
  onSubmit: (email: string) => void;
  onChangeNin: () => void;
}

export function NinDetailsModal({
  open,
  record,
  isSubmitting,
  onSubmit,
  onChangeNin,
}: NinDetailsModalProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EmailFormValues>({ resolver: zodResolver(emailSchema) });

  return (
    <Dialog open={open}>
      <DialogContent
        hideClose
        onInteractOutside={(event) => event.preventDefault()}
        onEscapeKeyDown={(event) => event.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>Confirm your details</DialogTitle>
          <DialogDescription>
            This is the record we found for your NIN. Add your email address to
            continue.
          </DialogDescription>
        </DialogHeader>

        <DetailGrid>
          <DetailItem>
            <DetailLabel>First name</DetailLabel>
            <DetailValue>{record.firstName}</DetailValue>
          </DetailItem>
          <DetailItem>
            <DetailLabel>Last name</DetailLabel>
            <DetailValue>{record.lastName}</DetailValue>
          </DetailItem>
          <DetailItem>
            <DetailLabel>NIN</DetailLabel>
            <DetailValue>{record.nin}</DetailValue>
          </DetailItem>
          <DetailItem>
            <DetailLabel>VIN</DetailLabel>
            <DetailValue>{record.vin}</DetailValue>
          </DetailItem>
          <DetailItem>
            <DetailLabel>Local Government Area</DetailLabel>
            <DetailValue>{record.lga}</DetailValue>
          </DetailItem>
          <DetailItem>
            <DetailLabel>Ward</DetailLabel>
            <DetailValue>{record.ward}</DetailValue>
          </DetailItem>
          <DetailItem>
            <DetailLabel>Gender</DetailLabel>
            <DetailValue style={{ textTransform: "capitalize" }}>
              {record.gender}
            </DetailValue>
          </DetailItem>
          <DetailItem>
            <DetailLabel>Date of birth</DetailLabel>
            <DetailValue>
              {format(new Date(record.dateOfBirth), "d MMMM yyyy")}
            </DetailValue>
          </DetailItem>
        </DetailGrid>

        <ChangeNinButton type="button" onClick={onChangeNin}>
          This isn&apos;t me — change NIN
        </ChangeNinButton>

        <form
          onSubmit={handleSubmit((values) => onSubmit(values.email))}
          noValidate
        >
          <Field>
            <Label htmlFor="nin-modal-email">Email address</Label>
            <Input
              id="nin-modal-email"
              type="email"
              invalid={Boolean(errors.email)}
              {...register("email")}
            />
            {errors.email && <ErrorText>{errors.email.message}</ErrorText>}
          </Field>
          <DialogFooter>
            <Button type="submit" size="lg" disabled={isSubmitting}>
              {isSubmitting ? "Sending code…" : "Submit"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
