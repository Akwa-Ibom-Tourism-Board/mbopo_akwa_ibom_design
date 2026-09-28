// A ~1-minute recorded video is far too large to persist as a data URL in
// localStorage the way photos are (see photoEncoding.ts) — so, mock-only,
// this just holds the Blob and an object URL in memory for the lifetime of
// the tab. It's lost on reload, which is fine for exercising the UI: a real
// backend would receive the recording as its own multipart upload (same
// shape as the photo/certificate uploads), not a data URL either.
const videoBlobsByUserId = new Map<string, { blob: Blob; objectUrl: string }>();

export function saveVideoPitch(userId: string, blob: Blob): string {
  const existing = videoBlobsByUserId.get(userId);
  if (existing) URL.revokeObjectURL(existing.objectUrl);

  const objectUrl = URL.createObjectURL(blob);
  videoBlobsByUserId.set(userId, { blob, objectUrl });
  return objectUrl;
}

export function getVideoPitchUrl(userId: string): string | undefined {
  return videoBlobsByUserId.get(userId)?.objectUrl;
}
