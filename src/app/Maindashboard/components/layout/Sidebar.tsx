'use client';

import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Building2,
  ChevronRight,
  Gauge,
  GraduationCap,
  LayoutGrid,
  LineChart,
  LucideIcon,
  Menu,
  ShieldCheck,
  Sparkles,
  Target,
  UsersRound,
  X,
} from 'lucide-react';
import { useEffect, useMemo, useState, useRef } from 'react';

type SidebarProps = {
  isCollapsed: boolean;
  isMobileOpen: boolean;
  onCloseMobile: () => void;
  onToggleCollapse: () => void;
};

type MenuItem = {
  label: string;
  icon?: LucideIcon;
  href?: string;
  badge?: string;
  children?: MenuItem[];
};

const MdiToLucideMap: Record<string, LucideIcon> = {
  'mdi mdi-domain': Building2,
  'mdi mdi-file-certificate': Target,
  'mdi mdi-account-group': UsersRound,
  'mdi mdi-school-outline': GraduationCap,
  'mdi mdi-account-multiple': UsersRound,
  'mdi mdi-file-chart': LineChart,
  'mdi mdi-alpha-s-circle': Sparkles,
};

const platformMetrics = [
  { label: 'Readiness', value: '92%', icon: ShieldCheck },
  { label: 'Growth Plans', value: '148', icon: GraduationCap },
];

const sidebarTransition = {
  duration: 0.34,
  ease: [0.22, 1, 0.36, 1] as const,
};

const isHrefActive = (pathname: string, href?: string) =>
  !!href && href !== '#' && (pathname === href || (href !== '/' && pathname.startsWith(`${href}/`)));

const itemHasActiveChild = (pathname: string, item: MenuItem): boolean =>
  Boolean(item.children?.some((child) => isHrefActive(pathname, child.href) || itemHasActiveChild(pathname, child)));

function getActiveMenuLabels(pathname: string, items: MenuItem[]) {
  const result: string[] = [];

  function dfs(node: MenuItem, ancestors: string[]) {
    if (isHrefActive(pathname, node.href)) {
      result.push(...ancestors, node.label);
      return true;
    }

    for (const child of node.children || []) {
      if (dfs(child, [...ancestors, node.label])) {
        return true;
      }
    }

    return false;
  }

  items.forEach((item) => dfs(item, []));
  return Array.from(new Set(result));
}

function menuHref(value?: string) {
  if (!value) return '#';
  if (value.startsWith('http') || value.startsWith('/')) return value;
  return `/${value}`;
}

