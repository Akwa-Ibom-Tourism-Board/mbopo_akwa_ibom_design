// Shared helpers every feature's api/mock.ts uses to feel like a real
// network call: a realistic latency window, and an opt-in random failure
// rate for exercising error states during development.
export function delay(ms = 900, jitter = 400): Promise<void> {
  const wait = ms + Math.random() * jitter;
  return new Promise((resolve) => setTimeout(resolve, wait));
}

export function maybeFail(
  rate = 0,
  message = "Something went wrong. Please try again.",
): void {
  if (rate > 0 && Math.random() < rate) {
    throw new Error(message);
  }
}
