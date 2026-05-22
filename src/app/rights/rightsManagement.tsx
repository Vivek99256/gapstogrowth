'use client';

import { AnimatePresence, motion } from 'framer-motion'
import {
  AlertCircle,
  Check,
  CheckCircle2,
  ChevronRight,
  Eye,
  Loader2,
  Monitor,
  Pencil,
  Plus,
  RefreshCw,
  ShieldCheck,
  Smartphone,
  Trash2,
  X,
} from 'lucide-react';
import { useCallback, useEffect, useMemo, useState } from 'react';




type Role = string;
type PermissionKey = 'view' | 'add' | 'edit' | 'delete' | 'dashboard' | 'mobile';

type RoleApi = {
  id: number | string;
  name: string;
};

type ApiPermissionItem = {
  id: number | string;
  menu_name: string;
  parent_id: number | string;
  level: number | string;
  page_type?: string | null;
  access_link?: string | null;
  icon?: string | null;
  status?: number | string;
  sort_order?: number | string | null;
  can_view: number | string;
  can_add: number | string;
  can_edit: number | string;
  can_delete: number | string;
  dashboard_right: number | string;
  is_mobile: number | string;
};

type ApiPermissionResponse = {
  level_1?: ApiPermissionItem[] | Record<string, ApiPermissionItem>;
  level_2?: Record<string, ApiPermissionItem[] | Record<string, ApiPermissionItem>>;
  level_3?: Record<string, ApiPermissionItem[] | Record<string, ApiPermissionItem>>;
};

type PermissionState = Record<PermissionKey, boolean>;

type PermissionNode = {
  id: string;
  parentId: string;
  name: string;
  level: number;
  sortOrder: number;
  pageType?: string | null;
  accessLink?: string | null;
  children: PermissionNode[];
};

type RoleSnapshot = {
  tree: PermissionNode[];
  permissions: Record<string, PermissionState>;
};

type SessionData = {
  url: string;
  token: string;
  subInstituteId: string;
};

const PERMISSION_KEYS: PermissionKey[] = ['view', 'add', 'edit', 'delete', 'dashboard', 'mobile'];

const EMPTY_PERMISSION: PermissionState = {
  view: false,
  add: false,
  edit: false,
  delete: false,
  dashboard: false,
  mobile: false,
};

const FULL_PERMISSION: PermissionState = {
  view: true,
  add: true,
  edit: true,
  delete: true,
  dashboard: true,
  mobile: true,
};

const PERMISSION_META: Record<PermissionKey, { label: string; Icon: typeof Eye }> = {
  view: { label: 'View', Icon: Eye },
  add: { label: 'Add', Icon: Plus },
  edit: { label: 'Edit', Icon: Pencil },
  delete: { label: 'Delete', Icon: Trash2 },
  dashboard: { label: 'Dashboard', Icon: Monitor },
  mobile: { label: 'Mobile', Icon: Smartphone },
};

const LEVEL_STYLES: Record<number, {
  badge: string;
  line: string;
  row: string;
  switchOn: string;
  text: string;
}> = {
  1: {
    badge: 'bg-[#fff3e8] text-[#c45b00] border-[#ffd2ad]',
    line: 'bg-[#ff6a00]',
    row: 'bg-white hover:bg-[#fff8f2]',
    switchOn: 'bg-[#ff6a00]',
    text: 'text-[#1f2a6d]',
  },
  2: {
    badge: 'bg-[#f0f3ff] text-[#2e3a8c] border-[#cfd7ff]',
    line: 'bg-[#2e3a8c]',
    row: 'bg-[#fcfdff] hover:bg-[#f5f7ff]',
    switchOn: 'bg-[#2e3a8c]',
    text: 'text-[#24306f]',
  },
  3: {
    badge: 'bg-[#ecfdf5] text-[#047857] border-[#bbf7d0]',
    line: 'bg-[#059669]',
    row: 'bg-white hover:bg-[#f4fbf8]',
    switchOn: 'bg-[#059669]',
    text: 'text-[#111827]',
  },
};

function boolFromApi(value: number | string | undefined) {
  return Number(value ?? 0) === 1;
}

function toArray(bucket?: ApiPermissionItem[] | Record<string, ApiPermissionItem>) {
  if (!bucket) return [];
  return Array.isArray(bucket) ? bucket : Object.values(bucket);
}

function getNestedBucketItems(
  bucket: ApiPermissionResponse['level_2'] | ApiPermissionResponse['level_3'],
  parentId: string,
) {
  if (!bucket) return [];
  return toArray(bucket[parentId] || bucket[Number(parentId)]);
}

