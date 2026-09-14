import type { User } from "@/features/auth";
import type { RegistrationFormValues } from "../schema";

export interface RegistrationPhotos {
  passportPhoto: File | null;
  certificateOfOrigin: File | null;
  fullImage: File | null;
}

export interface SubmitApplicationInput {
  userId: User["id"];
  values: RegistrationFormValues;
}

export interface SubmitApplicationResult {
  referenceCode: string;
}
