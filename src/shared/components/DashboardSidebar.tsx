import { useState } from "react";
import { LayoutDashboard, LogOut } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/features/auth";
import {
  Button,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/shared/ui";
import mbopoLogo from "@/assets/mbopo-logo.webp";
import {
  SidebarFrame,
  SidebarOverlay,
  SidebarBrand,
  SidebarLogo,
  NavList,
  NavItem,
  NavButton,
} from "./DashboardSidebar.styles";

const NAV_ITEMS = [
  { to: "/dashboard", label: "Overview", icon: LayoutDashboard },
];

export interface DashboardSidebarProps {
  open: boolean;
  onClose: () => void;
}

export function DashboardSidebar({ open, onClose }: DashboardSidebarProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [confirmOpen, setConfirmOpen] = useState(false);

  const handleLogout = () => {
    setConfirmOpen(false);
    onClose();
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <>
      <SidebarOverlay
        $visible={open}
        aria-label="Close menu"
        onClick={onClose}
      />
      <SidebarFrame $open={open}>
        <SidebarBrand to="/dashboard" onClick={onClose}>
          <SidebarLogo src={mbopoLogo} alt="Mbopo Akwa Ibom" />
        </SidebarBrand>
        <NavList>
          {NAV_ITEMS.map(({ to, label, icon: Icon }) => (
            <NavItem
              key={to}
              to={to}
              $active={location.pathname === to}
              onClick={onClose}
            >
              <Icon size={18} />
              {label}
            </NavItem>
          ))}
        </NavList>
        <NavButton type="button" onClick={() => setConfirmOpen(true)}>
          <LogOut size={18} />
          Log out
        </NavButton>
      </SidebarFrame>

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
    </>
  );
}