function permissionFromApi(item: ApiPermissionItem): PermissionState {
  return {
    view: boolFromApi(item.can_view),
    add: boolFromApi(item.can_add),
    edit: boolFromApi(item.can_edit),
    delete: boolFromApi(item.can_delete),
    dashboard: boolFromApi(item.dashboard_right),
    mobile: boolFromApi(item.is_mobile),
  };
}

function sortItems(items: ApiPermissionItem[]) {
  return [...items].filter((item) => item.status === undefined || Number(item.status) === 1).sort((a, b) => {
    const sortA = Number(a.sort_order ?? 9999);
    const sortB = Number(b.sort_order ?? 9999);
    return sortA - sortB || String(a.menu_name).localeCompare(String(b.menu_name));
  });
}

function normalizeApiResponse(data: ApiPermissionResponse): RoleSnapshot {
  const permissions: Record<string, PermissionState> = {};

  const makeNode = (item: ApiPermissionItem): PermissionNode => {
    const id = String(item.id);
    const level = Number(item.level || 1);

    permissions[id] = permissionFromApi(item);

    const nextLevel = level + 1;
    const childItems =
      nextLevel === 2
        ? getNestedBucketItems(data.level_2, id)
        : nextLevel === 3
          ? getNestedBucketItems(data.level_3, id)
          : [];

    return {
      id,
      parentId: String(item.parent_id ?? '0'),
      name: item.menu_name,
      level,
      sortOrder: Number(item.sort_order ?? 9999),
      pageType: item.page_type,
      accessLink: item.access_link,
      children: sortItems(childItems).map(makeNode),
    };
  };

  return {
    tree: sortItems(toArray(data.level_1)).map(makeNode),
    permissions,
  };
}

function collectNodeIds(node: PermissionNode): string[] {
  return [node.id, ...node.children.flatMap(collectNodeIds)];
}

function collectDescendantIds(node: PermissionNode): string[] {
  return node.children.flatMap(collectNodeIds);
}

function findNode(nodes: PermissionNode[], id: string): PermissionNode | null {
  for (const node of nodes) {
    if (node.id === id) return node;
    const nested = findNode(node.children, id);
    if (nested) return nested;
  }
  return null;
}

function buildParentMap(nodes: PermissionNode[]) {
  const map: Record<string, string | null> = {};

  const walk = (items: PermissionNode[], parentId: string | null) => {
    items.forEach((item) => {
      map[item.id] = parentId;
      walk(item.children, item.id);
    });
  };

  walk(nodes, null);
  return map;
}

function buildDefaultExpanded(nodes: PermissionNode[]) {
  const expanded: Record<string, boolean> = {};

  const walk = (items: PermissionNode[]) => {
    items.forEach((item) => {
      if (item.children.length) {
        expanded[item.id] = true;
        walk(item.children);
      }
    });
  };

  walk(nodes);
  return expanded;
}

function countNodes(nodes: PermissionNode[]): number {
  return nodes.reduce((sum, node) => sum + 1 + countNodes(node.children), 0);
}

function appendPermissionsToFormData(
  formData: FormData,
  node: PermissionNode,
  permissions: Record<string, PermissionState>,
) {
  const permission = permissions[node.id] || EMPTY_PERMISSION;
  const fields: Array<[PermissionKey, string]> = [
    ['view', 'view'],
    ['add', 'add'],
    ['edit', 'edit'],
    ['delete', 'delete'],
    ['dashboard', 'dashboard_right'],
    ['mobile', 'is_mobile'],
  ];

  fields.forEach(([key, fieldName]) => {
    if (permission[key]) {
      formData.append(`${fieldName}[${node.id}][]`, '1');
    }
  });

  node.children.forEach((child) => appendPermissionsToFormData(formData, child, permissions));
}


function FixedThemeBoundary({ children }: { children: React.ReactNode }) {
  return (
    <section
      className="rights-fixed-theme text-[#111827]"
      style={{ colorScheme: 'light' }}
    >
      {children}  
    </section>
  );
}

