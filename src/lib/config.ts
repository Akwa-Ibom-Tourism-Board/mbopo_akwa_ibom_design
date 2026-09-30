// Central place a future real backend integration reads its base URL from.
// Every feature's mock api/ module is deliberately blind to these — they
// never import config.ts — so flipping USE_MOCKS off only matters once a
// feature's api/index.ts is rewritten to call lib/http.ts instead of mock.ts.
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "";
export const USE_MOCKS = import.meta.env.VITE_USE_MOCKS !== "false";

// Google reCAPTCHA v2 site key (public by design; the matching secret key
// stays server-side only, never in frontend code). See .env.example.
export const RECAPTCHA_SITE_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY ?? "";

// Cloudinary — both public by design, the same way the reCAPTCHA site key
// is: this unsigned-preset upload flow never touches the account's API
// secret, which stays backend-only. See lib/cloudinary.ts and
// .env.example for the full setup this pairs with.
export const CLOUDINARY_CLOUD_NAME =
  import.meta.env.VITE_CLOUDINARY_CLOUD_NAME ?? "";
export const CLOUDINARY_UPLOAD_PRESET =
  import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET ?? "";
