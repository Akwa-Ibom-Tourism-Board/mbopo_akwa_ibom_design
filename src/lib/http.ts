import { API_BASE_URL } from "./config";

export class ApiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

// Thin fetch wrapper for a future real backend. No feature calls this yet —
// every feature's api/index.ts currently re-exports its mock.ts module.
// Swapping a feature to a real backend means editing that one index.ts to
// call `request(...)` instead, with no change to the feature's components.
export async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: { "Content-Type": "application/json", ...init?.headers },
    ...init,
  });

  if (!response.ok) {
    const body = await response.json().catch(() => undefined);
    throw new ApiError(body?.message ?? response.statusText, response.status);
  }

  if (response.status === 204) return undefined as T;
  return (await response.json()) as T;
}