function ToggleSwitch({
  checked,
  disabled,
  label,
  level,
  onChange,
}: {
  checked: boolean;
  disabled?: boolean;
  label: string;
  level: number;
  onChange: () => void;
}) {
  const style = LEVEL_STYLES[level] || LEVEL_STYLES[3];

  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      disabled={disabled}
      onClick={onChange}
      className={[
        'relative inline-flex h-6 w-11 shrink-0 items-center rounded-full border border-transparent transition-all duration-200',
        'focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ff6a00]/35 focus-visible:ring-offset-2 focus-visible:ring-offset-white',
        disabled ? 'cursor-not-allowed opacity-60' : 'cursor-pointer hover:shadow-sm',
        checked ? style.switchOn : 'bg-[#d7dce5]',
      ].join(' ')}
    >
      <span
        aria-hidden="true"
        className={[
          'inline-block h-[18px] w-[18px] rounded-full bg-white shadow-[0_2px_6px_rgba(15,23,42,0.22)] transition-transform duration-200',
          checked ? 'translate-x-[21px]' : 'translate-x-[3px]',
        ].join(' ')}
      />
    </button>
  );
}

function RoleSelector({
  activeRole,
  loading,
  roles,
  onRoleChange,
  snapshots,
}: {
  activeRole: Role;
  loading: boolean;
  roles: RoleApi[];
  onRoleChange: (role: RoleApi) => void;
  snapshots: Partial<Record<Role, RoleSnapshot>>;
}) {
  if (!roles.length) {
    return null;
  }

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-3" role="tablist" aria-label="Select role">
      {roles.map((role) => {
        const roleName = String(role.name);
        const active = roleName === activeRole;
        const modules = snapshots[roleName]?.tree.length ?? 0;
        const menus = snapshots[roleName] ? countNodes(snapshots[roleName]!.tree) : 0;

        return (
          <button
            key={role.id}
            type="button"
            role="tab"
            aria-selected={active}
            onClick={() => onRoleChange(role)}
            className={[
              'group relative overflow-hidden rounded-2xl border p-4 text-left transition-all duration-200',
              'focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ff6a00]/35',
              active
                ? 'border-[#ffb177] bg-[#fff7ef] shadow-[0_16px_38px_rgba(255,106,0,0.16)]'
                : 'border-[#e5e7eb] bg-white shadow-sm hover:-translate-y-0.5 hover:border-[#cfd7ff] hover:shadow-md',
            ].join(' ')}
          >
            <span className="flex items-center justify-between gap-3">
              <span className="flex items-center gap-3">
                <span
                  className={[
                    'flex h-10 w-10 items-center justify-center rounded-xl transition-colors',
                    active ? 'bg-[#1f2a6d] text-white' : 'bg-[#f0f3ff] text-[#2e3a8c]',
                  ].join(' ')}
                >
                  <ShieldCheck className="h-5 w-5" aria-hidden="true" />
                </span>
                <span>
                  <span className="block text-sm font-bold text-[#111827]">{roleName}</span>
                  <span className="mt-1 block text-xs text-[#6b7280]">
                    {loading && active ? 'Loading rights...' : `${modules} modules, ${menus} menus`}
                  </span>
                </span>
              </span>
              {active && <CheckCircle2 className="h-5 w-5 text-[#ff6a00]" aria-hidden="true" />}
            </span>
          </button>
        );
      })}
    </div>
  );
}


