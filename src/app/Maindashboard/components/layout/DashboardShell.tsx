'use client';

import { useState } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import DashboardContent from '../dashboard/DashboardContent';

export default function DashboardShell() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  return (
    <div className="relative h-[100dvh] max-h-[100dvh] overflow-hidden bg-[#F4F7FB] text-[#111827]">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-24 top-10 h-72 w-72 rounded-full bg-[#2E3A8C]/15 blur-3xl" />
        <div className="absolute right-10 top-28 h-80 w-80 rounded-full bg-[#FF6A00]/10 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-[#16A34A]/10 blur-3xl" />
      </div>

      <div className="relative z-10 flex h-full min-h-0">
        <Sidebar
          isCollapsed={isSidebarCollapsed}
          isMobileOpen={isMobileSidebarOpen}
          onCloseMobile={() => setIsMobileSidebarOpen(false)}
          onToggleCollapse={() => setIsSidebarCollapsed((value) => !value)}
        />

        <div className="flex h-full min-w-0 flex-1 flex-col overflow-hidden">
          <Header
            isSidebarCollapsed={isSidebarCollapsed}
            onToggleSidebar={() => setIsSidebarCollapsed((value) => !value)}
            onOpenMobileSidebar={() => setIsMobileSidebarOpen(true)}
          />

          <main className="min-h-0 flex-1 overflow-y-auto px-4 pb-8 pt-5 sm:px-6 lg:px-8 g2g-page-scroll">
            <DashboardContent />
          </main>
        </div>
      </div>
    </div>
  );
}
