import { z } from "zod";
import { MINIMUM_STORY_WORDS, MAXIMUM_STORY_WORDS } from "./constants";

const wordCount = (value: string) =>
  value.trim().split(/\s+/).filter(Boolean).length;

export const registrationSchema = z.object({
  // Step 1 — Personal (editable fields only; identity is locked from the account)
  middleName: z.string().trim().optional(),
  phone: z.string().trim().min(1, "Phone number is required"),
  socialMedia: z.string().trim().optional(),
  nextOfKin: z.string().trim().min(1, "Next of kin full name is required"),
  nextOfKinPhone: z.string().trim().min(1, "Next of kin phone is required"),

  // Step 2 — Identity & Origin (LGA and Ward are locked, derived from the
  // VIN lookup — not part of the editable schema, same as NIN/VIN)
  village: z.string().trim().min(1, "Village is required"),
  residenceState: z.string().trim().min(1, "State of residence is required"),
  city: z.string().trim().min(1, "Town or city is required"),
  address: z.string().trim().min(1, "Home address is required"),

  // Step 3 — Education & background
  education: z.string().min(1, "Select your highest qualification"),
  institution: z.string().trim().optional(),
  occupation: z.string().trim().min(1, "Occupation is required"),
  talents: z.string().trim().min(1, "Please share at least one talent"),
  languages: z.string().trim().min(1, "Please list the languages you speak"),

  // Step 4 — Your story & declarations
  initiative: z.string().trim().optional(),
  why: z
    .string()
    .trim()
    .min(1, "This field is required")
    .refine((value) => wordCount(value) >= MINIMUM_STORY_WORDS, {
      message: `Please share at least ${MINIMUM_STORY_WORDS} words.`,
    })
    .refine((value) => wordCount(value) <= MAXIMUM_STORY_WORDS, {
      message: `Please keep this under ${MAXIMUM_STORY_WORDS} words.`,
    }),
  declarationIdentity: z
    .boolean()
    .refine((value) => value, "Please confirm this declaration."),
  declarationAccuracy: z
    .boolean()
    .refine((value) => value, "Please confirm this declaration."),
  declarationTerms: z
    .boolean()
    .refine((value) => value, "Please accept the terms."),
});

export type RegistrationFormValues = z.infer<typeof registrationSchema>;

export const DEFAULT_REGISTRATION_FORM_VALUES: RegistrationFormValues = {
  middleName: "",
  phone: "",
  socialMedia: "",
  nextOfKin: "",
  nextOfKinPhone: "",
  village: "",
  residenceState: "",
  city: "",
  address: "",
  education: "",
  institution: "",
  occupation: "",
  talents: "",
  languages: "",
  initiative: "",
  why: "",
  declarationIdentity: false,
  declarationAccuracy: false,
  declarationTerms: false,
};

export const STEP_FIELDS: (keyof RegistrationFormValues)[][] = [
  ["phone", "nextOfKin", "nextOfKinPhone"],
  ["village", "residenceState", "city", "address"],
  ["education", "occupation", "talents", "languages"],
  ["why", "declarationIdentity", "declarationAccuracy", "declarationTerms"],
];
