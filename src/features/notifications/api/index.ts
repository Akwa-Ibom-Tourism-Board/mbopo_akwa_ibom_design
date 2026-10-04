import { request } from "@/lib/http";
import type { AppNotification } from "../types";

interface ListNotificationsResponse {
  notifications: AppNotification[];
  page: number;
  limit: number;
  total: number;
  hasMore: boolean;
}

// Paginated on the backend (20/page, 50 max) — unwrapped to a flat list
// here since nothing in the UI paginates yet; worth revisiting if a
// single applicant's notification history ever meaningfully exceeds one
// page.
export async function listNotifications(): Promise<AppNotification[]> {
  const result = await request<ListNotificationsResponse>("/notifications");
  return result.notifications;
}

export async function getUnreadCount(): Promise<number> {
  const result = await request<{ count: number }>(
    "/notifications/unread-count",
  );
  return result.count;
}

export async function markAsRead(notificationId: string): Promise<void> {
  await request<void>(`/notifications/${notificationId}/read`, {
    method: "PATCH",
  });
}

export async function markAllAsRead(): Promise<void> {
  await request<void>("/notifications/read-all", { method: "PATCH" });
}
