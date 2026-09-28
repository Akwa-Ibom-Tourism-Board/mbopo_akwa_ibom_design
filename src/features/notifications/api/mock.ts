import { delay } from "@/lib/mockDelay";
import {
  listNotificationsForUser,
  countUnreadForUser,
  markNotificationRead,
  markAllNotificationsRead,
} from "@/lib/mockNotificationsStore";
import type { AppNotification } from "../types";

function toPublic(record: {
  id: string;
  title: string;
  body: string;
  type: AppNotification["type"];
  read: boolean;
  createdAt: string;
}): AppNotification {
  return {
    id: record.id,
    title: record.title,
    body: record.body,
    type: record.type,
    read: record.read,
    createdAt: record.createdAt,
  };
}

export async function listNotifications(
  userId: string,
): Promise<AppNotification[]> {
  await delay(400, 200);
  return listNotificationsForUser(userId).map(toPublic);
}

export async function getUnreadCount(userId: string): Promise<number> {
  await delay(200, 100);
  return countUnreadForUser(userId);
}

export async function markAsRead(
  userId: string,
  notificationId: string,
): Promise<void> {
  await delay(200, 100);
  markNotificationRead(userId, notificationId);
}

export async function markAllAsRead(userId: string): Promise<void> {
  await delay(300, 150);
  markAllNotificationsRead(userId);
}
