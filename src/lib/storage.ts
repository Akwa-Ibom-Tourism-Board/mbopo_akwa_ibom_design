// Typed, JSON-safe wrappers around localStorage/sessionStorage. Every
// client-side session value the app keeps (tokens, the cached user,
// pending-verification state) is keyed through here so the storage keys
// live in one place instead of being repeated as string literals across
// features.
export const STORAGE_KEYS = {
  authToken: "mbopo-auth-token",
  authRefreshToken: "mbopo-auth-refresh-token",
  authUser: "mbopo-auth-user",
  pendingRegistration: "mbopo-pending-registration",
  themeMode: "mbopo-theme-mode",
} as const;

function readStorage<T>(storage: Storage, key: string): T | undefined {
  try {
    const raw = storage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : undefined;
  } catch {
    return undefined;
  }
}

function writeStorage<T>(storage: Storage, key: string, value: T): void {
  try {
    storage.setItem(key, JSON.stringify(value));
  } catch {
    // Storage can be unavailable (private mode, quota) — the app degrades
    // to in-memory-only state for that session rather than crashing.
  }
}

export const localStore = {
  get: <T>(key: string) => readStorage<T>(window.localStorage, key),
  set: <T>(key: string, value: T) =>
    writeStorage(window.localStorage, key, value),
  remove: (key: string) => window.localStorage.removeItem(key),
};

export const sessionStore = {
  get: <T>(key: string) => readStorage<T>(window.sessionStorage, key),
  set: <T>(key: string, value: T) =>
    writeStorage(window.sessionStorage, key, value),
  remove: (key: string) => window.sessionStorage.removeItem(key),
};
