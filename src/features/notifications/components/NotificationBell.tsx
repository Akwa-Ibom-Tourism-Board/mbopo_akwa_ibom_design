import { Bell } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "@/shared/ui";
import { useAuth } from "@/features/auth";
import { listNotifications, markAsRead, markAllAsRead } from "../api";
import {
  BellButton,
  UnreadDot,
  Panel,
  PanelHeader,
  PanelTitle,
  MarkAllButton,
  List,
  Row,
  RowDot,
  RowBody,
  RowTitle,
  RowText,
  RowTime,
  EmptyState,
  ShowAllLink,
} from "./NotificationBell.styles";

const NOTIFICATIONS_QUERY_KEY = ["notifications"] as const;

export function NotificationBell() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const notificationsQuery = useQuery({
    queryKey: [...NOTIFICATIONS_QUERY_KEY, user?.id],
    queryFn: () => listNotifications(user!.id),
    enabled: Boolean(user),
    staleTime: 30_000,
  });

  const notifications = notificationsQuery.data ?? [];
  const unreadCount = notifications.filter((item) => !item.read).length;

  const invalidate = () =>
    queryClient.invalidateQueries({ queryKey: NOTIFICATIONS_QUERY_KEY });

  const markReadMutation = useMutation({
    mutationFn: (notificationId: string) =>
      markAsRead(user!.id, notificationId),
    onSuccess: invalidate,
  });

  const markAllMutation = useMutation({
    mutationFn: () => markAllAsRead(user!.id),
    onSuccess: invalidate,
  });

  return (
    <DropdownMenu onOpenChange={(open) => open && notificationsQuery.refetch()}>
      <DropdownMenuTrigger asChild>
        <BellButton type="button" aria-label="Notifications">
          <Bell size={19} />
          {unreadCount > 0 && <UnreadDot />}
        </BellButton>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <Panel>
          <PanelHeader>
            <PanelTitle>Notifications</PanelTitle>
            <MarkAllButton
              type="button"
              disabled={unreadCount === 0 || markAllMutation.isPending}
              onClick={() => markAllMutation.mutate()}
            >
              Mark all read
            </MarkAllButton>
          </PanelHeader>

          {notifications.length === 0 ? (
            <EmptyState>
              {notificationsQuery.isLoading
                ? "Loading…"
                : "No notifications yet."}
            </EmptyState>
          ) : (
            <List>
              {notifications.slice(0, 6).map((notification) => (
                <Row
                  key={notification.id}
                  type="button"
                  $read={notification.read}
                  onClick={() =>
                    !notification.read &&
                    markReadMutation.mutate(notification.id)
                  }
                >
                  <RowDot $read={notification.read} />
                  <RowBody>
                    <RowTitle>{notification.title}</RowTitle>
                    <RowText>{notification.body}</RowText>
                    <RowTime>
                      {formatDistanceToNow(new Date(notification.createdAt), {
                        addSuffix: true,
                      })}
                    </RowTime>
                  </RowBody>
                </Row>
              ))}
            </List>
          )}

          <ShowAllLink to="/notifications">Show all notifications</ShowAllLink>
        </Panel>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
