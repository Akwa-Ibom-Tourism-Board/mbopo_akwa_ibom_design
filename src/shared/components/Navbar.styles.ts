import styled from "styled-components";
import { Link } from "react-router-dom";
import { media } from "@/theme";

export const Header = styled.header<{ $scrolled: boolean }>`
  position: fixed;
  /* Above floatingAction (the home page's scroll-to-top button) so the
     header — and, at the same level, its mobile-menu overlay below —
     always sits on top of floating page chrome, not just page content. */
  z-index: ${({ theme }) => theme.zIndex.modal};
  top: 0;
  left: 0;
  right: 0;
  padding: 14px 0;
  background: ${({ theme, $scrolled }) => ($scrolled ? theme.alpha(theme.colors.background, 0.94) : "transparent")};
  box-shadow: ${({ $scrolled }) => ($scrolled ? "0 3px 24px rgba(11, 73, 35, 0.1)" : "none")};
  backdrop-filter: blur(12px);
  transition:
    background ${({ theme }) => theme.transitions.base},
    box-shadow ${({ theme }) => theme.transitions.base};
`;

export const Bar = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: min(1200px, calc(100% - 32px));
  margin: 0 auto;
  gap: 16px;
`;

export const BrandCluster = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  min-width: 0;
`;

export const LogoCluster = styled.div`
  display: flex;
  gap: 7px;
  align-items: center;
  flex: 0 0 auto;
`;

export const LogoImage = styled.img`
  display: block;
  width: auto;
  height: 46px;
  max-width: 130px;
  object-fit: contain;
  flex: 0 0 auto;

  ${media.md} {
    height: 56px;
  }
`;

export const BrandDivider = styled.span<{ $light: boolean }>`
  display: none;
  flex: 0 0 auto;
  width: 1px;
  height: 34px;
  background: ${({ theme, $light }) => ($light ? "rgba(255, 255, 255, 0.3)" : theme.colors.border)};

  ${media.xl} {
    display: block;
  }
`;

// Portal name + commission line — matches the reference's own
// "hidden until there's genuinely room" treatment: two lines of real
// text (the second one long) need real width, so this only shows at
// xl+, never fights the nav links for space below that.
export const BrandText = styled.div`
  display: none;
  flex-direction: column;
  gap: 1px;
  min-width: 0;
  max-width: 190px;

  ${media.xl} {
    display: flex;
  }
`;

export const BrandName = styled.span<{ $light: boolean }>`
  font-size: 13px;
  font-weight: 700;
  line-height: 1.25;
  color: ${({ theme, $light }) => ($light ? theme.colors.white : theme.colors.foreground)};
`;

export const BrandSubtitle = styled.span<{ $light: boolean }>`
  font-size: clamp(8.5px, 0.7vw, 9.5px);
  font-weight: 500;
  line-height: 1.3;
  color: ${({ $light }) => ($light ? "rgba(255, 255, 255, 0.62)" : "rgba(107, 114, 128, 0.9)")};
`;

export const RightCluster = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
`;

// Sits behind the mobile menu card but above the page content, so opening
// the menu blurs/dims everything else instead of leaving it fully visible.
// z-index is below Header's so the header bar (and the menu card inside
// it) always stays on top and unblurred.
export const NavOverlay = styled.button<{ $visible: boolean }>`
  display: none;
  position: fixed;
  inset: 0;
  /* Same level as Header — Header is rendered after this in the DOM, so
     it (and everything inside it, including the mobile menu card) still
     paints on top at equal z-index. */
  z-index: ${({ theme }) => theme.zIndex.modal};
  border: none;
  background: rgba(0, 0, 0, 0.55);
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
  cursor: pointer;

  @media (max-width: 1023px) {
    display: ${({ $visible }) => ($visible ? "block" : "none")};
  }
`;

export const NavLinks = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  flex: 1;

  @media (max-width: 1023px) {
    display: none;
  }
`;

export const NavAnchor = styled(Link)<{ $light: boolean; $active?: boolean }>`
  position: relative;
  padding: 10px 14px;
  border-radius: ${({ theme }) => theme.radii.full};
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: ${({ theme, $light }) => ($light ? theme.colors.white : theme.colors.foreground)};
  opacity: ${({ $active }) => ($active ? 1 : 0.85)};
  transition:
    opacity ${({ theme }) => theme.transitions.fast},
    background-color ${({ theme }) => theme.transitions.fast};

  &::after {
    content: "";
    position: absolute;
    left: 50%;
    bottom: 4px;
    width: 55%;
    height: 2px;
    border-radius: 2px;
    background: ${({ theme }) => theme.colors.secondary.DEFAULT};
    transform: translateX(-50%) scaleX(${({ $active }) => ($active ? 1 : 0)});
    transition: transform ${({ theme }) => theme.transitions.fast};
  }

  &:hover {
    opacity: 1;
    background: ${({ theme, $light }) => ($light ? "rgba(255, 255, 255, 0.15)" : theme.alpha(theme.colors.primary.DEFAULT, 0.08))};
  }

  &:hover::after {
    transform: translateX(-50%) scaleX(1);
  }
`;

