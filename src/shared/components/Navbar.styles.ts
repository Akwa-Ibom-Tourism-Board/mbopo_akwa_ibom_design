import styled from "styled-components";
import { Link } from "react-router-dom";
import { media } from "@/theme";

export const Header = styled.header<{ $scrolled: boolean }>`
  position: fixed;
  z-index: ${({ theme }) => theme.zIndex.navbar};
  top: 0;
  left: 0;
  right: 0;
  padding: 18px 0;
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
  width: min(1240px, calc(100% - 48px));
  margin: 0 auto;
  gap: 20px;
`;

export const LogoCluster = styled.div`
  display: flex;
  gap: 7px;
  align-items: center;
`;

export const LogoImage = styled.img`
  display: block;
  width: auto;
  height: 44px;
  max-width: 120px;
  object-fit: contain;
  flex: 0 0 auto;

  ${media.md} {
    height: 52px;
  }
`;

export const RightCluster = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
`;

export const NavLinks = styled.div<{ $open: boolean; $light: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 28px;
  flex: 1;

  @media (max-width: 860px) {
    position: absolute;
    top: 74px;
    right: 16px;
    left: 16px;
    display: ${({ $open }) => ($open ? "flex" : "none")};
    flex-direction: column;
    align-items: stretch;
    gap: 4px;
    padding: 16px;
    background: ${({ theme }) => theme.colors.card};
    border-radius: ${({ theme }) => theme.radii.xl};
    box-shadow: ${({ theme }) => theme.shadows.lg};
  }
`;

export const NavAnchor = styled(Link)<{ $light: boolean }>`
  padding: 10px 4px;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: ${({ theme, $light }) => ($light ? theme.colors.white : theme.colors.foreground)};
  opacity: 0.85;
  transition: opacity ${({ theme }) => theme.transitions.fast};

  &:hover {
    opacity: 1;
  }

  /* Below 860px, NavLinks becomes a floating card with a light
     background (see NavLinks above) regardless of $light, so the link
     color must follow that card, not the navbar's overlay state. */
  @media (max-width: 860px) {
    color: ${({ theme }) => theme.colors.foreground};
  }
`;

export const CtaLink = styled(Link)`
  display: inline-flex;
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
  box-shadow: 0 9px 22px
    ${({ theme }) => theme.alpha(theme.colors.secondary.DEFAULT, 0.3)};
  transition:
    transform ${({ theme }) => theme.transitions.fast},
    background-color ${({ theme }) => theme.transitions.fast};

  &:hover {
    transform: translateY(-2px);
    background: ${({ theme }) => theme.alpha(theme.colors.secondary.DEFAULT, 0.9)};
  }

  @media (max-width: 860px) {
    justify-content: center;
    padding: 14px;
  }
`;

export const MenuButton = styled.button<{ $light: boolean }>`
  display: none;
  border: 0;
  background: transparent;
  color: ${({ theme, $light }) => ($light ? theme.colors.white : theme.colors.foreground)};
  cursor: pointer;

  @media (max-width: 860px) {
    display: grid;
    place-items: center;
    width: 40px;
    height: 40px;
  }
`;
