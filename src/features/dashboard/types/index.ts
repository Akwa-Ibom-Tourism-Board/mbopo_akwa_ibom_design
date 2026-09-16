import type { User } from "@/features/auth";

export interface DashboardSummary {
  user: User;
  memberSince: string; // ISO date
  referenceCode?: string;
  hasDraft: boolean;
}