function PermissionRow({
  expanded,
  node,
  permissions,
  updating,
  onApplyModule,
  onToggleExpand,
  onTogglePermission,
}: {
  expanded: Record<string, boolean>;
  node: PermissionNode;
  permissions: Record<string, PermissionState>;
  updating?: boolean;
  onApplyModule: (nodeId: string, permissions: PermissionKey[], enabled: boolean) => void;
  onToggleExpand: (nodeId: string) => void;
  onTogglePermission: (nodeId: string, permission: PermissionKey) => void;
}) {
  const isParent = node.children.length > 0;
  const isExpanded = expanded[node.id] ?? true;
  const style = LEVEL_STYLES[node.level] || LEVEL_STYLES[3];
  const permission = permissions[node.id] || EMPTY_PERMISSION;

  return (
    <>
      <motion.tr
        layout
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -5 }}
        transition={{ duration: 0.16 }}
        className={`border-b border-[#eef0f4] ${style.row}`}
      >
        <td className="w-[34%] px-2 py-2 align-middle">
          <div className="flex min-w-0 items-center gap-2" style={{ paddingLeft: `${(node.level - 1) * 12}px` }}>
            {isParent ? (
              <button
                type="button"
                onClick={() => onToggleExpand(node.id)}
                aria-expanded={isExpanded}
                aria-label={isExpanded ? `Collapse ${node.name}` : `Expand ${node.name}`}
                className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-[#e5e7eb] bg-white text-[#6b7280] transition hover:border-[#cfd7ff] hover:text-[#2e3a8c] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ff6a00]/35"
              >
                <ChevronRight
                  className={`h-4 w-4 transition-transform duration-200 ${isExpanded ? 'rotate-90' : ''}`}
                  aria-hidden="true"
                />
              </button>
            ) : (
              <span className="h-7 w-7 shrink-0" aria-hidden="true" />
            )}
            <span className={`h-8 w-1 shrink-0 rounded-full ${style.line}`} aria-hidden="true" />
            <span className="min-w-0 flex-1">
              <span className={`block truncate text-xs font-bold lg:text-sm ${style.text}`}>{node.name}</span>
              <span className="mt-1 flex flex-wrap items-center gap-1">

              </span>
            </span>
           
          </div>
        </td>
        {PERMISSION_KEYS.map((key) => (
          <td key={key} className="w-[11%] px-1 py-2 text-center align-middle">
            <div className="flex flex-col items-center justify-center gap-1">
              <ToggleSwitch
                checked={permission[key]}
                disabled={updating}
                label={`${PERMISSION_META[key].label} permission for ${node.name}`}
                level={node.level}
                onChange={() => onTogglePermission(node.id, key)}
              />
              
            </div>
          </td>
        ))}
      </motion.tr>
      <AnimatePresence initial={false}>
        {isParent && isExpanded && node.children.map((child) => (
          <PermissionRow
            key={child.id}
            expanded={expanded}
            node={child}
            permissions={permissions}
            updating={updating}
            onApplyModule={onApplyModule}
            onToggleExpand={onToggleExpand}
            onTogglePermission={onTogglePermission}
          />
        ))}
      </AnimatePresence>
    </>
  );
}

