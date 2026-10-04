import { API_BASE_URL } from "./config";
import { localStore, STORAGE_KEYS } from "./storage";

export class ApiError extends Error {
  status: number;
  // Per-field Joi messages, when the backend's validate() middleware is
  // what rejected the request — see validate.ts's respondWithErrors.
  errors?: string[];
  // Whatever the backend put in the envelope's `data` alongside an error
  // status — e.g. verify-identity.service.ts's 422 ineligible response
  // carries `{ reasons: string[] }` here, not in `errors`.
  data?: unknown;

  constructor(
    message: string,
    status: number,
    errors?: string[],
    data?: unknown,
  ) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.errors = errors;
    this.data = data;
  }
}

interface ApiEnvelope<T> {
  status: "success" | "error";
  message: string;
  data?: T;
  errors?: string[];
}

// Every authenticated request carries both tokens unconditionally — the
// backend's authenticate middleware only actually reads x-refresh-token
// when the access token has already expired, so sending it unused on every
// other request is harmless and avoids decoding the JWT client-side just
// to predict when it's about to expire.
function getStoredTokens() {
  return {
    accessToken: localStore.get<string>(STORAGE_KEYS.authToken),
    refreshToken: localStore.get<string>(STORAGE_KEYS.authRefreshToken),
  };
}

// A refresh that happens inside authenticate.ts rotates both tokens and
// hands the new ones back on these two response headers (see that
// middleware, and app.ts's cors() exposedHeaders) — store them immediately
// so the next request already uses the refreshed pair instead of the one
// that just expired.
function captureRotatedTokens(response: Response): void {
  const nextAccessToken = response.headers.get("x-access-token");
  const nextRefreshToken = response.headers.get("x-refresh-token");
  if (nextAccessToken) localStore.set(STORAGE_KEYS.authToken, nextAccessToken);
  if (nextRefreshToken) {
    localStore.set(STORAGE_KEYS.authRefreshToken, nextRefreshToken);
  }
}

export async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const { accessToken, refreshToken } = getStoredTokens();

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(init?.headers as Record<string, string> | undefined),
  };
  if (accessToken) headers.Authorization = `Bearer ${accessToken}`;
  if (refreshToken) headers["x-refresh-token"] = refreshToken;

  const response = await fetch(`${API_BASE_URL}${path}`, { ...init, headers });

  captureRotatedTokens(response);

  if (response.status === 204) return undefined as T;

  const body = (await response.json().catch(() => undefined)) as
    ApiEnvelope<T> | undefined;

  if (!response.ok) {
    throw new ApiError(
      body?.message ?? response.statusText,
      response.status,
      body?.errors,
      body?.data,
    );
  }

  return body?.data as T;
}

// The backend marks every deliberate rejection it throws (wrong password,
// duplicate email, a business rule like the video-pitch lock) as
// `isOperational: true` and gives it a status below 500 with a message
// that's already safe to show verbatim — see its error-handler.ts. A 5xx,
// or anything that wasn't even an ApiError (a network failure, a bad
// response body), isn't something the backend wrote for a user to read,
// so those fall back to a generic message instead.
export function friendlyMessage(
  error: unknown,
  fallback = "Something went wrong. Please try again.",
): string {
  return error instanceof ApiError && error.status < 500
    ? error.message
    : fallback;
}
