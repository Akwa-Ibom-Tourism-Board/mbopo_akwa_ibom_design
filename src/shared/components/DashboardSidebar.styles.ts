import styled from "styled-components";
import { Link } from "react-router-dom";
import { media } from "@/theme";

export const SidebarFrame = styled.aside<{ $open: boolean }>`
  position: fixed;
  z-index: ${({ theme }) => theme.zIndex.modal};
  top: 0;
  bottom: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  width: 260px;
  padding: 24px 16px;
  background: ${({ theme }) => theme.colors.card};
  border-right: 1px solid ${({ theme }) => theme.colors.border};
  transform: translateX(${({ $open }) => ($open ? "0" : "-100%")});
  transition: transform ${({ theme }) => theme.transitions.base};

  ${media.lg} {
    position: sticky;
    transform: none;
  }
`;

export const SidebarOverlay = styled.button<{ $visible: boolean }>`
  position: fixed;
  inset: 0;
  z-index: ${({ theme }) => theme.zIndex.sticky};
  display: ${({ $visible }) => ($visible ? "block" : "none")};
  border: none;
  background: rgba(0, 0, 0, 0.5);
  cursor: pointer;

  ${media.lg} {
    display: none;
  }
`;

export const SidebarBrand = styled(Link)`
  display: block;
  padding: 0 8px 20px;
  margin-bottom: 12px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

export const SidebarLogo = styled.img`
  height: 34px;
  width: auto;
  object-fit: contain;
`;

export const NavList = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const NavItem = styled(Link)<{ $active: boolean }>`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 11px 12px;
  border-radius: ${({ theme }) => theme.radii.md};
  font-size: 0.875rem;
  font-weight: 600;
  color: ${({ theme, $active }) => ($active ? theme.colors.primary.foreground : theme.colors.foreground)};
  background: ${({ theme, $active }) => ($active ? theme.colors.primary.DEFAULT : "transparent")};
  transition: background-color ${({ theme }) => theme.transitions.fast};

  &:hover {
    background: ${({ theme, $active }) => ($active ? theme.colors.primary.DEFAULT : theme.colors.accent.DEFAULT)};
    color: ${({ theme, $active }) => ($active ? theme.colors.primary.foreground : theme.colors.accent.foreground)};
  }

  svg {
    flex-shrink: 0;
  }
`;

export const NavButton = styled.button`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: auto;
  padding: 11px 12px;
  border: none;
  border-radius: ${({ theme }) => theme.radii.md};
  background: transparent;
  color: ${({ theme }) => theme.colors.destructive.DEFAULT};
  font-size: 0.875rem;
  font-weight: 600;
  font-family: inherit;
  cursor: pointer;
  transition: background-color ${({ theme }) => theme.transitions.fast};

  &:hover {
    background: ${({ theme }) => theme.alpha(theme.colors.destructive.DEFAULT, 0.1)};
  }
`;
