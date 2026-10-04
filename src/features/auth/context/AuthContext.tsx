import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { localStore, STORAGE_KEYS } from "@/lib/storage";
import { getCurrentUser, logout as logoutRequest } from "../api";
import type { Session, User } from "../types";

export type AuthStatus = "restoring" | "authenticated" | "anonymous";

interface AuthContextValue {
  status: AuthStatus;
  user: User | undefined;
  isAuthenticated: boolean;
  login: (session: Session) => void;
  logout: () => void;
  // Patches the cached user in place (e.g. after an avatar upload) without
  // a full session round-trip.
  updateUser: (patch: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const SESSION_QUERY_KEY = ["auth", "me"] as const;

export function AuthProvider({ children }: { children: ReactNode }) {
  const queryClient = useQueryClient();
  const [token, setToken] = useState<string | undefined>(() =>
    localStore.get<string>(STORAGE_KEYS.authToken),
  );

  const sessionQuery = useQuery({
    queryKey: [...SESSION_QUERY_KEY, token],
    queryFn: getCurrentUser,
    enabled: Boolean(token),
    initialData: () =>
      token ? localStore.get<User>(STORAGE_KEYS.authUser) : undefined,
    retry: false,
    staleTime: 60_000,
  });

  const logout = useCallback(() => {
    // Best-effort — invalidates the refresh token server-side, but a
    // network failure here must never block logging out locally; the
    // user's own intent to leave shouldn't depend on connectivity.
    void logoutRequest().catch(() => {});
    localStore.remove(STORAGE_KEYS.authToken);
    localStore.remove(STORAGE_KEYS.authRefreshToken);
    localStore.remove(STORAGE_KEYS.authUser);
    queryClient.removeQueries({ queryKey: SESSION_QUERY_KEY });
    setToken(undefined);
  }, [queryClient]);

  const login = useCallback(
    (session: Session) => {
      localStore.set(STORAGE_KEYS.authToken, session.token);
      localStore.set(STORAGE_KEYS.authRefreshToken, session.refreshToken);
      localStore.set(STORAGE_KEYS.authUser, session.user);
      queryClient.setQueryData(
        [...SESSION_QUERY_KEY, session.token],
        session.user,
      );
      setToken(session.token);
    },
    [queryClient],
  );

  const updateUser = useCallback(
    (patch: Partial<User>) => {
      if (!token) return;
      queryClient.setQueryData<User>(
        [...SESSION_QUERY_KEY, token],
        (current) => {
          if (!current) return current;
          const next = { ...current, ...patch };
          localStore.set(STORAGE_KEYS.authUser, next);
          return next;
        },
      );
    },
    [queryClient, token],
  );

  // A stored token that fails validation (expired/revoked, or the refresh
  // token that would have saved it is itself invalid — see lib/http.ts)
  // means the cached session was stale — fall back to anonymous rather
  // than getting stuck showing a dead "restoring" state.
  useEffect(() => {
    if (token && sessionQuery.isError) {
      logout();
    }
  }, [token, sessionQuery.isError, logout]);

  const status: AuthStatus = !token
    ? "anonymous"
    : sessionQuery.data
      ? "authenticated"
      : sessionQuery.isError
        ? "anonymous"
        : "restoring";

  const value = useMemo<AuthContextValue>(
    () => ({
      status,
      user: sessionQuery.data,
      isAuthenticated: status === "authenticated",
      login,
      logout,
      updateUser,
    }),
    [status, sessionQuery.data, login, logout, updateUser],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
