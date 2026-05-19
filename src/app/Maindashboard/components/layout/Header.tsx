'use client';

import { AnimatePresence, motion } from 'framer-motion';
import {
  Bell,
  ChevronDown,
  LogOut,
  Menu,
  Search,
  ShieldCheck,
  UserRound,
  X,
} from 'lucide-react';
import { useState } from 'react';

type HeaderProps = {
  isSidebarCollapsed: boolean;
  onToggleSidebar: () => void;
  onOpenMobileSidebar: () => void;
};

const menuAnimation = {
  initial: { opacity: 0, y: 10, scale: 0.98 },
  animate: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: 8, scale: 0.98 },
  transition: { duration: 0.18, ease: [0.22, 1, 0.36, 1] as const },
};

export default function Header({
  isSidebarCollapsed,
  onToggleSidebar,
  onOpenMobileSidebar,
}: HeaderProps) {
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  return (
    <header className="sticky top-0 z-40 shrink-0 px-3 pt-3 sm:px-5 lg:px-6">
      <motion.div
        initial={{ opacity: 0, y: -14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="g2g-gradient-border group relative max-w-full overflow-visible rounded-[22px]"
      >
        <div className="g2g-header-glass relative flex min-h-20 flex-wrap items-center gap-3 px-3 py-3 sm:px-4 lg:flex-nowrap">
          <div className="g2g-light-sweep" />

          <div className="mx-auto hidden w-full min-w-[240px] max-w-2xl flex-1 md:block">
            <div
              className={[
                'relative rounded-2xl border bg-white/58 transition-all duration-300',
                'shadow-[0_12px_36px_rgba(31,42,109,0.08)] backdrop-blur-xl',
                isSearchFocused
                  ? 'border-[#FF6A00]/45 ring-4 ring-[#FF6A00]/10'
                  : 'border-white/60 hover:border-[#2E3A8C]/20',
              ].join(' ')}
            >
              <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#2E3A8C]" />
              <input
                type="search"
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
                placeholder="Search competency, users, tasks..."
                className="h-12 w-full bg-transparent pl-11 pr-28 text-sm font-medium text-[#111827] outline-none placeholder:text-[#6B7280]"
                aria-label="Global search"
              />
              <div className="absolute right-2 top-1/2 hidden -translate-y-1/2 items-center gap-1 rounded-xl border border-white/70 bg-white/65 px-2.5 py-1 text-[11px] font-semibold text-[#6B7280] shadow-sm lg:flex">
                <span>Ctrl</span>
                <span>K</span>
              </div>
            </div>
          </div>

          <div className="ml-auto flex min-w-0 items-center gap-2">
            <button
              type="button"
              className="g2g-header-action hidden sm:inline-flex"
              aria-label="Rights management"
            >
              <ShieldCheck className="h-4 w-4" />
              <span className="hidden xl:inline">Rights</span>
            </button>

            <div className="relative">
              <button
                type="button"
                onClick={() => setIsNotificationsOpen((value) => !value)}
                className="g2g-icon-button relative"
                aria-label="Open notifications"
                aria-expanded={isNotificationsOpen}
              >
                <Bell className="h-5 w-5" />
                <span className="g2g-notification-pulse" />
              </button>

              <AnimatePresence>
                {isNotificationsOpen && (
                  <motion.div
                    {...menuAnimation}
                    className="g2g-popover right-0 w-[min(20rem,calc(100vw-2rem))]"
                  >
                    <div className="flex items-center justify-between border-b border-white/60 px-4 py-3">
                      <div>
                        <p className="text-sm font-semibold text-[#111827]">Notifications</p>
                        <p className="text-xs text-[#6B7280]">3 workflow updates need review</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => setIsNotificationsOpen(false)}
                        className="rounded-full p-1.5 text-[#6B7280] hover:bg-[#F4F7FB]"
                        aria-label="Close notifications"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                    {['Skill matrix updated', 'New task assignment', 'Security policy review'].map((item) => (
                      <button
                        type="button"
                        key={item}
                        className="flex w-full items-start gap-3 px-4 py-3 text-left transition hover:bg-white/70"
                      >
                        <span className="mt-1 h-2 w-2 rounded-full bg-[#FF6A00] shadow-[0_0_14px_rgba(255,106,0,0.55)]" />
                        <span>
                          <span className="block text-sm font-semibold text-[#111827]">{item}</span>
                          <span className="block text-xs text-[#6B7280]">Just now in Growth Ops</span>
                        </span>
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="relative">
              <button
                type="button"
                onClick={() => setIsUserMenuOpen((value) => !value)}
                className="flex items-center gap-2 rounded-2xl border border-white/60 bg-white/55 p-1.5 pr-2.5 text-sm font-semibold text-[#111827] shadow-[0_12px_30px_rgba(31,42,109,0.08)] backdrop-blur-xl transition duration-300 hover:-translate-y-0.5 hover:bg-white/75 hover:shadow-[0_18px_42px_rgba(31,42,109,0.13)] focus:outline-none focus:ring-4 focus:ring-[#2E3A8C]/12"
                aria-label="Open user profile menu"
                aria-expanded={isUserMenuOpen}
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-[#1F2A6D] via-[#2E3A8C] to-[#FF6A00] text-white shadow-[0_12px_26px_rgba(31,42,109,0.25)]">
                  <UserRound className="h-4 w-4" />
                </span>
                <span className="hidden lg:block">John Doe</span>
                <ChevronDown className="hidden h-4 w-4 text-[#6B7280] lg:block" />
              </button>

              <AnimatePresence>
                {isUserMenuOpen && (
                  <motion.div
                    {...menuAnimation}
                    className="g2g-popover right-0 w-[min(16rem,calc(100vw-2rem))]"
                  >
                    <div className="border-b border-white/60 px-4 py-4">
                      <p className="text-sm font-semibold text-[#111827]">John Doe</p>
                      <p className="text-xs text-[#6B7280]">john@example.com</p>
                    </div>
                    <a href="/profile" className="g2g-popover-link">Profile</a>
                    <a href="/settings" className="g2g-popover-link">Account settings</a>
                    <button type="button" className="g2g-popover-link w-full text-left text-[#DC2626]">
                      <LogOut className="h-4 w-4" />
                      Sign out
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <button
              type="button"
              className="g2g-signout-button hidden lg:inline-flex"
            >
              <LogOut className="h-4 w-4" />
              <span>Sign Out</span>
            </button>
          </div>

          <div className="block w-full md:hidden">
            <div
              className={[
                'relative rounded-2xl border bg-white/60 transition-all duration-300',
                isSearchFocused
                  ? 'border-[#FF6A00]/45 ring-4 ring-[#FF6A00]/10'
                  : 'border-white/60',
              ].join(' ')}
            >
              <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#2E3A8C]" />
              <input
                type="search"
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
                placeholder="Search competency, users, tasks..."
                className="h-11 w-full bg-transparent pl-11 pr-4 text-sm font-medium text-[#111827] outline-none placeholder:text-[#6B7280]"
                aria-label="Global search"
              />
            </div>
          </div>
        </div>
      </motion.div>
    </header>
  );
}
