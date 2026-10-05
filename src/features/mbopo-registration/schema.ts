import { z } from "zod";
import {
  MINIMUM_STORY_WORDS,
  MAXIMUM_STORY_WORDS,
  EDUCATION_LEVELS,
  NIGERIAN_STATES,
} from "./constants";
import {
  NIGERIAN_PHONE_REGEX,
  PHONE_MESSAGE,
  NAME_REGEX,
  NAME_MESSAGE,
  CONTAINS_LETTER_REGEX,
  CONTAINS_LETTER_MESSAGE,
} from "@/lib/validation";

const wordCount = (value: string) =>
  value.trim().split(/\s+/).filter(Boolean).length;

const name = (max: number) =>
  z
    .string()
    .trim()
    .max(max, `Keep this under ${max} characters`)
    .regex(NAME_REGEX, NAME_MESSAGE);

// Optional free-text fields still have their format checked when
// non-empty — only an actually-empty string skips validation — so a
// middle name field can't silently accept garbage just because it isn't
// required.
const optionalName = (max: number) =>
  z
    .string()
    .trim()
    .max(max, `Keep this under ${max} characters`)
    .regex(NAME_REGEX, NAME_MESSAGE)
    .or(z.literal(""));

const optionalText = (max: number) =>
  z.string().trim().max(max, `Keep this under ${max} characters`);

const phone = (message: string) =>
  z
    .string()
    .trim()
    .regex(NIGERIAN_PHONE_REGEX, message || PHONE_MESSAGE);

const placeName = (max: number) =>
  z
    .string()
    .trim()
    .max(max, `Keep this under ${max} characters`)
    .regex(CONTAINS_LETTER_REGEX, CONTAINS_LETTER_MESSAGE);

// A plain string whitelisted against a fixed options list, rather than
// z.enum(...) directly — z.enum rejects "" outright and (with a narrowing
// refine) infers the strict literal union as the field's type everywhere,
// including defaultValues, where a not-yet-chosen Select has to start at
// "". A plain boolean refine keeps the field typed as string (fine — the
// Select's onValueChange already only ever passes a real option in) while
// still failing validation at parse time until a real option is picked.
const oneOf = (options: readonly string[], message: string) =>
  z.string().refine((value) => options.includes(value), { message });

export const registrationSchema = z.object({
  // Step 1 — Personal (editable fields only; identity is locked from the account)
  middleName: optionalName(100),
  phone: phone("Enter a valid Nigerian phone number, e.g. 08012345678"),
  socialMedia: optionalText(300),
  nextOfKin: name(100),
  nextOfKinPhone: phone(
    "Enter a valid Nigerian phone number for your next of kin",
  ),

  // Step 2 — Identity & Origin (LGA and Ward are locked, derived from the
  // VIN lookup — not part of the editable schema, same as NIN/VIN)
  village: placeName(100),
  residenceState: oneOf(NIGERIAN_STATES, "Select your state of residence"),
  city: placeName(100),
  address: z
    .string()
    .trim()
    .min(1, "Home address is required")
    .max(300, "Keep this under 300 characters"),

  // Step 3 — Education & background
  education: oneOf(EDUCATION_LEVELS, "Select your highest qualification"),
  institution: optionalText(150),
  occupation: placeName(100),
  talents: z
    .string()
    .trim()
    .min(1, "Please share at least one talent")
    .max(300, "Keep this under 300 characters"),
  languages: z
    .string()
    .trim()
    .min(1, "Please list the languages you speak")
    .max(300, "Keep this under 300 characters"),

  // Step 4 — Your story & declarations
  initiative: optionalText(1000),
  why: z
    .string()
    .trim()
    .min(1, "This field is required")
    .max(3000, "Keep this under 3000 characters")
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
  // Video Pitch — validated separately (recorded, not a form field).
  [],
  ["why", "declarationIdentity", "declarationAccuracy", "declarationTerms"],
];
