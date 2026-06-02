import {
  BriefcaseBusiness,
  Building2,
  ChevronDown,
  MoreVertical,
  Pencil,
  Plus,
  Settings,
  UsersRound,
} from 'lucide-react';
import {
  Badge,
  Button,
  DataList,
  DataListItem,
  IconButton,
  SearchInput,
  SectionCard,
  StatusBadge,
} from '@/components/ui';
import { EnterpriseDataTable, type DataTableColumn, type DataTableFilter } from '@/components/data-table';
import { FormActions } from '../FormControls';

const departments = [
  { name: 'Corporate', code: 'CORP-000', parent: '-', head: 'Sneh Johnson', users: 56, status: 'Active' },
  { name: 'Human Resources', code: 'HR-001', parent: 'Corporate', head: 'Daniel Kim', users: 18, status: 'Active' },
  { name: 'Sales', code: 'SAL-001', parent: 'Corporate', head: 'Jennifer Wong', users: 74, status: 'Active' },
  { name: 'Product', code: 'PRD-002', parent: 'Corporate', head: 'Alicia Patel', users: 31, status: 'Active' },
  { name: 'Product Management', code: 'PRD-002-01', parent: 'Product', head: 'Alicia Patel', users: 16, status: 'Active' },
  { name: 'Product Design', code: 'PRD-002-02', parent: 'Product', head: 'Liam OConnor', users: 15, status: 'Active' },
  { name: 'Engineering', code: 'ENG-001', parent: 'Corporate', head: 'Olivia Chen', users: 128, status: 'Active', selected: true },
  { name: 'Software Engineering', code: 'ENG-001-01', parent: 'Engineering', head: 'Olivia Chen', users: 86, status: 'Active' },
  { name: 'Quality Assurance', code: 'ENG-001-02', parent: 'Engineering', head: 'Noah Martin', users: 24, status: 'Active' },
  { name: 'DevOps', code: 'ENG-001-03', parent: 'Engineering', head: 'Ethan Brooks', users: 18, status: 'Active' },
  { name: 'Customer Success', code: 'CS-004', parent: 'Corporate', head: 'Marcus Lee', users: 42, status: 'Active' },
];

const tree = [
  {
    label: 'Corporate',
    code: '',
    children: [
      { label: 'Human Resources', code: 'HR-001' },
      { label: 'Sales', code: 'SAL-001' },
      {
        label: 'Product',
        code: 'PRD-002',
        children: [
          { label: 'Product Management', code: 'PRD-002-01' },
          { label: 'Product Design', code: 'PRD-002-02' },
        ],
      },
      {
        label: 'Engineering',
        code: 'ENG-001',
        active: true,
        children: [
          { label: 'Software Engineering', code: 'ENG-001-01' },
          { label: 'Quality Assurance', code: 'ENG-001-02' },
          { label: 'DevOps', code: 'ENG-001-03' },
        ],
      },
      { label: 'Customer Success', code: 'CS-004' },
    ],
  },
];

const teamMembers = [
  ['Olivia Chen', 'olivia.chen@apex.com', 'Head'],
  ['Ethan Brooks', 'ethan.brooks@apex.com', 'Manager'],
  ['Noah Martin', 'noah.martin@apex.com', 'Manager'],
  ['Sophia Patel', 'sophia.patel@apex.com', 'Senior Engineer'],
  ['Liam OConnor', 'liam.oconnor@apex.com', 'Designer'],
];

type Department = (typeof departments)[number];

const departmentColumns: DataTableColumn<Department>[] = [
  {
    id: 'name',
    header: 'Department Name',
    cell: (department) => <span className="font-black text-secondary-foreground">{department.name}</span>,
    sortValue: (department) => department.name,
  },
  { id: 'code', header: 'Department Code', cell: (department) => department.code, sortValue: (department) => department.code },
  { id: 'parent', header: 'Parent Department', cell: (department) => department.parent, sortValue: (department) => department.parent },
  { id: 'head', header: 'Department Head', cell: (department) => department.head, sortValue: (department) => department.head },
  { id: 'users', header: 'Users', cell: (department) => department.users, sortValue: (department) => department.users },
  { id: 'status', header: 'Status', cell: (department) => <StatusBadge status={department.status} />, sortValue: (department) => department.status },
  {
    id: 'actions',
    header: 'Actions',
    cell: () => (
      <IconButton variant="ghost" size="sm" aria-label="Open department actions">
        <MoreVertical className="h-4 w-4" />
      </IconButton>
    ),
  },
];

const departmentFilters: DataTableFilter<Department>[] = [
  {
    id: 'status',
    label: 'statuses',
    options: [
      { label: 'Active', value: 'Active' },
      { label: 'Draft', value: 'Draft' },
    ],
    predicate: (department, value) => department.status === value,
  },
];

function SearchBox({ placeholder }: { placeholder: string }) {
  return <SearchInput placeholder={placeholder} />;
}

