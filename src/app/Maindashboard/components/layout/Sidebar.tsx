'use client';

import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  BarChart3,
  Building2,
  ChevronRight,
  Gauge,
  GraduationCap,
  LineChart,
  LucideIcon,
  Menu,
  Settings,
  ShieldCheck,
  Sparkles,
  Target,
  UsersRound,
  X,
} from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';

type SidebarProps = {
  isCollapsed: boolean;
  isMobileOpen: boolean;
  onCloseMobile: () => void;
  onToggleCollapse: () => void;
};

type SubMenuItem = {
  label: string;
  href: string;
};

type MenuItem = {
  label: string;
  icon: LucideIcon;
  href: string;
  badge?: string;
  children?: SubMenuItem[];
};

const menuItems: MenuItem[] = [
  {
    label: 'Dashboard',
    icon: Gauge,
    href: '/Maindashboard',

  },
  {
    label: 'Organizational Management',
    icon: Building2,
    href: '/organization',
    children: [
      { label: 'Organization Details', href: '/organization/details' },
      { label: 'Add Organization Detail', href: '/organization/create' },
      { label: 'Task Assignment & Progress', href: '/organization/tasks' },
    ],
  },
  {
    label: 'User Management',
    icon: UsersRound,
    href: '/users',
    children: [
      { label: 'Profile', href: '/users/profile' },
      { label: 'Task Activity Stream', href: '/users/activity' },
    ],
  },
  {
    label: 'Competency Management',
    icon: Target,
    href: '/competency',
    children: [
      { label: 'Competency Matrix', href: '/competency/matrix' },
      { label: 'Skill Gap Analysis', href: '/competency/gaps' },
      { label: 'Learning Paths', href: '/competency/learning-paths' },
    ],
  },
  {
    label: 'Reports & Analytics',
    icon: LineChart,
    href: '/reports',
    children: [
      { label: 'Performance Reports', href: '/reports/performance' },
      { label: 'Growth Insights', href: '/reports/insights' },
      { label: 'KPI Tracking', href: '/reports/kpi' },
    ],
  },
  {
    label: 'Settings',
    icon: Settings,
    href: '/settings',
    children: [
      { label: 'Roles & Permissions', href: '/settings/roles' },
      { label: 'Notifications', href: '/settings/notifications' },
      { label: 'Security', href: '/settings/security' },
    ],
  },
];

const platformMetrics = [
  { label: 'Readiness', value: '92%', icon: ShieldCheck },
  { label: 'Growth Plans', value: '148', icon: GraduationCap },
];

const sidebarTransition = {
  duration: 0.34,
  ease: [0.22, 1, 0.36, 1] as const,
};

const isHrefActive = (pathname: string, href: string) =>
  pathname === href || (href !== '/' && pathname.startsWith(`${href}/`));

const getActiveMenuLabels = (pathname: string) =>
  menuItems
    .filter((item) =>
      isHrefActive(pathname, item.href) ||
      item.children?.some((child) => isHrefActive(pathname, child.href)),
    )
    .map((item) => item.label);

