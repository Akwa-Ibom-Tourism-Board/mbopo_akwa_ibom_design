import { localStore, STORAGE_KEYS } from "./storage";

// Mirrors the real backend's Notification model (mbopo_akwa_ibom_backend
// src/notifications/Notification.ts) — same fields, same triggers (see
// verify-email/api/mock.ts and mbopo-registration/api/mock.ts), so swapping
// this feature's api/index.ts over to a real request() later is a
// same-shape change.
export type NotificationType = "account" | "application" | "system";

export interface MockNotificationRecord {
  id: string;
  userId: string;
  title: string;
  body: string;
  type: NotificationType;
  read: boolean;
  createdAt: string; // ISO
}

function readAll(): MockNotificationRecord[] {
  return (
    localStore.get<MockNotificationRecord[]>(
      STORAGE_KEYS.mockNotificationsDb,
    ) ?? []
  );
}

function writeAll(records: MockNotificationRecord[]): void {
  localStore.set(STORAGE_KEYS.mockNotificationsDb, records);
}

export interface CreateNotificationInput {
  userId: string;
  title: string;
  body: string;
  type?: NotificationType;
}

export function createNotification(
  input: CreateNotificationInput,
): MockNotificationRecord {
  const record: MockNotificationRecord = {
    id: `notif_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
    userId: input.userId,
    title: input.title,
    body: input.body,
    type: input.type ?? "system",
    read: false,
    createdAt: new Date().toISOString(),
  };
  writeAll([record, ...readAll()]);
  return record;
}

export function listNotificationsForUser(
  userId: string,
): MockNotificationRecord[] {
  return readAll()
    .filter((record) => record.userId === userId)
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export function countUnreadForUser(userId: string): number {
  return readAll().filter((record) => record.userId === userId && !record.read)
    .length;
}

export function markNotificationRead(
  userId: string,
  notificationId: string,
): boolean {
  const all = readAll();
  let found = false;
  writeAll(
    all.map((record) => {
      if (record.id !== notificationId || record.userId !== userId)
        return record;
      found = true;
      return { ...record, read: true };
    }),
  );
  return found;
}

export function markAllNotificationsRead(userId: string): number {
  const all = readAll();
  let updated = 0;
  writeAll(
    all.map((record) => {
      if (record.userId !== userId || record.read) return record;
      updated += 1;
      return { ...record, read: true };
    }),
  );
  return updated;
}