export const CtaLink = styled(Link)`
  display: inline-flex;
  flex-shrink: 0;
  align-items: center;
  gap: 9px;
  padding: 11px 18px;
  border-radius: ${({ theme }) => theme.radii.full};
  color: ${({ theme }) => theme.colors.secondary.foreground};
  background: ${({ theme }) => theme.colors.secondary.DEFAULT};
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 0.09em;
  text-transform: uppercase;
  white-space: nowrap;
  box-shadow: 0 9px 22px
    ${({ theme }) => theme.alpha(theme.colors.secondary.DEFAULT, 0.3)};
  transition:
    transform ${({ theme }) => theme.transitions.fast},
    background-color ${({ theme }) => theme.transitions.fast};

  &:hover {
    transform: translateY(-2px);
    background: ${({ theme }) => theme.alpha(theme.colors.secondary.DEFAULT, 0.9)};
  }

  @media (max-width: 1023px) {
    display: none;
  }
`;

export const SignInLink = styled(Link)<{ $light: boolean }>`
  display: inline-flex;
  flex-shrink: 0;
  align-items: center;
  padding: 10px 18px;
  border: 1px solid
    ${({ theme, $light }) => ($light ? "rgba(255, 255, 255, 0.45)" : theme.colors.border)};
  border-radius: ${({ theme }) => theme.radii.full};
  color: ${({ theme, $light }) => ($light ? theme.colors.white : theme.colors.foreground)};
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 0.09em;
  text-transform: uppercase;
  white-space: nowrap;
  transition: background-color ${({ theme }) => theme.transitions.fast};

  &:hover {
    background: ${({ theme, $light }) => ($light ? "rgba(255, 255, 255, 0.12)" : theme.colors.muted.DEFAULT)};
  }

  @media (max-width: 1023px) {
    display: none;
  }
`;

export const MenuButton = styled.button<{ $light: boolean }>`
  display: none;
  border: 0;
  background: transparent;
  color: ${({ theme, $light }) => ($light ? theme.colors.white : theme.colors.foreground)};
  cursor: pointer;

  @media (max-width: 1023px) {
    display: grid;
    place-items: center;
    width: 40px;
    height: 40px;
  }
`;

// ---------------------------------------------------------------------
// Mobile drawer — a distinct, purpose-built panel (not a CSS reflow of
// the desktop pill nav): its own header row, chevron rows, and two
// full-width stacked buttons, matching the reference's mobile menu.
// ---------------------------------------------------------------------

export const MobileDrawer = styled.div<{ $open: boolean }>`
  display: none;

  @media (max-width: 1023px) {
    display: block;
    position: fixed;
    z-index: ${({ theme }) => theme.zIndex.modal};
    top: 12px;
    right: 12px;
    left: 12px;
    max-height: calc(100dvh - 24px);
    overflow-y: auto;
    background: ${({ theme }) => theme.colors.card};
    border-radius: ${({ theme }) => theme.radii["2xl"]};
    box-shadow: ${({ theme }) => theme.shadows.xl};
    opacity: ${({ $open }) => ($open ? 1 : 0)};
    transform: translateY(${({ $open }) => ($open ? "0" : "-12px")});
    pointer-events: ${({ $open }) => ($open ? "auto" : "none")};
    transition:
      opacity ${({ theme }) => theme.transitions.base},
      transform ${({ theme }) => theme.transitions.base};
  }
`;

export const MobileDrawerHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 18px 18px 16px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

export const MobileDrawerClose = styled.button`
  display: grid;
  flex: 0 0 auto;
  place-items: center;
  width: 34px;
  height: 34px;
  border: none;
  border-radius: ${({ theme }) => theme.radii.full};
  background: ${({ theme }) => theme.colors.muted.DEFAULT};
  color: ${({ theme }) => theme.colors.foreground};
  cursor: pointer;
`;

export const MobileNavList = styled.nav`
  display: flex;
  flex-direction: column;
  padding: 6px 10px;
`;

export const MobileNavRow = styled(Link)<{ $active?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  padding: 14px 10px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  font-size: 14px;
  font-weight: 700;
  color: ${({ theme, $active }) => ($active ? theme.colors.secondary.DEFAULT : theme.colors.foreground)};

  &:last-child {
    border-bottom: none;
  }

  svg:last-child {
    flex: 0 0 auto;
    color: ${({ theme }) => theme.colors.muted.foreground};
  }
`;

export const MobileDrawerActions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 16px 18px 20px;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
`;

export const MobileSignInLink = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 48px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.full};
  color: ${({ theme }) => theme.colors.foreground};
  font-size: 13px;
  font-weight: 700;
`;

export const MobileCtaLink = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  min-height: 48px;
  border-radius: ${({ theme }) => theme.radii.full};
  background: ${({ theme }) => theme.colors.secondary.DEFAULT};
  color: ${({ theme }) => theme.colors.secondary.foreground};
  font-size: 13px;
  font-weight: 800;
  box-shadow: ${({ theme }) => theme.shadows.cta};
`;
