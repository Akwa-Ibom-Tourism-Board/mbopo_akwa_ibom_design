// The backend mounts every route under /api/v1 (see its src/app.ts) — this
// must include that prefix, e.g. http://localhost:4000/api/v1 in dev.
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "";

// Google reCAPTCHA v2 site key (public by design; the matching secret key
// stays server-side only, never in frontend code). See .env.example.
export const RECAPTCHA_SITE_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY ?? "";

// Nothing Cloudinary-related belongs here any more: every upload is signed
// by the backend (see lib/cloudinary.ts and POST
// /uploads/cloudinary-signature), which hands back the cloud name along
// with the signature itself — there's no preset, secret, or cloud name to
// configure on the frontend at all.
