import { useEffect } from "react";
import { Bell, CheckCircle2, FileText } from "lucide-react";
import { format } from "date-fns";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { DashboardShell } from "@/shared/components";
import { useAuth } from "@/features/auth";
import { listNotifications, markAsRead, markAllAsRead } from "../api";
import {
  Stack,
  HeaderRow,
  HeaderCopy,
  MarkAllButton,
  List,
  Item,
  ItemIconFrame,
  ItemBody,
  ItemTitleRow,
  ItemTitle,
  UnreadDot,
  ItemText,
  ItemTime,
  EmptyState,
} from "./NotificationsPage.styles";

const NOTIFICATIONS_QUERY_KEY = ["notifications"] as const;

export function NotificationsPage() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  useEffect(() => {
    document.title = "Notifications | Mbopo Akwa Ibom";
  }, []);

  const notificationsQuery = useQuery({
    queryKey: [...NOTIFICATIONS_QUERY_KEY, user?.id],
    queryFn: listNotifications,
    enabled: Boolean(user),
  });

  const invalidate = () =>
    queryClient.invalidateQueries({ queryKey: NOTIFICATIONS_QUERY_KEY });

  const markReadMutation = useMutation({
    mutationFn: markAsRead,
    onSuccess: invalidate,
  });

  const markAllMutation = useMutation({
    mutationFn: markAllAsRead,
    onSuccess: invalidate,
  });

  if (!user) return null;

  const notifications = notificationsQuery.data ?? [];
  const unreadCount = notifications.filter((item) => !item.read).length;

  return (
    <DashboardShell title="Notifications">
      <Stack>
        <HeaderRow>
          <HeaderCopy>
            {unreadCount > 0
              ? `You have ${unreadCount} unread notification${unreadCount === 1 ? "" : "s"}.`
              : "You're all caught up."}
          </HeaderCopy>
          <MarkAllButton
            type="button"
            disabled={unreadCount === 0 || markAllMutation.isPending}
            onClick={() => markAllMutation.mutate()}
          >
            Mark all as read
          </MarkAllButton>
        </HeaderRow>

        {notifications.length === 0 ? (
          <EmptyState>
            {notificationsQuery.isLoading
              ? "Loading your notifications…"
              : "Nothing here yet. We'll let you know when there's an update on your application."}
          </EmptyState>
        ) : (
          <List>
            {notifications.map((notification) => (
              <Item
                key={notification.id}
                type="button"
                $read={notification.read}
                onClick={() =>
                  !notification.read && markReadMutation.mutate(notification.id)
                }
              >
                <ItemIconFrame $type={notification.type}>
                  {notification.type === "application" ? (
                    <FileText size={17} />
                  ) : notification.type === "account" ? (
                    <CheckCircle2 size={17} />
                  ) : (
                    <Bell size={17} />
                  )}
                </ItemIconFrame>
                <ItemBody>
                  <ItemTitleRow>
                    <ItemTitle>{notification.title}</ItemTitle>
                    {!notification.read && <UnreadDot />}
                  </ItemTitleRow>
                  <ItemText>{notification.body}</ItemText>
                  <ItemTime>
                    {format(
                      new Date(notification.createdAt),
                      "d MMMM yyyy · h:mm a",
                    )}
                  </ItemTime>
                </ItemBody>
              </Item>
            ))}
          </List>
        )}
      </Stack>
    </DashboardShell>
  );
}