function SidebarMenuItem({
  item,
  isCollapsed,
  isActive,
  isOpen,
  onToggle,
  onNavigate,
  onToggleCollapse,
  pathname,
}: {
  item: MenuItem;
  isCollapsed: boolean;
  isActive: boolean;
  isOpen: boolean;
  onToggle: () => void;
  onNavigate?: () => void;
  onToggleCollapse?: () => void;
  pathname: string;
}) {
  const Icon = item.icon;
  const hasChildren = Boolean(item.children?.length);
  const itemId = `sidebar-${item.label.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;
  const itemClasses = [
    'group relative flex w-full items-center gap-3 overflow-hidden rounded-2xl border text-left transition-all duration-300',
    isCollapsed
      ? 'h-12 justify-center border-transparent bg-transparent px-0 py-0 text-[#B8C4F1] hover:border-transparent hover:bg-transparent hover:text-white'
      : 'px-3 py-3',
    !isCollapsed && isActive
      ? 'g2g-sidebar-active border-white/30 text-white'
      : '',
    !isCollapsed && !isActive
      ? 'border-white/8 bg-white/[0.055] text-[#C7D2FE] hover:border-white/18 hover:bg-white/[0.095] hover:text-white'
      : '',
    isCollapsed && isActive ? 'text-white' : '',
  ].join(' ');

  const itemContent = (
    <>
      {!isCollapsed && (
        <span className="absolute inset-0 opacity-0 transition duration-300 group-hover:opacity-100">
          <span className="absolute -left-8 top-1/2 h-16 w-16 -translate-y-1/2 rounded-full bg-[#FF6A00]/16 blur-2xl" />
        </span>
      )}

      {isActive && !isCollapsed && <span className="g2g-active-beam" />}

      <span
        className={[
          'relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-all duration-300',
          isCollapsed
            ? 'border-0 bg-transparent shadow-none'
            : 'border',
          !isCollapsed && isActive
            ? 'border-white/25 bg-white/18 text-white shadow-[0_0_24px_rgba(255,106,0,0.36)]'
            : '',
          !isCollapsed && !isActive
            ? 'border-white/10 bg-white/8 text-[#AEB9F5] group-hover:scale-105 group-hover:text-white'
            : '',
          isCollapsed && isActive ? 'text-white' : '',
          isCollapsed && !isActive ? 'text-[#AEB9F5] group-hover:text-white' : '',
        ].join(' ')}
      >
        <Icon className="h-5 w-5" />
        {isCollapsed && (
          <span className="pointer-events-none absolute left-full top-1/2 ml-2 -translate-y-1/2 rounded-md bg-[#18245D] px-2 py-1 text-xs font-medium text-white opacity-0 shadow-lg transition-opacity group-hover:opacity-100">
            {item.label}
          </span>
        )}
      </span>

      <AnimatePresence initial={false}>
        {!isCollapsed && (
          <motion.span
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: 'auto' }}
            exit={{ opacity: 0, width: 0 }}
            className="relative z-10 flex min-w-0 flex-1 items-center justify-between gap-2"
          >
            <span className="min-w-0">
              <span className="block truncate text-sm font-semibold">{item.label}</span>
              {item.badge && (
                <span className="mt-0.5 block text-[11px] font-semibold uppercase tracking-[0.14em] text-[#FFB176]">
                  {item.badge}
                </span>
              )}
            </span>
            {hasChildren && (
              <ChevronRight
                className={[
                  'h-4 w-4 shrink-0 text-white/60 transition duration-300',
                  isOpen ? 'rotate-90 text-white' : '',
                ].join(' ')}
              />
            )}
          </motion.span>
        )}
      </AnimatePresence>
    </>
  );

  return (
    <div className="relative">
      {hasChildren ? (
        <motion.button
          type="button"
          onClick={onToggle}
          whileHover={isCollapsed ? undefined : { y: -2 }}
          whileTap={{ scale: 0.98 }}
          className={itemClasses}
          aria-expanded={isOpen}
          aria-controls={itemId}
        >
          {itemContent}
        </motion.button>
      ) : (
        <motion.div whileHover={isCollapsed ? undefined : { y: -2 }} whileTap={{ scale: 0.98 }}>
          <Link
            href={item.href}
            onClick={() => {
              if (isCollapsed && onToggleCollapse) {
                onToggleCollapse();
              }
              onNavigate?.();
            }}
            className={itemClasses}
            aria-current={isActive ? 'page' : undefined}
          >
            {itemContent}
          </Link>
        </motion.div>
      )}

      <AnimatePresence initial={false}>
        {hasChildren && isOpen && !isCollapsed && (
          <motion.div
            id={itemId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="relative ml-8 mt-2 space-y-1.5 pb-1 pl-6">
              <span className="absolute bottom-3 left-2 top-1 w-px bg-gradient-to-b from-[#FF6A00]/80 via-white/20 to-transparent" />
              {item.children?.map((child, index) => (
                <motion.div
                  key={child.label}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2, delay: index * 0.035 }}
                >
                  <Link
                    href={child.href}
                    onClick={onNavigate}
                    aria-current={isHrefActive(pathname, child.href) ? 'page' : undefined}
                    className={[
                      'group/sub relative flex items-center rounded-xl px-3 py-2 text-sm font-medium transition duration-250 focus:outline-none focus:ring-2 focus:ring-[#FF6A00]/40',
                      isHrefActive(pathname, child.href)
                        ? 'bg-white/10 text-white'
                        : 'text-[#B8C4F1] hover:bg-white/8 hover:text-white',
                    ].join(' ')}
                  >
                    <span className="absolute -left-[19px] top-1/2 h-px w-4 bg-white/20 transition group-hover/sub:bg-[#FF6A00]" />
                    <span className="absolute -left-[23px] top-1/2 h-2 w-2 -translate-y-1/2 rounded-full border border-[#FF6A00]/60 bg-[#18245D] transition group-hover/sub:scale-125 group-hover/sub:bg-[#FF6A00]" />
                    {child.label}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function SidebarContent({
  isCollapsed,
  onToggleCollapse,
  onCloseMobile,
  isMobile = false,
}: {
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  onCloseMobile?: () => void;
  isMobile?: boolean;
}) {
  const pathname = usePathname();
  const [openMenus, setOpenMenus] = useState<string[]>([
    'Organizational Management',
    'Competency Management',
  ]);
  const activeMenuLabels = useMemo(() => getActiveMenuLabels(pathname), [pathname]);

  const collapsedMetrics = useMemo(() => platformMetrics.slice(0, 1), []);

  useEffect(() => {
    if (!activeMenuLabels.length) {
      return;
    }

    setOpenMenus((current) => Array.from(new Set([...current, ...activeMenuLabels])));
  }, [activeMenuLabels]);

  const toggleMenu = (label: string) => {
    if (isCollapsed) {
      onToggleCollapse();
      setOpenMenus((current) => Array.from(new Set([...current, label])));
      return;
    }

    setOpenMenus((current) =>
      current.includes(label)
        ? current.filter((item) => item !== label)
        : [...current, label],
    );
  };

  return (
    <div
      className={[
        'g2g-sidebar-surface flex h-full flex-col overflow-hidden text-white transition-all duration-300',
        isCollapsed ? 'g2g-sidebar-collapsed' : '',
      ].join(' ')}
    >
      <div className="relative z-10 flex h-20 shrink-0 items-center gap-3 px-4">
        <div className="g2g-logo-mark shrink-0">
          <Sparkles className="h-5 w-5" aria-hidden="true" />
        </div>
        <AnimatePresence initial={false}>
          {!isCollapsed && (
            <motion.div
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -8 }}
              className="min-w-0"
            >
              <p className="truncate text-base font-semibold">GapsToGrowth</p>
              <p className="truncate text-xs font-medium text-[#AEB9F5]">Competency OS</p>
            </motion.div>
          )}
        </AnimatePresence>
        <button
          type="button"
          onClick={isMobile ? onCloseMobile : onToggleCollapse}
          className={[
            'ml-auto flex h-10 w-10 items-center justify-center rounded-xl text-white transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#FF6A00]/50',
            isCollapsed
              ? 'border-0 bg-transparent hover:bg-white/8'
              : 'border border-white/10 bg-white/8 hover:bg-white/14',
          ].join(' ')}
          aria-label={isMobile ? 'Close navigation menu' : isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {isMobile ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <div className="relative z-10 min-h-0 flex-1 overflow-y-auto px-3 pb-4 g2g-scrollbar">
        <AnimatePresence initial={false}>
          {isCollapsed && (
            <motion.div
              key="collapsed-metrics"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="mb-4 flex justify-center"
            >
              {collapsedMetrics.map((metric) => {
                const Icon = metric.icon;
                return (
                  <div key={metric.label} className="flex h-11 w-11 items-center justify-center text-[#FFB176]">
                    <Icon className="h-5 w-5" />
                  </div>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>

<nav className="space-y-2" aria-label="Main navigation">
           {menuItems.map((item) => (
             <SidebarMenuItem
               key={item.label}
               item={item}
               isCollapsed={isCollapsed}
               isActive={activeMenuLabels.includes(item.label)}
               isOpen={openMenus.includes(item.label)}
               onToggle={() => toggleMenu(item.label)}
               onNavigate={onCloseMobile}
               onToggleCollapse={onToggleCollapse}
               pathname={pathname}
             />
           ))}
         </nav>
      </div>

     
    </div>
  );
}

export default function Sidebar({
  isCollapsed,
  isMobileOpen,
  onCloseMobile,
  onToggleCollapse,
}: SidebarProps) {
  return (
    <>
      <motion.aside
        layout
        animate={{ width: isCollapsed ? 88 : 318 }}
        transition={sidebarTransition}
        className="sticky top-0 z-30 hidden h-[100dvh] max-h-[100dvh] shrink-0 p-2 lg:block xl:p-3"
      >
        <SidebarContent
          isCollapsed={isCollapsed}
          onToggleCollapse={onToggleCollapse}
        />
      </motion.aside>

      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            className="fixed inset-0 z-50 h-[100dvh] overflow-hidden lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <button
              type="button"
              className="absolute inset-0 bg-[#071033]/60 backdrop-blur-sm"
              onClick={onCloseMobile}
              aria-label="Close navigation overlay"
            />
            <motion.aside
              initial={{ x: -340 }}
              animate={{ x: 0 }}
              exit={{ x: -340 }}
              transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
              className="relative h-[100dvh] w-[min(88vw,330px)] p-3"
            >
              <SidebarContent
                isCollapsed={false}
                isMobile
                onCloseMobile={onCloseMobile}
                onToggleCollapse={onToggleCollapse}
              />
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
