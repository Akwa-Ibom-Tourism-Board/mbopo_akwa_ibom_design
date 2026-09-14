import { useState, type ReactNode } from "react";
import { DashboardSidebar } from "./DashboardSidebar";
import { DashboardTopbar } from "./DashboardTopbar";
import { ShellFrame, ContentPane, ContentBody } from "./DashboardShell.styles";

export interface DashboardShellProps {
  title: string;
  children: ReactNode;
}

export function DashboardShell({ title, children }: DashboardShellProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <ShellFrame>
      <DashboardSidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />
      <ContentPane>
        <DashboardTopbar
          title={title}
          onOpenSidebar={() => setSidebarOpen(true)}
        />
        <ContentBody>{children}</ContentBody>
      </ContentPane>
    </ShellFrame>
  );
}
