import type { ReactNode } from "react";
import styled from "styled-components";
import { Navbar, type NavbarProps } from "./Navbar";
import { Footer } from "./Footer";

// Navbar is position: fixed, so it's taken out of flow here and doesn't
// affect this flex column's sizing. Main grows to fill any leftover
// viewport height so Footer is pinned to the bottom on short pages,
// instead of floating right under the content.
const ShellFrame = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const Main = styled.main`
  flex: 1 0 auto;
  overflow-x: hidden;
`;

export interface PageShellProps {
  children: ReactNode;
  navVariant?: NavbarProps["variant"];
}

export function PageShell({ children, navVariant = "solid" }: PageShellProps) {
  return (
    <ShellFrame>
      <Navbar variant={navVariant} />
      <Main>{children}</Main>
      <Footer />
    </ShellFrame>
  );
}
