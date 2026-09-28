export type NotificationType = "account" | "application" | "system";

export interface AppNotification {
  id: string;
  title: string;
  body: string;
  type: NotificationType;
  read: boolean;
  createdAt: string; // ISO
}
