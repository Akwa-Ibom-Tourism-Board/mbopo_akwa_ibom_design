export const REGISTRATION_STEPS = [
  "Personal",
  "Identity & Origin",
  "Education",
  "Pitch",
  "Your Story",
] as const;

export const VIDEO_PITCH_MAX_SECONDS = 30;

// Hard cap on the recorded file itself — a large video is what made
// submit feel slow (the file has to actually reach Cloudinary before
// submit can finish). useVideoRecorder's MediaRecorder bitrate settings
// are tuned to stay well under this even at the full 30 seconds; this is
// the backstop in case a given browser/device doesn't honor that hint.
export const VIDEO_PITCH_MAX_BYTES = 10 * 1024 * 1024;

export const EDUCATION_LEVELS = [
  "HND",
  "Bachelor's Degree",
  "Master's Degree",
  "PhD",
] as const;

// The 36 states of Nigeria plus the Federal Capital Territory, for the
// "State of residence" field.
export const NIGERIAN_STATES = [
  "Abia",
  "Adamawa",
  "Akwa Ibom",
  "Anambra",
  "Bauchi",
  "Bayelsa",
  "Benue",
  "Borno",
  "Cross River",
  "Delta",
  "Ebonyi",
  "Edo",
  "Ekiti",
  "Enugu",
  "Federal Capital Territory",
  "Gombe",
  "Imo",
  "Jigawa",
  "Kaduna",
  "Kano",
  "Katsina",
  "Kebbi",
  "Kogi",
  "Kwara",
  "Lagos",
  "Nasarawa",
  "Niger",
  "Ogun",
  "Ondo",
  "Osun",
  "Oyo",
  "Plateau",
  "Rivers",
  "Sokoto",
  "Taraba",
  "Yobe",
  "Zamfara",
] as const;

export const MINIMUM_STORY_WORDS = 10;
export const MAXIMUM_STORY_WORDS = 300;

// The 31 Local Government Areas of Akwa Ibom State — mirrors the
// backend's own AKWA_IBOM_LGAS exactly (src/configurations/constants.ts
// in the backend repo). Deliberately no "Other" here: this is a closed,
// fixed list of real LGAs, not a free-text-escape-hatch field like
// Occupation/Institution below.
export const AKWA_IBOM_LGAS = [
  "Abak",
  "Eastern Obolo",
  "Eket",
  "Esit Eket",
  "Essien Udim",
  "Etim Ekpo",
  "Etinan",
  "Ibeno",
  "Ibesikpo Asutan",
  "Ibiono Ibom",
  "Ika",
  "Ikono",
  "Ikot Abasi",
  "Ikot Ekpene",
  "Ini",
  "Itu",
  "Mbo",
  "Mkpat Enin",
  "Nsit Atai",
  "Nsit Ibom",
  "Nsit Ubium",
  "Obot Akara",
  "Okobo",
  "Onna",
  "Oron",
  "Oruk Anam",
  "Udung Uko",
  "Ukanafun",
  "Uruan",
  "Urue-Offong/Oruko",
  "Uyo",
] as const;

// Deliberately not exhaustive — paired with an "Other" option in
// EducationStep that reveals a free-text input (sanitized and sentence-
// cased the same as any other free-text field — see schema.ts) for
// anything not listed here.
export const OCCUPATIONS = [
  "Student",
  "NYSC Corps Member",
  "Entrepreneur / Business Owner",
  "Civil Servant",
  "Teacher / Educator",
  "Banker / Finance Professional",
  "Accountant",
  "Medical Doctor",
  "Nurse / Healthcare Worker",
  "Pharmacist",
  "Lawyer",
  "Engineer",
  "Software Developer / IT Professional",
  "Architect",
  "Fashion Designer",
  "Make-up Artist",
  "Hair Stylist",
  "Caterer / Chef",
  "Event Planner",
  "Content Creator / Influencer",
  "Model",
  "Actress / Performing Artist",
  "Musician",
  "Journalist / Media Professional",
  "Marketing / PR Professional",
  "Real Estate Professional",
  "Agripreneur / Farmer",
  "Public Servant / Government Worker",
  "Unemployed",
  "Other",
] as const;
