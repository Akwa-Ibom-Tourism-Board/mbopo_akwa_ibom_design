import { useEffect, useState } from "react";
import { ArrowRight, LayoutDashboard, Menu, X } from "lucide-react";
import akwaIbomLogo from "@/assets/akwa-ibom-logo-main.png";
import ariseLogo from "@/assets/arise-logo-main.png";
import akhtdcLogo from "@/assets/akhtdc-new-logo.png";
import { useAuth } from "@/features/auth";
import {
  Header,
  NavOverlay,
  Bar,
  LogoCluster,
  LogoImage,
  RightCluster,
  NavLinks,
  NavAnchor,
  CtaLink,
  MenuButton,
} from "./Navbar.styles";

export interface NavbarProps {
  // "overlay" sits on top of a dark hero image and starts with light text
  // until the page is scrolled; "solid" (the default) is for interior
  // pages that don't have a full-bleed hero behind the nav.
  variant?: "overlay" | "solid";
}

export function Navbar({ variant = "solid" }: NavbarProps) {
  const [scrolled, setScrolled] = useState(variant === "solid");
  const [menuOpen, setMenuOpen] = useState(false);
  const { isAuthenticated } = useAuth();

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
      {/* Rendered as a sibling, not a child, of Header — Header's own
          backdrop-filter establishes a containing block for `position:
          fixed` descendants, which would confine this overlay to
          Header's own (small) box instead of the full viewport. */}
      <NavOverlay
        $visible={menuOpen}
        aria-label="Close menu"
        onClick={closeMenu}
      />
      <Header $scrolled={scrolled}>
        <Bar>
          <LogoCluster>
            <LogoImage
              src={akwaIbomLogo}
              alt="Akwa Ibom State Government logo"
            />
            <LogoImage src={ariseLogo} alt="ARISE Akwa Ibom logo" />
          </LogoCluster>

          <NavLinks $open={menuOpen} $light={light}>
            <NavAnchor to="/" $light={light} onClick={closeMenu}>
              Home
            </NavAnchor>
            <NavAnchor to="/#about" $light={light} onClick={closeMenu}>
              About
            </NavAnchor>
            <NavAnchor to="/#eligibility" $light={light} onClick={closeMenu}>
              Eligibility
            </NavAnchor>
            <NavAnchor to="/#why-enter" $light={light} onClick={closeMenu}>
              Why
            </NavAnchor>
            {/* <NavAnchor to="/#faq" $light={light} onClick={closeMenu}>
              FAQ
            </NavAnchor> */}
            <NavAnchor to="/privacy" $light={light} onClick={closeMenu}>
              Privacy
            </NavAnchor>
            <NavAnchor to="/terms" $light={light} onClick={closeMenu}>
              Terms
            </NavAnchor>
            {isAuthenticated ? (
              <CtaLink to="/dashboard" onClick={closeMenu}>
                Dashboard <LayoutDashboard size={15} />
              </CtaLink>
            ) : (
              <>
                <NavAnchor to="/login" $light={light} onClick={closeMenu}>
                  Sign In
                </NavAnchor>
                <CtaLink to="/register" onClick={closeMenu}>
                  Register Now <ArrowRight size={15} />
                </CtaLink>
              </>
            )}
          </NavLinks>

          <RightCluster>
            {/*<LogoImage
              src={akhtdcLogo}
              alt="Akwa Ibom State Hotels and Tourism Development Commission logo"
            /> */}
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
      </Header>
    </>
  );
}
