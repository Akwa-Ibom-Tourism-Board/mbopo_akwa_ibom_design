import { useEffect, useState } from "react";
import {
  ArrowRight,
  ChevronRight,
  LayoutDashboard,
  Menu,
  X,
} from "lucide-react";
import { useLocation } from "react-router-dom";
import akwaIbomLogo from "@/assets/akwa-ibom-logo-main.png";
import ariseLogo from "@/assets/arise-logo-main.png";
import { useAuth } from "@/features/auth";
import { DisclaimerStrip } from "./DisclaimerStrip";
import {
  HeaderFrame,
  HeaderBar,
  NavOverlay,
  Bar,
  BrandCluster,
  LogoCluster,
  LogoImage,
  BrandDivider,
  BrandText,
  BrandName,
  BrandSubtitle,
  RightCluster,
  NavLinks,
  NavAnchor,
  CtaLink,
  SignInLink,
  MenuButton,
  MobileDrawer,
  MobileDrawerHeader,
  MobileDrawerClose,
  MobileNavList,
  MobileNavRow,
  MobileDrawerActions,
  MobileSignInLink,
  MobileCtaLink,
} from "./Navbar.styles";

export interface NavbarProps {
  // "overlay" sits on top of a dark hero image and starts with light text
  // until the page is scrolled; "solid" (the default) is for interior
  // pages that don't have a full-bleed hero behind the nav.
  variant?: "overlay" | "solid";
}

const NAV_ITEMS = [
  { to: "/", label: "Home" },
  { to: "/#about", label: "About" },
  { to: "/#eligibility", label: "Eligibility" },
  { to: "/#rewards", label: "Rewards" },
  { to: "/#why-enter", label: "Why" },
  { to: "/privacy", label: "Privacy" },
  { to: "/terms", label: "Terms" },
];

// Matches "/some-path" against the current location, and "/#hash" against
// the current hash while on "/" — so the reference's underline/highlight
// treatment works for both plain routes and the homepage's anchor links.
function isNavActive(to: string, pathname: string, hash: string): boolean {
  const [toPath, toHash] = to.split("#");
  if (toHash) {
    return pathname === (toPath || "/") && hash === `#${toHash}`;
  }
  return pathname === to && hash === "";
}

export function Navbar({ variant = "solid" }: NavbarProps) {
  const [scrolled, setScrolled] = useState(variant === "solid");
  const [menuOpen, setMenuOpen] = useState(false);
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  useEffect(() => {
    if (variant === "solid") return;
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [variant]);

  const light = variant === "overlay" && !scrolled;
  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      {/* Rendered as a sibling, not a child, of HeaderFrame — HeaderBar's
          own backdrop-filter establishes a containing block for
          `position: fixed` descendants, which would confine this overlay
          to that (small) box instead of the full viewport. */}
      <NavOverlay
        $visible={menuOpen}
        aria-label="Close menu"
        onClick={closeMenu}
      />
      <HeaderFrame>
        <DisclaimerStrip />
        <HeaderBar $scrolled={scrolled}>
          <Bar>
            <BrandCluster>
              <LogoCluster>
                <LogoImage
                  src={akwaIbomLogo}
                  alt="Akwa Ibom State Government logo"
                />
                <LogoImage src={ariseLogo} alt="ARISE Akwa Ibom logo" />
              </LogoCluster>
              <BrandDivider $light={light} aria-hidden />
              <BrandText>
                {/* <BrandName $light={light}>Mbopo Akwa Ibom</BrandName> */}
                <BrandSubtitle $light={light}>
                  Akwa Ibom State Hotels and Tourism Development Commission
                </BrandSubtitle>
              </BrandText>
            </BrandCluster>

            <NavLinks>
              {NAV_ITEMS.map(({ to, label }) => (
                <NavAnchor
                  key={to}
                  to={to}
                  $light={light}
                  $active={isNavActive(to, location.pathname, location.hash)}
                >
                  {label}
                </NavAnchor>
              ))}
              {isAuthenticated ? (
                <CtaLink to="/dashboard">
                  Dashboard <LayoutDashboard size={15} />
                </CtaLink>
              ) : (
                <>
                  <SignInLink to="/login" $light={light}>
                    Sign In
                  </SignInLink>
                  <CtaLink to="/register">
                    Register Now <ArrowRight size={15} />
                  </CtaLink>
                </>
              )}
            </NavLinks>

            <RightCluster>
              <MenuButton
                type="button"
                $light={light}
                aria-label={menuOpen ? "Close menu" : "Open menu"}
                onClick={() => setMenuOpen((open) => !open)}
              >
                {menuOpen ? <X size={22} /> : <Menu size={22} />}
              </MenuButton>
            </RightCluster>
          </Bar>
        </HeaderBar>
      </HeaderFrame>

      <MobileDrawer $open={menuOpen}>
        <MobileDrawerHeader>
          <BrandCluster>
            <LogoCluster>
              <LogoImage
                src={akwaIbomLogo}
                alt="Akwa Ibom State Government logo"
              />
              <LogoImage src={ariseLogo} alt="ARISE Akwa Ibom logo" />
            </LogoCluster>
          </BrandCluster>
          <MobileDrawerClose
            type="button"
            aria-label="Close menu"
            onClick={closeMenu}
          >
            <X size={18} />
          </MobileDrawerClose>
        </MobileDrawerHeader>

        <MobileNavList>
          {NAV_ITEMS.map(({ to, label }) => (
            <MobileNavRow
              key={to}
              to={to}
              onClick={closeMenu}
              $active={isNavActive(to, location.pathname, location.hash)}
            >
              {label}
              <ChevronRight size={16} />
            </MobileNavRow>
          ))}
          {isAuthenticated && (
            <MobileNavRow to="/dashboard" onClick={closeMenu}>
              Dashboard
              <ChevronRight size={16} />
            </MobileNavRow>
          )}
        </MobileNavList>

        <MobileDrawerActions>
          {isAuthenticated ? null : (
            <MobileSignInLink to="/login" onClick={closeMenu}>
              Sign In
            </MobileSignInLink>
          )}
          <MobileCtaLink
            to={isAuthenticated ? "/dashboard" : "/register"}
            onClick={closeMenu}
          >
            {isAuthenticated ? "Dashboard" : "Register Now"}
            <ArrowRight size={15} />
          </MobileCtaLink>
        </MobileDrawerActions>
      </MobileDrawer>
    </>
  );
}
