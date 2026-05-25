import {
  BriefcaseBusiness,
  Building2,
  ChevronDown,
  MoreVertical,
  Pencil,
  Plus,
  Search,
  Settings,
  UsersRound,
} from 'lucide-react';
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

function SearchBox({ placeholder }: { placeholder: string }) {
  return (
    <label className="relative block">
      <Search className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#8A94A8]" />
      <input
        className="h-9 w-full rounded-md border border-[#DDE4F2] bg-white pl-9 pr-3 text-xs font-semibold text-[#111827] outline-none placeholder:text-[#9CA3AF] focus:border-[#FF6A00] focus:ring-4 focus:ring-[#FF6A00]/10"
        placeholder={placeholder}
      />
    </label>
  );
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
    <aside className="rounded-lg border border-[#DDE4F2] bg-white p-4">
      <h3 className="mb-3 text-sm font-black text-[#111827]">Department Hierarchy</h3>
      <SearchBox placeholder="Search departments" />
      <div className="mt-4 space-y-1">
        {tree.map((node) => (
          <TreeNode key={node.label} node={node} />
        ))}
      </div>
      <button
        type="button"
        className="mt-5 inline-flex h-9 w-full items-center justify-center gap-2 rounded-md border border-[#C9D4EA] bg-white text-xs font-black text-[#1F2A6D] hover:bg-[#F8FAFE]"
      >
        <Plus className="h-3.5 w-3.5" />
        Add Sub-Department
      </button>
    </aside>
  );
}

function DepartmentTable() {
  return (
    <section className="rounded-lg border border-[#DDE4F2] bg-white p-4">
      <div className="mb-4 grid gap-3 md:grid-cols-[1fr_180px]">
        <SearchBox placeholder="Search departments" />
        <select className="h-9 rounded-md border border-[#DDE4F2] bg-white px-3 text-xs font-bold text-[#1F2A6D] outline-none">
          <option>Department Status - All</option>
          <option>Active</option>
          <option>Draft</option>
        </select>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[760px] text-left text-xs">
          <thead>
            <tr className="border-b border-[#E6EBF5] text-[11px] font-black uppercase text-[#64748B]">
              <th className="py-3">Department Name</th>
              <th>Department Code</th>
              <th>Parent Department</th>
              <th>Department Head</th>
              <th>Users</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {departments.map((department) => (
              <tr
                key={department.code}
                className={[
                  'border-b border-[#EEF2F7] font-semibold text-[#334155]',
                  department.selected ? 'bg-[#EAF0FF] text-[#1F2A6D]' : 'hover:bg-[#F8FAFE]',
                ].join(' ')}
              >
                <td className="py-3 font-black">{department.name}</td>
                <td>{department.code}</td>
                <td>{department.parent}</td>
                <td>{department.head}</td>
                <td>{department.users}</td>
                <td>
                  <span className="rounded bg-[#EAF7EF] px-2 py-1 text-[11px] font-black text-[#168044]">{department.status}</span>
                </td>
                <td>
                  <button type="button" className="grid h-7 w-7 place-items-center rounded-md hover:bg-white">
                    <MoreVertical className="h-4 w-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-4 flex items-center justify-between text-xs font-semibold text-[#64748B]">
        <span>Showing 1 to 11 of 11 departments</span>
        <div className="flex items-center gap-1">
          <button type="button" className="h-7 w-7 rounded border border-[#DDE4F2]">‹</button>
          <button type="button" className="h-7 w-7 rounded bg-[#1F2A6D] text-white">1</button>
          <button type="button" className="h-7 w-7 rounded border border-[#DDE4F2]">›</button>
        </div>
      </div>
    </section>
  );
}

function DetailPanel() {
  return (
    <aside className="rounded-lg border border-[#DDE4F2] bg-white p-4">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <span className="grid h-11 w-11 place-items-center rounded-lg bg-[#EEF2FF] text-[#2E3A8C]">
            <Settings className="h-5 w-5" />
          </span>
          <div>
            <h3 className="text-sm font-black text-[#111827]">Engineering</h3>
            <p className="text-xs font-semibold text-[#64748B]">
              ENG-001 <span className="ml-2 rounded bg-[#EAF7EF] px-2 py-0.5 text-[10px] text-[#168044]">Active</span>
            </p>
          </div>
        </div>
        <button type="button" className="grid h-8 w-8 place-items-center rounded-md border border-[#DDE4F2] text-[#1F2A6D]">
          <Pencil className="h-3.5 w-3.5" />
        </button>
      </div>

      <div className="mt-5 space-y-3 border-t border-[#EEF2F7] pt-4 text-xs">
        <p className="flex justify-between gap-4"><span className="font-bold text-[#64748B]">Department Head</span><span className="font-black text-[#111827]">Olivia Chen</span></p>
        <p className="flex justify-between gap-4"><span className="font-bold text-[#64748B]">Parent Department</span><span className="font-black text-[#111827]">Corporate</span></p>
        <p className="leading-5"><span className="font-bold text-[#64748B]">Description</span><br />Responsible for designing, building, and maintaining core user products and platform infrastructure.</p>
      </div>

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
          <button type="button" className="text-xs font-black text-[#2E3A8C]">View all</button>
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
              <span className="rounded border border-[#DDE4F2] px-2 py-1 text-[10px] font-bold text-[#64748B]">{role}</span>
            </div>
          ))}
        </div>
      </div>
    </aside>
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