function SidebarContent({
  isCollapsed,
  onToggleCollapse,
  onCloseMobile,
  isMobile = false,
  menuItems,
  isLoading,
}: {
  isCollapsed: boolean;
    onToggleCollapse: () => void;
    onCloseMobile?: () => void;
    isMobile?: boolean;
    menuItems: MenuItem[];
    isLoading: boolean;
}) {
  const pathname = usePathname();
  const [openMenus, setOpenMenus] = useState<string[]>([]);
  const activeMenuLabels = useMemo(() => getActiveMenuLabels(pathname, menuItems), [pathname, menuItems]);
  const collapsedMetrics = useMemo(() => platformMetrics.slice(0, 1), []);

  useEffect(() => {
    if (activeMenuLabels.length) {
      setOpenMenus((current) => Array.from(new Set([...current, ...activeMenuLabels])));
    }
  }, [activeMenuLabels]);

  const toggleMenu = (label: string) => {
    if (isCollapsed) {
      onToggleCollapse();
      setOpenMenus((current) => Array.from(new Set([...current, label])));
      return;
    }

    setOpenMenus((current) => (current.includes(label) ? current.filter((item) => item !== label) : [...current, label]));
  };

  const handleNavigate = () => {
    onCloseMobile?.();
  };

  const renderChildItem = (item: MenuItem, depth: number) => {
    const hasChildren = Boolean(item.children?.length);
    const isOpen = openMenus.includes(item.label);
    const isActive = isHrefActive(pathname, item.href) || itemHasActiveChild(pathname, item);

    const className = [
      'group/sub relative flex w-full items-center gap-3 text-left font-semibold transition duration-300 focus:outline-none focus:ring-2 focus:ring-[#FF6A00]/35',
      hasChildren ? 'min-h-11 rounded-2xl px-3 py-2.5' : 'min-h-12 rounded-[1.1rem] px-4 py-2.5',
      isActive ? 'bg-white/12 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]' : 'text-[#D1DAFF] hover:bg-white/8 hover:text-white',
    ].join(' ');

    const connectorLeft = depth === 0 ? '-0.5rem' : '-1.5rem';
    const dotLeft = depth === 0 ? '-0.875rem' : '-1.875rem';
    const connectorWidth = depth === 0 ? '1.35rem' : '1.25rem';

    const branch = (
      <>
        <span
          className="absolute top-1/2 h-px bg-[#FF6A00]/80 transition group-hover/sub:bg-[#FF8A33]"
          style={{ left: connectorLeft, width: connectorWidth }}
        />
        <span
          className={[
            'absolute top-1/2 h-3 w-3 -translate-y-1/2 rounded-full border transition',
            isActive
              ? 'border-[#FFB176] bg-[#FF6A00] shadow-[0_0_16px_rgba(255,106,0,0.72)]'
              : 'border-[#FF6A00]/80 bg-[#18245D] group-hover/sub:scale-110 group-hover/sub:bg-[#FF6A00]',
          ].join(' ')}
          style={{ left: dotLeft }}
        />
      </>
    );


    return (
      <div key={item.label} className="relative">
        {hasChildren ? (
          <button type="button" onClick={() => toggleMenu(item.label)} className={className} aria-expanded={isOpen}>
            {branch}
            <span className="min-w-0 flex-1 whitespace-normal break-words text-[0.84rem]">{item.label}</span>
            <ChevronRight className={['h-4 w-4 shrink-0 text-white/70 transition duration-300', isOpen ? 'rotate-90 text-white' : ''].join(' ')} />
          </button>
        ) : (
          <Link href={item.href || '#'} onClick={handleNavigate} className={className} aria-current={isActive ? 'page' : undefined}>
            {branch}
            <span className="min-w-0 whitespace-normal break-words text-[0.84rem]">{item.label}</span>
          </Link>
        )}

        <AnimatePresence initial={false}>
          {hasChildren && isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
            >
              <div className="relative mt-2 space-y-2 pl-6">
                <span className="absolute bottom-6 left-0 top-0 w-px bg-gradient-to-b from-[#FF6A00]/60 to-[#7D6BFF]/35" />
                {item.children?.map((child) => renderChildItem(child, depth + 1))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  };

  const renderTopItem = (item: MenuItem) => {
    const Icon = item.icon || LayoutGrid;
    const hasChildren = Boolean(item.children?.length);
    const isOpen = openMenus.includes(item.label);
    const isActive = isHrefActive(pathname, item.href) || itemHasActiveChild(pathname, item);

    const className = [
      'group relative flex w-full items-center gap-2 overflow-hidden border text-left transition-all duration-300',
      isCollapsed
        ? 'h-10 justify-center rounded-2xl border-transparent bg-transparent p-0 text-[#B8C4F1] hover:text-white'
        : 'min-h-[2.2rem] rounded-[1rem] px-2 py-1.5',
      !isCollapsed && isActive ? 'g2g-sidebar-active border-white/30 text-white' : '',
      !isCollapsed && !isActive
        ? 'border-white/10 bg-white/[0.058] text-[#D9E0FF] hover:border-white/18 hover:bg-white/[0.095] hover:text-white'
        : '',
      isCollapsed && isActive ? 'text-white' : '',
    ].join(' ');

    const content = (
      <>
        {!isCollapsed && isActive && <span className="g2g-active-beam" />}
        <span
          className={[
            'relative z-10 flex shrink-0 items-center justify-center transition-all duration-300',
            isCollapsed ? 'h-6 w-6 rounded-2xl' : 'h-8 w-8 rounded-[1.05rem] border',
            !isCollapsed && isActive ? 'border-white/30 bg-white/18 text-white shadow-[0_0_26px_rgba(255,106,0,0.34)]' : '',
            !isCollapsed && !isActive ? 'border-white/12 bg-white/8 text-[#B9C4FF] group-hover:text-white' : '',
          ].join(' ')}
        >
          <Icon className={isCollapsed ? 'h-4 w-4' : 'h-3.5 w-3.5'} />
          {isCollapsed && (
            <span className="pointer-events-none absolute left-full top-1/2 ml-3 -translate-y-1/2 rounded-lg bg-[#18245D] px-2.5 py-1.5 text-xs font-semibold text-white opacity-0 shadow-xl transition-opacity group-hover:opacity-100">
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
              className="relative z-10 flex min-w-0 flex-1 items-center justify-between gap-3"
            >
              <span className="min-w-0">
                <span className="block whitespace-normal break-words text-[0.92rem] font-semibold leading-tight">{item.label}</span>
                {item.badge && (
                  <span className="mt-1 block text-[11px] font-semibold uppercase tracking-[0.14em] text-[#FFB176]">
                    {item.badge}
                  </span>
                )}
              </span>
              {hasChildren && (
                <ChevronRight
                  className={[
                    'h-5 w-5 shrink-0 text-white/70 transition duration-300',
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
      <div key={item.label} className="relative">
        {hasChildren ? (
          <motion.button
            type="button"
            onClick={() => toggleMenu(item.label)}
            whileHover={isCollapsed ? undefined : { y: -2 }}
            whileTap={{ scale: 0.985 }}
            className={className}
            aria-expanded={isOpen}
          >
            {content}
          </motion.button>
        ) : (
          <motion.div whileHover={isCollapsed ? undefined : { y: -2 }} whileTap={{ scale: 0.985 }}>
            <Link href={item.href || '#'} onClick={handleNavigate} className={className} aria-current={isActive ? 'page' : undefined}>
              {content}
            </Link>
          </motion.div>
        )}

        <AnimatePresence initial={false}>
          {hasChildren && isOpen && !isCollapsed && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
            >
              <div className="relative ml-[1.65rem] mt-2 space-y-2 rounded-[1.35rem] border border-white/[0.055] bg-[#07133E]/24 px-3 py-2 pl-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]">
                <span className="absolute bottom-6 left-3 top-0 w-px bg-gradient-to-b from-[#FF6A00]/85 via-[#7D6BFF]/70 to-[#7D6BFF]/25" />
                {item.children?.map((child) => renderChildItem(child, 0))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  };

  return (
    <div
      className={[
        'g2g-sidebar-surface flex h-full flex-col overflow-hidden text-white transition-all duration-300',
        isCollapsed ? 'g2g-sidebar-collapsed' : '',
      ].join(' ')}
    >
      <div
        className={[
          'relative z-10 flex shrink-0 items-center transition-all duration-300',
          isCollapsed ? 'h-14 justify-center px-0' : 'h-20 px-2',
        ].join(' ')}
      >
        <AnimatePresence initial={false}>
          {!isCollapsed && (
            <motion.div
              layout
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: 'auto' }}
              exit={{ opacity: 0, width: 0 }}
              transition={sidebarTransition}
              className="flex min-w-0 items-center gap-3 overflow-hidden whitespace-nowrap"
            >
              <div className="g2g-logo-mark shrink-0">
                <Sparkles className="h-5 w-5" aria-hidden="true" />
              </div>
              <div className="flex min-w-0 flex-col justify-center">
                <p className="truncate text-base font-bold leading-tight">GapsToGrowth</p>
                <p className="truncate text-[11px] font-semibold text-[#AEB9F5]">Competency OS</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          layout
          type="button"
          onClick={isMobile ? onCloseMobile : onToggleCollapse}
          className={[
            'flex shrink-0 items-center justify-center rounded-[1.2rem] text-white transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-[#FF6A00]/50',
            isCollapsed
              ? 'h-8 w-8 border-0 bg-transparent hover:bg-white/8'
              : 'ml-auto h-10 w-10 border border-white/12 bg-white/8 hover:bg-white/14',
          ].join(' ')}
          aria-label={isMobile ? 'Close navigation menu' : isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {isMobile ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </motion.button>
      </div>

      <div className="g2g-scrollbar relative z-10 min-h-0 flex-1 overflow-y-auto px-2 pb-3">
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
                  <div key={metric.label} className="flex h-7 w-7 items-center justify-center text-[#FFB176]">
                    <Icon className="h-5 w-5" />
                  </div>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>

        <nav className="space-y-3" aria-label="Main navigation">
          {isLoading ? (
            <div className="flex justify-center p-8">
              <svg className="h-5 w-5 animate-spin text-[#FFB176]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
            </div>
          ) : (
            menuItems.map(renderTopItem)
          )}
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

  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sessionData, setSessionData] = useState({
    url: "",
    token: "",
    orgType: "",
    subInstituteId: "",
    userId: "",
    userProfile: "",
    userimage: "",
  });

  useEffect(() => {
    const userData = localStorage.getItem("userData");
    if (userData) {
      const {
        APP_URL,
        token,
        org_type,
        sub_institute_id,
        user_id,
        user_profile_name,
        user_image,
      } = JSON.parse(userData);

      setSessionData({
        url: APP_URL,
        token,
        orgType: org_type,
        subInstituteId: sub_institute_id,
        userId: user_id,
        userProfile: user_profile_name,
        userimage: user_image,
      });
    }
    setTimeout(() => setIsLoading(false), 300);
  }, []);

  const hasFetched = useRef(false);

  useEffect(() => {
    function formatAndSetData(data: any) {
      const formatted: MenuItem[] = (data.level_1 || []).map((l1: any) => {
        const icon = l1.icon && MdiToLucideMap[l1.icon] ? MdiToLucideMap[l1.icon] : l1.menu_name === 'Dashboard' ? Gauge : LayoutGrid;
        const l2List = data.level_2?.[l1.id] ? Object.values(data.level_2[l1.id]) : [];
        const children: MenuItem[] | undefined = l2List.length
          ? l2List.map((l2: any) => {
            const l3List = data.level_3?.[l2.id] ? Object.values(data.level_3[l2.id]) : [];
            const grandchildren: MenuItem[] | undefined = l3List.length
              ? l3List.map((l3: any) => ({
                label: l3.menu_name,
                href: menuHref(l3.access_link),
              }))
              : undefined;

            return {
              label: l2.menu_name,
              href: menuHref(l2.access_link),
              children: grandchildren,
            };
          })
          : undefined;

        return {
          label: l1.menu_name,
          href: menuHref(l1.access_link),
          icon,
          children,
        };
      });

      setMenuItems(formatted);
    }

    async function fetchMenu() {
      if (!sessionData) return;
      if (hasFetched.current) return;
      if (
        !sessionData.url ||
        !sessionData.token ||
        !sessionData.subInstituteId ||
        !sessionData.userProfile
      ) {
        return;
      }
      hasFetched.current = true;
      // try {
      //   const cached = localStorage.getItem('g2g_sidebar_menu_cache');
      //   if (cached) {
      //     formatAndSetData(JSON.parse(cached));
      //     setIsLoading(false);
      //   }
      // } catch (e) {
      //   console.error('Failed to parse sidebar cache', e);
      // }

      try {
        const res = await fetch(`${sessionData.url}/user/ajax_groupwiserights?type=API&token=${sessionData.token}&sub_institute_id=${sessionData.subInstituteId}&profile_id=${sessionData.userProfile}`);
        const data = await res.json();
        localStorage.setItem('g2g_sidebar_menu_cache', JSON.stringify(data));
        formatAndSetData(data);
      } catch (e) {
        console.error('Failed to fetch sidebar menu:', e);
      } finally {
        setIsLoading(false);
      }
    }

    fetchMenu();
  }, [sessionData]);

  return (
    <>
      <motion.aside
        layout
        animate={{ width: isCollapsed ? 78 : 300 }}
        transition={sidebarTransition}
        className="sticky top-0 z-30 hidden h-[100dvh] max-h-[100dvh] shrink-0 p-1 lg:block xl:p-2"
      >
        <SidebarContent isCollapsed={isCollapsed} onToggleCollapse={onToggleCollapse} menuItems={menuItems} isLoading={isLoading} />
      </motion.aside>

      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            className="fixed inset-0 z-50 h-[100dvh] overflow-hidden lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <button type="button" className="absolute inset-0 bg-[#071033]/60 backdrop-blur-sm" onClick={onCloseMobile} aria-label="Close navigation overlay" />
            <motion.aside
              initial={{ x: -340 }}
              animate={{ x: 0 }}
              exit={{ x: -340 }}
              transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
              className="relative h-[100dvh] w-[min(86vw,320px)] p-3"
            >
              <SidebarContent
                isCollapsed={false}
                isMobile
                onCloseMobile={onCloseMobile}
                onToggleCollapse={onToggleCollapse}
                menuItems={menuItems}
                isLoading={isLoading}
              />
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
