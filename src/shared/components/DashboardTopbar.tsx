import { Menu } from "lucide-react";
import { useAuth } from "@/features/auth";
import { Avatar, AvatarFallback } from "@/shared/ui";
import { ThemeToggle } from "./ThemeToggle";
import {
  TopbarFrame,
  MenuToggle,
  Title,
  UserCluster,
  UserMeta,
  UserName,
  UserReference,
} from "./DashboardTopbar.styles";

export interface DashboardTopbarProps {
  title: string;
  referenceCode?: string;
  onOpenSidebar: () => void;
}

export function DashboardTopbar({
  title,
  referenceCode,
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
      <UserCluster>
        <ThemeToggle />
        <Avatar>
          <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>
        {user && (
          <UserMeta>
            <UserName>
              {user.firstName} {user.lastName}
            </UserName>
            {referenceCode && <UserReference>{referenceCode}</UserReference>}
          </UserMeta>
        )}
      </UserCluster>
    </TopbarFrame>
  );
}
