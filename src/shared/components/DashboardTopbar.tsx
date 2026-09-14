import { Menu } from "lucide-react";
import { useAuth } from "@/features/auth";
import { Avatar, AvatarFallback } from "@/shared/ui";
import { ThemeToggle } from "./ThemeToggle";
import {
  TopbarFrame,
  MenuToggle,
  Title,
  UserCluster,
  UserName,
} from "./DashboardTopbar.styles";

export interface DashboardTopbarProps {
  title: string;
  onOpenSidebar: () => void;
}

export function DashboardTopbar({
  title,
  onOpenSidebar,
}: DashboardTopbarProps) {
  const { user } = useAuth();
  const initials = user
    ? `${user.firstName[0] ?? ""}${user.lastName[0] ?? ""}`.toUpperCase()
    : "";

  return (
    <TopbarFrame>
      <MenuToggle type="button" aria-label="Open menu" onClick={onOpenSidebar}>
        <Menu size={20} />
      </MenuToggle>
      <Title>{title}</Title>
      {/* <ThemeToggle /> */}
      <UserCluster>
        <Avatar>
          <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>
        {user && (
          <UserName>
            {user.firstName} {user.lastName}
          </UserName>
        )}
      </UserCluster>
    </TopbarFrame>
  );
}
