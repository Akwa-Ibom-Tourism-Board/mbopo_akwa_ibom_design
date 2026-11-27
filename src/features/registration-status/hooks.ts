import { useQuery } from "@tanstack/react-query";
import { getRegistrationStatus } from "./api";

// This changes rarely (an admin flips it by hand) and is read on nearly
// every public page (Navbar, the banner, /register) — a minute-long
// staleTime avoids refetching it on every navigation while still picking
// up a change within a reasonable window.
export function useRegistrationStatus() {
  return useQuery({
    queryKey: ["registration-status"],
    queryFn: getRegistrationStatus,
    staleTime: 60_000,
  });
}