function TreeNode({ node, depth = 0 }: { node: any; depth?: number }) {
  return (
    <div>
      <div
        className={[
          'flex items-center gap-2 rounded-md px-2 py-2 text-xs font-bold',
          node.active ? 'bg-[#EAF0FF] text-[#1F2A6D]' : depth === 0 ? 'text-[#1F2A6D]' : 'text-[#4B5563]',
        ].join(' ')}
        style={{ paddingLeft: `${8 + depth * 18}px` }}
      >
        {node.children ? <ChevronDown className="h-3.5 w-3.5" /> : <span className="h-3.5 w-3.5" />}
        <Building2 className="h-3.5 w-3.5 text-[#6F7FD8]" />
        <span className="min-w-0 flex-1 truncate">{node.label}</span>
      </div>
      {node.code && <p className="ml-14 text-[10px] font-semibold text-[#8A94A8]">{node.code}</p>}
      {node.children?.map((child: any) => <TreeNode key={`${child.label}-${child.code}`} node={child} depth={depth + 1} />)}
    </div>
  );
}

function DepartmentHierarchy() {
  return (
    <SectionCard contentClassName="p-4">
      <h3 className="mb-3 text-sm font-black text-[#111827]">Department Hierarchy</h3>
      <SearchBox placeholder="Search departments" />
      <div className="mt-4 space-y-1">
        {tree.map((node) => (
          <TreeNode key={node.label} node={node} />
        ))}
      </div>
      <Button variant="outline" size="sm" className="mt-5 w-full" leftIcon={<Plus className="h-3.5 w-3.5" />}>
        Add Sub-Department
      </Button>
    </SectionCard>
  );
}

function DepartmentTable() {
  return (
    <SectionCard contentClassName="p-4">
      <EnterpriseDataTable
        columns={departmentColumns}
        data={departments}
        getRowId={(department) => department.code}
        getSearchText={(department) => Object.values(department).join(' ')}
        filters={departmentFilters}
        pageSize={11}
        emptyTitle="No departments found"
      />
    </SectionCard>
  );
}

function DetailPanel() {
  return (
    <SectionCard contentClassName="p-4">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <span className="grid h-11 w-11 place-items-center rounded-lg bg-[#EEF2FF] text-[#2E3A8C]">
            <Settings className="h-5 w-5" />
          </span>
          <div>
            <h3 className="text-sm font-black text-[#111827]">Engineering</h3>
            <p className="text-xs font-semibold text-[#64748B]">
              ENG-001 <StatusBadge status="Active" className="ml-2 py-0.5 text-[10px]" />
            </p>
          </div>
        </div>
        <IconButton size="sm">
          <Pencil className="h-3.5 w-3.5" />
        </IconButton>
      </div>

      <DataList className="mt-5 border-t border-[#EEF2F7] pt-4">
        <DataListItem label="Department Head" value="Olivia Chen" />
        <DataListItem label="Parent Department" value="Corporate" />
        <p className="leading-5"><span className="font-bold text-[#64748B]">Description</span><br />Responsible for designing, building, and maintaining core user products and platform infrastructure.</p>
      </DataList>

      <div className="mt-5 grid grid-cols-2 gap-3">
        {[
          ['Total Users', '128', UsersRound],
          ['Linked Job Roles', '14', BriefcaseBusiness],
        ].map(([label, value, Icon]) => (
          <div key={String(label)} className="rounded-lg border border-[#DDE4F2] bg-[#F8FAFE] p-3">
            <Icon className="mb-2 h-4 w-4 text-[#2E3A8C]" />
            <p className="text-[11px] font-bold text-[#64748B]">{String(label)}</p>
            <p className="text-xl font-black text-[#111827]">{String(value)}</p>
          </div>
        ))}
      </div>

      <div className="mt-5">
        <div className="mb-3 flex items-center justify-between">
          <h4 className="text-xs font-black text-[#111827]">Assigned Users (Top 5)</h4>
          <Button variant="ghost" size="sm">View all</Button>
        </div>
        <div className="space-y-3">
          {teamMembers.map(([name, email, role]) => (
            <div key={email} className="flex items-center gap-3">
              <span className="grid h-8 w-8 place-items-center rounded-full bg-[#FFF3EA] text-xs font-black text-[#C45B00]">
                {name.split(' ').map((part) => part[0]).join('')}
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-xs font-black text-[#111827]">{name}</p>
                <p className="truncate text-[11px] font-medium text-[#64748B]">{email}</p>
              </div>
              <Badge variant="outline" className="text-[10px]">{role}</Badge>
            </div>
          ))}
        </div>
      </div>
    </SectionCard>
  );
}

export default function DepartmentManagementTab() {
  return (
    <form>
      <div className="grid gap-4 xl:grid-cols-[260px_minmax(0,1fr)_320px]">
        <DepartmentHierarchy />
        <DepartmentTable />
        <DetailPanel />
      </div>
      <FormActions submitLabel="Submit Department Management" />
    </form>
  );
}
