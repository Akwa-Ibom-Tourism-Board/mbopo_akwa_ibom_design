import { useState } from "react";
import { ChevronDown, LogOut, Menu, User as UserIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/features/auth";
import { NotificationBell } from "@/features/notifications";
import { DisclaimerStrip } from "./DisclaimerStrip";
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
  Button,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/shared/ui";
import {
  TopbarFrame,
  TopbarRow,
  MenuToggle,
  Title,
  RightCluster,
  ProfileTrigger,
  UserMeta,
  UserName,
  UserReference,
  DropdownGreeting,
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
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [confirmOpen, setConfirmOpen] = useState(false);

  const displayName = user
    ? user.firstName
      ? `${user.firstName} ${user.lastName}`
      : user.email
    : "";
  const initials = user
    ? (user.firstName
        ? `${user.firstName[0] ?? ""}${user.lastName?.[0] ?? ""}`
        : (user.email[0] ?? "")
      ).toUpperCase()
    : "";

  const handleLogout = () => {
    setConfirmOpen(false);
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <TopbarFrame>
      <DisclaimerStrip />
      <TopbarRow>
        <MenuToggle
          type="button"
          aria-label="Open menu"
          onClick={onOpenSidebar}
        >
          <Menu size={20} />
        </MenuToggle>
        <Title>{title}</Title>
        <RightCluster>
          <NotificationBell />

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <ProfileTrigger type="button" aria-label="Account menu">
                <Avatar>
                  {user?.avatarUrl && (
                    <AvatarImage src={user.avatarUrl} alt={displayName} />
                  )}
                  <AvatarFallback>{initials}</AvatarFallback>
                </Avatar>
                {user && (
                  <UserMeta>
                    <UserName>{displayName}</UserName>
                    {referenceCode && (
                      <UserReference>{referenceCode}</UserReference>
                    )}
                  </UserMeta>
                )}
                <ChevronDown size={16} />
              </ProfileTrigger>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {user && (
                <DropdownGreeting>
                  Welcome {user.firstName ?? user.email}!
                </DropdownGreeting>
              )}
              <DropdownMenuItem onSelect={() => navigate("/profile")}>
                <UserIcon size={16} />
                Profile
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                destructive
                onSelect={() => setConfirmOpen(true)}
              >
                <LogOut size={16} />
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </RightCluster>
      </TopbarRow>

      <Dialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Log out?</DialogTitle>
            <DialogDescription>
              You&apos;ll need to sign in again to access your dashboard and
              application.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setConfirmOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleLogout}>
              Log out
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </TopbarFrame>
  );
}
