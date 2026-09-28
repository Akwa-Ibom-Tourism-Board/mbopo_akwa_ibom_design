// Public contract for the notifications feature. Swapping to the real
// backend (GET /notifications, GET /notifications/unread-count, PATCH
// /notifications/:id/read, PATCH /notifications/read-all — see
// mbopo_akwa_ibom_backend/src/notifications/) means rewriting the bodies
// below to call `@/lib/http`'s `request(...)` instead of `./mock`.
export {
  listNotifications,
  getUnreadCount,
  markAsRead,
  markAllAsRead,
} from "./mock";
