export const REGISTRATION_STEPS = [
  "Personal",
  "Identity & Origin",
  "Education",
  "Video Pitch",
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
