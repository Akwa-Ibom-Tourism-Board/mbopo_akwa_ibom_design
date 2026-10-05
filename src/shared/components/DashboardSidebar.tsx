import { Bell, FileEdit, LayoutDashboard } from "lucide-react";
import { useLocation } from "react-router-dom";
import akwaIbomLogo from "@/assets/akwa-ibom-logo-main.png";
import ariseLogo from "@/assets/arise-logo-main.png";
import mbopoLogo from "@/assets/mbopo-logo-dark.webp";
import {
  SidebarFrame,
  SidebarOverlay,
  SidebarBrand,
  GovLogoRow,
  GovLogoImage,
  SidebarLogo,
  SectionLabel,
  NavList,
  NavItem,
  SidebarFooter,
  FooterLinkRow,
  FooterLink,
  SidebarFooterText,
} from "./DashboardSidebar.styles";

const NAV_ITEMS = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/mbopo-registration", label: "Mbopo Registration", icon: FileEdit },
  { to: "/notifications", label: "Notifications", icon: Bell },
];

export interface DashboardSidebarProps {
  open: boolean;
  onClose: () => void;
}

export function DashboardSidebar({ open, onClose }: DashboardSidebarProps) {
  const location = useLocation();

  return (
    <>
      <SidebarOverlay
        $visible={open}
        aria-label="Close menu"
        onClick={onClose}
      />
      <SidebarFrame $open={open}>
        <SidebarBrand to="/dashboard" onClick={onClose}>
          <GovLogoRow>
            <GovLogoImage src={akwaIbomLogo} alt="Akwa Ibom State Government" />
            <GovLogoImage src={ariseLogo} alt="ARISE Akwa Ibom" />
          </GovLogoRow>
          <SidebarLogo src={mbopoLogo} alt="Mbopo Akwa Ibom" />
        </SidebarBrand>

        <SectionLabel>Menu</SectionLabel>
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

        <SidebarFooter>
          <FooterLinkRow>
            <FooterLink to="/terms" onClick={onClose}>
              Terms &amp; Conditions
            </FooterLink>
            <FooterLink to="/privacy" onClick={onClose}>
              Privacy Policy
            </FooterLink>
          </FooterLinkRow>
          <SidebarFooterText>
            Akwa Ibom State Hotels &amp; Tourism Development Commission
          </SidebarFooterText>
        </SidebarFooter>
      </SidebarFrame>
    </>
  );
}