function PermissionTable({
  expanded,
  permissions,
  tree,
  updating,
  totalMenus,
  onApplyAllPermission,
  onApplyModule,
  onToggleExpand,
  onTogglePermission,
}: {
  expanded: Record<string, boolean>;
  permissions: Record<string, PermissionState>;
  tree: PermissionNode[];
  updating?: boolean;
  totalMenus: number;
  onApplyAllPermission: (permission: PermissionKey, enabled: boolean) => void;
  onApplyModule: (nodeId: string, permissions: PermissionKey[], enabled: boolean) => void;
  onToggleExpand: (nodeId: string) => void;
  onTogglePermission: (nodeId: string, permission: PermissionKey) => void;
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-[#e5e7eb] bg-white shadow-[0_16px_42px_rgba(31,42,109,0.08)]">
      <div className="w-full overflow-hidden">
        <table className="w-full table-fixed border-collapse" role="grid">
          <thead>
            <tr className="sticky top-0 z-20 border-b border-[#e5e7eb] bg-[#f8fafc] shadow-sm">
              <th scope="col" className="w-[34%] px-2 py-3 text-left text-[11px] font-black uppercase tracking-wide text-[#6b7280]">
                Menu Name
              </th>
              {PERMISSION_KEYS.map((key) => {
                const { Icon, label } = PERMISSION_META[key];
                const enabledCount = Object.values(permissions).filter((permission) => permission[key]).length;
                const allEnabled = totalMenus > 0 && enabledCount === totalMenus;

                return (
                  <th key={key} scope="col" className="w-[11%] px-1 py-3 text-center text-[10px] font-black uppercase tracking-normal text-[#6b7280]">
                    <span className="inline-flex flex-col items-center justify-center gap-1">
                      <span className="inline-flex flex-col items-center gap-0.5 leading-tight">
                        <Icon className="h-3.5 w-3.5" aria-hidden="true" />
                        <span className="break-words">{label}</span>
                      </span>
                      <ToggleSwitch 
                        checked={allEnabled}
                        disabled={updating || totalMenus === 0}
                        label={`${allEnabled ? 'Disable' : 'Enable'} ${label} for all modules`}
                        level={1}
                        onChange={() => onApplyAllPermission(key, !allEnabled)}
                      />
                    </span>
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            <AnimatePresence initial={false}>
              {tree.map((node) => (
                <PermissionRow
                  key={node.id}
                  expanded={expanded}
                  node={node}
                  permissions={permissions}
                  updating={updating}
                  onApplyModule={onApplyModule}
                  onToggleExpand={onToggleExpand}
                  onTogglePermission={onTogglePermission}
                />
              ))}
            </AnimatePresence>
          </tbody>
        </table>
      </div>
    </div>
  );
}

function MobilePermissionTree({
  expanded,
  permissions,
  tree,
  updating,
  onApplyModule,
  onToggleExpand,
  onTogglePermission,
}: {
  expanded: Record<string, boolean>;
  permissions: Record<string, PermissionState>;
  tree: PermissionNode[];
  updating?: boolean;
  onApplyModule: (nodeId: string, permissions: PermissionKey[], enabled: boolean) => void;
  onToggleExpand: (nodeId: string) => void;
  onTogglePermission: (nodeId: string, permission: PermissionKey) => void;
}) {
  const renderNode = (node: PermissionNode) => {
    const isParent = node.children.length > 0;
    const isExpanded = expanded[node.id] ?? true;
    const style = LEVEL_STYLES[node.level] || LEVEL_STYLES[3];
    const permission = permissions[node.id] || EMPTY_PERMISSION;

    return (
      <div key={node.id} className="rounded-2xl border border-[#e5e7eb] bg-white p-4 shadow-sm">
        <div className="flex items-start gap-3">
          {isParent ? (
            <button
              type="button"
              onClick={() => onToggleExpand(node.id)}
              className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-[#e5e7eb] bg-white text-[#6b7280]"
              aria-expanded={isExpanded}
            >
              <ChevronRight className={`h-4 w-4 transition-transform ${isExpanded ? 'rotate-90' : ''}`} aria-hidden="true" />
            </button>
          ) : (
            <span className={`mt-1 h-7 w-1 rounded-full ${style.line}`} aria-hidden="true" />
          )}
          <div className="min-w-0 flex-1">
            <p className={`text-sm font-bold ${style.text}`}>{node.name}</p>
            <div className="mt-2 flex flex-wrap items-center gap-2">
              <span className={`rounded-full border px-2 py-0.5 text-[11px] font-bold ${style.badge}`}>Level {node.level}</span>
            </div>
          </div>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-3">
          {PERMISSION_KEYS.map((key) => {
            const { Icon, label } = PERMISSION_META[key];
            return (
              <div key={key} className="flex items-center justify-between rounded-xl bg-[#f8fafc] px-3 py-2">
                <span className="inline-flex items-center gap-2 text-xs font-bold text-[#4b5563]">
                  <Icon className="h-3.5 w-3.5 text-[#2e3a8c]" aria-hidden="true" />
                  {label}
                </span>
                <ToggleSwitch
                  checked={permission[key]}
                  disabled={updating}
                  label={`${label} permission for ${node.name}`}
                  level={node.level}
                  onChange={() => onTogglePermission(node.id, key)}
                />
                <span className={`ml-1 text-[10px] font-black ${permission[key] ? 'text-[#047857]' : 'text-[#9ca3af]'}`}>
                  {permission[key] ? 'Yes / Enabled' : 'No / Disabled'}
                </span>
              </div>
            );
          })}
        </div>
        <AnimatePresence initial={false}>
          {isParent && isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="mt-3 space-y-3 overflow-hidden pl-3"
            >
              {node.children.map(renderNode)}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  };

  return <div className="space-y-3 md:hidden">{tree.map(renderNode)}</div>;
}

function LoadingState() {
  return (
    <div className="rounded-2xl border border-[#e5e7eb] bg-white p-8 text-center shadow-sm">
      <Loader2 className="mx-auto h-8 w-8 animate-spin text-[#ff6a00]" aria-hidden="true" />
      <p className="mt-4 text-sm font-bold text-[#111827]">Loading permission hierarchy</p>
      <p className="mt-1 text-xs text-[#6b7280]">Fetching role-wise rights from the server.</p>
    </div>
  );
}

function ErrorState({ message, onRetry }: { message: string; onRetry: () => void }) {
  return (
    <div className="rounded-2xl border border-[#fecaca] bg-[#fff7f7] p-6 shadow-sm">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#fee2e2] text-[#b91c1c]">
            <AlertCircle className="h-5 w-5" aria-hidden="true" />
          </span>
          <div>
            <p className="text-sm font-bold text-[#991b1b]">Unable to load permissions</p>
            <p className="mt-1 text-sm text-[#7f1d1d]">{message}</p>
          </div>
        </div>
        <button
          type="button"
          onClick={onRetry}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#1f2a6d] px-4 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-[#2e3a8c]"
        >
          <RefreshCw className="h-4 w-4" aria-hidden="true" />
          Retry
        </button>
      </div>
    </div>
  );
}

export default function RightsManagement() {
  const [activeRole, setActiveRole] = useState<Role>('');
  const [roles, setRoles] = useState<RoleApi[]>([]);
  const [snapshots, setSnapshots] = useState<Partial<Record<Role, RoleSnapshot>>>({});
  const [expandedByRole, setExpandedByRole] = useState<Partial<Record<Role, Record<string, boolean>>>>({});
  const [loadingRole, setLoadingRole] = useState<Role | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const [selectedProfileId, setSelectedProfileId] = useState<string>('');
  const [sessionData, setSessionData] = useState<SessionData | null>(null);
  const [rolesLoading, setRolesLoading] = useState(false);
  const [savingPermissions, setSavingPermissions] = useState(false);


  const snapshot = snapshots[activeRole];
  const tree = snapshot?.tree ?? [];
  const permissions = snapshot?.permissions ?? {};
  const expanded = expandedByRole[activeRole] ?? {};
  const totalMenus = useMemo(() => countNodes(tree), [tree]);

  const showToast = useCallback((message: string) => {
    setToast(message);
    window.setTimeout(() => setToast(null), 1800);
  }, []);

  
   useEffect(() => {
    if (typeof window !== "undefined") {
      const userData = localStorage.getItem("userData");
      if (userData) {
        try {
          const parsedData = JSON.parse(userData);
          const { APP_URL, token, sub_institute_id } = parsedData;

          if (APP_URL && token && sub_institute_id) {
            setSessionData({
              url: APP_URL,
              token,
              subInstituteId: String(sub_institute_id),
            });
          }
        } catch (error) {
          console.error("Error parsing userData:", error);
        }
      }
    }
  }, []);

  useEffect(() => {
    const fetchRoles = async () => {
      if (!sessionData) return;

      try {
        setRolesLoading(true);
        const response = await fetch(
          `${sessionData.url}/table_data?table=tbluserprofilemaster&filters[sub_institute_id]=${sessionData.subInstituteId}&filters[status]=1`,
          {
            headers: {
              Authorization: `Bearer ${sessionData.token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) throw new Error(`HTTP error! ${response.status}`);

        const data: RoleApi[] = await response.json();
        setRoles(data);

        if (data.length > 0) {
          setActiveRole(String(data[0].name));
          setSelectedProfileId(String(data[0].id));
        }
      } catch (error) {
        console.error("Error fetching roles:", error);
        setError('Failed to fetch roles.');
      } finally {
        setRolesLoading(false);
      }
    };

    fetchRoles();
  }, [sessionData]);

  const fetchPermissions = useCallback(async (role: Role, force = false) => {
    if (!sessionData || !selectedProfileId || !role) return;
    if (!force && snapshots[role]) return;

    setLoadingRole(role);
    setError(null);

    try {

      const response = await fetch(`${sessionData.url}/user/ajax_groupwiserights?type=API&token=${sessionData.token}&sub_institute_id=${sessionData.subInstituteId}&profile_id=${selectedProfileId}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${sessionData.token}`,
          'Content-Type': 'application/json',
        },
        cache: 'no-store',
      });

      if (!response.ok) {
        throw new Error(`Server returned ${response.status}`);
      }

      const data = (await response.json()) as ApiPermissionResponse;
      const normalized = normalizeApiResponse(data);

      setSnapshots((prev) => ({ ...prev, [role]: normalized }));
      setExpandedByRole((prev) => ({ ...prev, [role]: buildDefaultExpanded(normalized.tree) }));
    } catch (fetchError) {
      const message = fetchError instanceof Error ? fetchError.message : 'Unknown API error';
      setError(message);
    } finally {
      setLoadingRole((current) => (current === role ? null : current));
    }
  }, [selectedProfileId, sessionData, snapshots]);

  useEffect(() => {
    void fetchPermissions(activeRole);
  }, [activeRole, fetchPermissions]);

  const updatePermissions = useCallback((updater: (current: RoleSnapshot) => RoleSnapshot) => {
    setSnapshots((prev) => {
      const current = prev[activeRole];
      if (!current) return prev;
      return { ...prev, [activeRole]: updater(current) };
    });
  }, [activeRole]);

  const applyPermissionToNode = useCallback((
    snapshotToUpdate: RoleSnapshot,
    nodeId: string,
    keys: PermissionKey[],
    enabled: boolean,
  ) => {
    const targetNode = findNode(snapshotToUpdate.tree, nodeId);
    if (!targetNode) return snapshotToUpdate;

    const nextPermissions = { ...snapshotToUpdate.permissions };
    const affectedIds = [targetNode.id, ...collectDescendantIds(targetNode)];

    affectedIds.forEach((id) => {
      const current = nextPermissions[id] || EMPTY_PERMISSION;
      nextPermissions[id] = keys.reduce(
        (next, key) => ({ ...next, [key]: enabled }),
        { ...current },
      );
    });

    return { ...snapshotToUpdate, permissions: nextPermissions };
  }, []);

  const handleTogglePermission = useCallback((nodeId: string, key: PermissionKey) => {
    const current = permissions[nodeId]?.[key] ?? false;
    updatePermissions((currentSnapshot) => applyPermissionToNode(currentSnapshot, nodeId, [key], !current));
    showToast(`${PERMISSION_META[key].label} ${current ? 'disabled' : 'enabled'}`);
  }, [applyPermissionToNode, permissions, showToast, updatePermissions]);

  const handleApplyModule = useCallback((nodeId: string, keys: PermissionKey[], enabled: boolean) => {
    updatePermissions((currentSnapshot) => applyPermissionToNode(currentSnapshot, nodeId, keys, enabled));
    showToast(enabled ? 'Module permissions enabled' : 'Module permissions disabled');
  }, [applyPermissionToNode, showToast, updatePermissions]);

  const handleToggleExpand = useCallback((nodeId: string) => {
    setExpandedByRole((prev) => ({
      ...prev,
      [activeRole]: {
        ...(prev[activeRole] || {}),
        [nodeId]: !(prev[activeRole]?.[nodeId] ?? true),
      },
    }));
  }, [activeRole]);

  const grantAll = useCallback(() => {
    updatePermissions((currentSnapshot) => ({
      ...currentSnapshot,
      permissions: Object.fromEntries(
        Object.keys(currentSnapshot.permissions).map((id) => [id, { ...FULL_PERMISSION }]),
      ),
    }));
    showToast('All permissions enabled');
  }, [showToast, updatePermissions]);

  const revokeAll = useCallback(() => {
    updatePermissions((currentSnapshot) => ({
      ...currentSnapshot,
      permissions: Object.fromEntries(
        Object.keys(currentSnapshot.permissions).map((id) => [id, { ...EMPTY_PERMISSION }]),
      ),
    }));
    showToast('All permissions disabled');
  }, [showToast, updatePermissions]);

  const applyAllPermission = useCallback((key: PermissionKey, enabled: boolean) => {
    updatePermissions((currentSnapshot) => ({
      ...currentSnapshot,
      permissions: Object.fromEntries(
        Object.entries(currentSnapshot.permissions).map(([id, permission]) => [
          id,
          { ...permission, [key]: enabled },
        ]),
      ),
    }));
    showToast(`${PERMISSION_META[key].label} ${enabled ? 'enabled' : 'disabled'} for all modules`);
  }, [showToast, updatePermissions]);

  const savePermissions = useCallback(async () => {
    if (!sessionData || !selectedProfileId || !snapshot) {
      showToast('Permission data is not ready yet');
      return;
    }

    setSavingPermissions(true);

    try {
      const formData = new FormData();

      formData.append('type', 'API');
      formData.append('token', sessionData.token);
      formData.append('sub_institute_id', sessionData.subInstituteId);
      formData.append('profile_id', String(selectedProfileId));

      tree.forEach((menu) => {
        appendPermissionsToFormData(formData, menu, permissions);
      });

      const response = await fetch(`${sessionData.url}/user/add_groupwise_rights`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${sessionData.token}`,
        },
        body: formData,
      });

      if (!response.ok) throw new Error(`HTTP error! ${response.status}`);

      setSnapshots((prev) => ({
        ...prev,
        [activeRole]: {
          tree,
          permissions: JSON.parse(JSON.stringify(permissions)) as Record<string, PermissionState>,
        },
      }));
      showToast('Permissions updated');
    } catch (error) {
      console.error('Error saving:', error);
      setError('Failed to save permissions.');
      showToast('Failed to save permissions');
    } finally {
      setSavingPermissions(false);
    }
  }, [activeRole, permissions, selectedProfileId, sessionData, showToast, snapshot, tree]);

  const isLoading = rolesLoading || (loadingRole === activeRole && !snapshot);
  const isRefreshing = loadingRole === activeRole && Boolean(snapshot);

  return (
    <FixedThemeBoundary>
      <div className="space-y-6">
        <AnimatePresence>
          {toast && (
            <motion.div
              initial={{ opacity: 0, y: -12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.98 }}
              role="status"
              aria-live="polite"
              className="fixed right-5 top-5 z-[100] flex items-center gap-2 rounded-2xl bg-[#111827] px-4 py-3 text-sm font-bold text-white shadow-2xl"
            >
              <CheckCircle2 className="h-4 w-4 text-[#34d399]" aria-hidden="true" />
              {toast}
            </motion.div>
          )}
        </AnimatePresence>

        <div className="rounded-3xl border border-white/70 bg-white p-5 shadow-[0_22px_60px_rgba(31,42,109,0.10)] sm:p-6">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.18em] text-[#ff6a00]">Role Permission System</p>
              <h1 className="mt-2 text-2xl font-black tracking-tight text-[#111827] sm:text-3xl">Rights Management</h1>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-[#6b7280]">
                Manage user permissions and access rights for different roles.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => void fetchPermissions(activeRole, true)}
                className="inline-flex items-center gap-2 rounded-xl border border-[#d9def0] bg-white px-4 py-2.5 text-sm font-bold text-[#2e3a8c] shadow-sm transition hover:bg-[#f5f7ff]"
              >
                <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} aria-hidden="true" />
                Refresh
              </button>
              <button
                type="button"
                onClick={grantAll}
                disabled={!snapshot}
                className="rounded-xl border border-[#bbf7d0] bg-[#ecfdf5] px-4 py-2.5 text-sm font-bold text-[#047857] shadow-sm transition hover:bg-[#d1fae5] disabled:opacity-50"
              >
                Grant All
              </button>
              <button
                type="button"
                onClick={revokeAll}
                disabled={!snapshot}
                className="rounded-xl border border-[#fecaca] bg-[#fef2f2] px-4 py-2.5 text-sm font-bold text-[#b91c1c] shadow-sm transition hover:bg-[#fee2e2] disabled:opacity-50"
              >
                Revoke All
              </button>
              <button
                type="button"
                onClick={savePermissions} 
                disabled={!snapshot || savingPermissions}
                className="inline-flex items-center gap-2 rounded-xl bg-[linear-gradient(135deg,#1f2a6d,#2e3a8c_55%,#ff6a00)] px-4 py-2.5 text-sm font-black text-white shadow-[0_12px_28px_rgba(255,106,0,0.23)] transition hover:-translate-y-0.5 disabled:translate-y-0 disabled:opacity-50"
              >
                {savingPermissions ? (
                  <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                ) : (
                  <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
                )}
                {savingPermissions ? 'Saving...' : 'Save Permissions'}
              </button>
            </div>
          </div>
        </div>

        <RoleSelector
          activeRole={activeRole}
          loading={loadingRole === activeRole}
          roles={roles}
          onRoleChange={(role) => {
            setActiveRole(String(role.name));
            setSelectedProfileId(String(role.id));
          }}
          snapshots={snapshots}
        />



        {isLoading && <LoadingState />}

        {!isLoading && error && !snapshot && (
          <ErrorState message={error} onRetry={() => void fetchPermissions(activeRole, true)} />
        )}

        {snapshot && (
          <>
            {error && (
              <div className="rounded-2xl border border-[#fed7aa] bg-[#fff7ed] px-4 py-3 text-sm font-semibold text-[#9a3412]">
                Showing cached {activeRole} permissions. Latest refresh failed: {error}
              </div>
            )}

            <div className="hidden md:block">
              <PermissionTable
                expanded={expanded}
                permissions={permissions}
                tree={tree}
                updating={isRefreshing}
                totalMenus={totalMenus}
                onApplyAllPermission={applyAllPermission}
                onApplyModule={handleApplyModule}
                onToggleExpand={handleToggleExpand}
                onTogglePermission={handleTogglePermission}
              />
            </div>

            <MobilePermissionTree
              expanded={expanded}
              permissions={permissions}
              tree={tree}
              updating={isRefreshing}
              onApplyModule={handleApplyModule}
              onToggleExpand={handleToggleExpand}
              onTogglePermission={handleTogglePermission}
            />

            <div className="rounded-2xl border border-[#e5e7eb] bg-[#f8fafc] px-4 py-3 text-xs leading-6 text-[#6b7280]">
              Main module changes cascade to all child menus for that same action. All-module controls above apply one action across every module at once.
            </div>
          </>
        )}
      </div>
    </FixedThemeBoundary>
  );
}
