import { request } from "@/lib/http";
import type { AskMeInput } from "../types";

// POST /messages — not built on the backend yet. See the Message model /
// endpoint spec handed to the backend alongside this feature. Public
// (no auth), so http.ts's token attachment is simply a no-op here for an
// anonymous visitor and harmless for a logged-in one.
export async function submitMessage(input: AskMeInput): Promise<void> {
  await request<void>("/messages", {
    method: "POST",
    body: JSON.stringify(input),
  });
}
