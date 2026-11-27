import { request } from "@/lib/http";

export type RegistrationStatus = "open" | "new_intake_closed" | "closed";

// Entirely unauthenticated — mirrors the backend's own
// src/registration/registration-status.routes.ts.
export async function getRegistrationStatus(): Promise<{
  status: RegistrationStatus;
}> {
  return request("/registration-status");
}
