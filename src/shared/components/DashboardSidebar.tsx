import { LayoutDashboard, LogOut } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/features/auth";
import mbopoLogo from "@/assets/mbopo-logo.png";
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

  const handleLogout = () => {
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
        <NavButton type="button" onClick={handleLogout}>
          <LogOut size={18} />
          Log out
        </NavButton>
      </SidebarFrame>
    </>
  );
}
