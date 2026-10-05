import { z } from "zod";
import {
  MINIMUM_STORY_WORDS,
  MAXIMUM_STORY_WORDS,
  EDUCATION_LEVELS,
  NIGERIAN_STATES,
  AKWA_IBOM_LGAS,
  OCCUPATIONS,
} from "./constants";
import { NIGERIAN_INSTITUTIONS } from "./data/institutions";
import {
  NIGERIAN_PHONE_REGEX,
  PHONE_MESSAGE,
  NAME_REGEX,
  NAME_MESSAGE,
  CONTAINS_LETTER_REGEX,
  CONTAINS_LETTER_MESSAGE,
  toSentenceCase,
} from "@/lib/validation";

const wordCount = (value: string) =>
  value.trim().split(/\s+/).filter(Boolean).length;

const name = (max: number) =>
  z
    .string()
    .trim()
    .max(max, `Keep this under ${max} characters`)
    .regex(NAME_REGEX, NAME_MESSAGE)
    .transform(toSentenceCase);

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
    .or(z.literal(""))
    .transform(toSentenceCase);

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
    .regex(CONTAINS_LETTER_REGEX, CONTAINS_LETTER_MESSAGE)
    .transform(toSentenceCase);

// A plain string whitelisted against a fixed options list, rather than
// z.enum(...) directly — z.enum rejects "" outright and (with a narrowing
// refine) infers the strict literal union as the field's type everywhere,
// including defaultValues, where a not-yet-chosen Select/Combobox has to
// start at "". A plain boolean refine keeps the field typed as string
// (fine — the dropdown's onValueChange already only ever passes a real
// option in) while still failing validation at parse time until a real
// option is picked.
const oneOf = (options: readonly string[], message: string) =>
  z.string().refine((value) => options.includes(value), { message });

// Same idea, but "" is also a valid (not-yet-chosen) value — used for
// Institution, which is optional overall, unlike the required dropdowns
// above.
const oneOfOptional = (options: readonly string[], message: string) =>
  z
    .string()
    .refine((value) => value === "" || options.includes(value), { message });

const INSTITUTION_OPTIONS = [...NIGERIAN_INSTITUTIONS, "Other"];

export const registrationSchema = z
  .object({
    // Step 1 — Personal (editable fields only; identity is locked from the account)
    middleName: optionalName(100),
    phone: phone("Enter a valid Nigerian phone number, e.g. 08012345678"),
    socialMedia: optionalText(300),
    nextOfKin: name(100),
    nextOfKinPhone: phone(
      "Enter a valid Nigerian phone number for your next of kin",
    ),

    // Step 2 — Identity & Origin. Local Government of Origin is now picked
    // by the applicant from the fixed 31-LGA list (no longer derived from
    // a VIN lookup, and no "Other" — it's a closed list of real LGAs).
    // Ward has been removed from the product entirely.
    village: placeName(100),
    localGovernment: oneOf(
      AKWA_IBOM_LGAS,
      "Select your Local Government Area of origin",
    ),
    residenceState: oneOf(NIGERIAN_STATES, "Select your state of residence"),
    city: placeName(100),
    address: z
      .string()
      .trim()
      .min(1, "Home address is required")
      .max(300, "Keep this under 300 characters")
      .transform(toSentenceCase),

    // Step 3 — Education & background
    education: oneOf(EDUCATION_LEVELS, "Select your highest qualification"),
    institution: oneOfOptional(
      INSTITUTION_OPTIONS,
      "Select a valid institution",
    ),
    // Only meaningful (and required) when institution === "Other" — see the
    // cross-field refine below.
    institutionOther: optionalText(150).transform(toSentenceCase),
    occupation: oneOf(OCCUPATIONS, "Select your occupation"),
    // Only meaningful (and required) when occupation === "Other".
    occupationOther: optionalText(100).transform(toSentenceCase),
    talents: z
      .string()
      .trim()
      .min(1, "Please share at least one talent")
      .max(300, "Keep this under 300 characters")
      .transform(toSentenceCase),
    languages: z
      .string()
      .trim()
      .min(1, "Please list the languages you speak")
      .max(300, "Keep this under 300 characters")
      .transform(toSentenceCase),

    // Step 4 — Your story, VIN & declarations. Unlike NIN (verified as
    // part of the very first step), VIN is only verified when the whole
    // application is finally submitted — see submit's handling of
    // "VIN not found" vs. a name mismatch (the latter doesn't block
    // submission, it's just recorded for judges) in FIX_ME.md on the
    // backend. This field is still draft-saveable like any other text
    // field; saving a draft never itself calls out to DVP.
    vin: z
      .string()
      .trim()
      .toUpperCase()
      .length(19, "Your VIN must be exactly 19 characters")
      .regex(/^[A-Z0-9]+$/, "Your VIN can only contain letters and digits"),
    initiative: optionalText(1000).transform(toSentenceCase),
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
      })
      .transform(toSentenceCase),
    declarationIdentity: z
      .boolean()
      .refine((value) => value, "Please confirm this declaration."),
    declarationAccuracy: z
      .boolean()
      .refine((value) => value, "Please confirm this declaration."),
    declarationTerms: z
      .boolean()
      .refine((value) => value, "Please accept the terms."),
  })
  .refine(
    (data) =>
      data.occupation !== "Other" || data.occupationOther.trim().length > 0,
    {
      message: "Please specify your occupation",
      path: ["occupationOther"],
    },
  )
  .refine(
    (data) =>
      data.institution !== "Other" || data.institutionOther.trim().length > 0,
    {
      message: "Please specify your institution",
      path: ["institutionOther"],
    },
  );

export type RegistrationFormValues = z.infer<typeof registrationSchema>;

export const DEFAULT_REGISTRATION_FORM_VALUES: RegistrationFormValues = {
  middleName: "",
  phone: "",
  socialMedia: "",
  nextOfKin: "",
  nextOfKinPhone: "",
  village: "",
  localGovernment: "",
  residenceState: "",
  city: "",
  address: "",
  education: "",
  institution: "",
  institutionOther: "",
  occupation: "",
  occupationOther: "",
  talents: "",
  languages: "",
  vin: "",
  initiative: "",
  why: "",
  declarationIdentity: false,
  declarationAccuracy: false,
  declarationTerms: false,
};

export const STEP_FIELDS: (keyof RegistrationFormValues)[][] = [
  ["phone", "nextOfKin", "nextOfKinPhone"],
  ["village", "localGovernment", "residenceState", "city", "address"],
  [
    "education",
    "occupation",
    "occupationOther",
    "institution",
    "institutionOther",
    "talents",
    "languages",
  ],
  // Pitch — validated separately (recorded/uploaded, not a form field).
  [],
  [
    "why",
    "vin",
    "declarationIdentity",
    "declarationAccuracy",
    "declarationTerms",
  ],
];
