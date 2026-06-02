'use client';

import GapsToGrowthLoader from '@/components/GapsToGrowthLoader';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from './Header';
import Sidebar from './Sidebar';

export default function DashboardShell({ children }: { children?: React.ReactNode }) {
  const router = useRouter();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isNavigationLoading, setIsNavigationLoading] = useState(true);
  const [hasValidSession, setHasValidSession] = useState(false);

  // Guard: if session is cleared (cache/cookies cleared), force sign-out
  useEffect(() => {
    const hasSession = localStorage.getItem('userData');
    if (!hasSession) {
      router.replace('/');
    } else {
      setHasValidSession(true);
    }
  }, [router]);

  const isPageLoading = !hasValidSession || isNavigationLoading;

  return (
    <div className="relative h-[100dvh] max-h-[100dvh] overflow-hidden bg-background text-foreground">
      {isPageLoading && (
        <div className="absolute inset-0 z-[100] flex items-center justify-center bg-background">
          <GapsToGrowthLoader fullScreen label="Loading..." />
        </div>
      )}

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-24 top-10 h-72 w-72 rounded-full bg-brand/15 blur-3xl" />
        <div className="absolute right-10 top-28 h-80 w-80 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-success/10 blur-3xl" />
      </div>

      {hasValidSession && (
        <div className={['relative z-10 flex h-full min-h-0', isNavigationLoading ? 'invisible' : ''].join(' ')}>
          <Sidebar
            isCollapsed={isSidebarCollapsed}
            isMobileOpen={isMobileSidebarOpen}
            onCloseMobile={() => setIsMobileSidebarOpen(false)}
            onLoadingChange={setIsNavigationLoading}
            onToggleCollapse={() => setIsSidebarCollapsed((value) => !value)}
          />

          <div className="flex h-full min-w-0 flex-1 flex-col overflow-hidden">
            <Header
              isSidebarCollapsed={isSidebarCollapsed}
              onToggleSidebar={() => setIsSidebarCollapsed((value) => !value)}
              onOpenMobileSidebar={() => setIsMobileSidebarOpen(true)}
            />

            <main className="min-h-0 flex-1 overflow-y-auto px-4 pb-8 pt-5 sm:px-6 lg:px-8 g2g-page-scroll">
              {children}
            </main>
          </div>
        </div>
      )}
    </div>
  );
}
