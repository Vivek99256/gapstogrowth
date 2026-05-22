'use client';

import React, { useState, useEffect, useLayoutEffect, useMemo } from 'react';
import GapsToGrowthLoader from '@/components/GapsToGrowthLoader';
import {
  ArrowRight,
  Bell,
  Building2,
  Calendar,
  Camera,
  Edit2,
  HelpCircle,
  Landmark,
  Lock,
  Mail,
  MapPin,
  Phone,
  Shield,
  Settings,
  User,
  Users,
} from 'lucide-react';

interface NavItem {
  id: string;
  label: string;
  icon: React.ElementType;
}

interface DetailItem {
  label: string;
  value: string;
}

const navItems: NavItem[] = [
  { id: 'personal', label: 'Personal Details', icon: User },
  { id: 'address', label: 'Address', icon: MapPin },
  { id: 'reporting', label: 'Reporting', icon: Users },
  { id: 'attendance', label: 'Attendance', icon: Calendar },
  { id: 'deposit', label: 'Deposit (Bank Details)', icon: Landmark },
];


const sectionShell =
  'rounded-2xl border border-[#E5E7EB] bg-white/95 shadow-[0_18px_45px_rgba(31,42,109,0.10)]';

const CardMenu = () => (
  <button
    aria-label="More options"
    className="grid h-7 w-7 place-items-center rounded-lg text-[#1F2A6D] hover:bg-[#FFF3EA]"
  >
    <span className="flex h-5 flex-col items-center justify-center gap-0.5">
      <span className="h-0.5 w-0.5 rounded-full bg-current" />
      <span className="h-0.5 w-0.5 rounded-full bg-current" />
      <span className="h-0.5 w-0.5 rounded-full bg-current" />
    </span>
  </button>
);

const SectionTitle: React.FC<{ icon: React.ElementType; title: string }> = ({ icon: Icon, title }) => (
  <div className="flex items-center gap-3">
    <span className="grid h-8 w-8 place-items-center rounded-lg bg-[#FFF3EA] text-[#FF6A00]">
      <Icon className="h-4 w-4" />
    </span>
    <h2 className="text-sm font-bold text-[#111827]">{title}</h2>
  </div>
);

const ProfileHeader: React.FC<{ employee?: any }> = ({ employee = {} }) => (
  <section className={`${sectionShell} relative overflow-hidden p-5 sm:p-6`}>
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_8%_20%,rgba(255,106,0,0.16),transparent_24%),radial-gradient(circle_at_96%_12%,rgba(46,58,140,0.14),transparent_28%),linear-gradient(100deg,rgba(255,255,255,0.94),rgba(244,247,251,0.88))]" />
    <div className="absolute right-64 top-8 hidden h-28 w-28 opacity-35 [background-image:radial-gradient(#FFB176_1px,transparent_1px)] [background-size:14px_14px] xl:block" />

    <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
        <div className="relative mx-auto sm:mx-0">
          <div className="grid h-32 w-32 place-items-center rounded-full bg-gradient-to-br from-[#1F2A6D] via-[#2E3A8C] to-[#FF6A00] text-4xl font-bold text-white shadow-[0_18px_40px_rgba(31,42,109,0.28)] ring-[12px] ring-[#FFF3EA] sm:h-28 sm:w-28 overflow-hidden">
            <img 
              src={employee.userprofile} 
              alt={employee.name || 'Profile'} 
              className="h-full w-full object-cover" 
            />
          </div>
          <button
            aria-label="Update profile photo"
            className="absolute bottom-1 right-1 grid h-9 w-9 place-items-center rounded-full border-4 border-white bg-[#F9FAFF] text-[#1F2A6D] shadow-md"
          >
            <Camera className="h-4 w-4" />
          </button>
        </div>

        <div className="text-center sm:text-left">
          <div className="flex flex-wrap items-center justify-center gap-3 sm:justify-start">
            <h1 className="text-2xl font-bold text-[#111827]">{employee.name}</h1>
            <span className="rounded-full bg-[#EAF7EF] px-4 py-1 text-xs font-bold text-[#168044]">
              {employee.status}
            </span>
          </div>
          <p className="mt-2 text-sm font-bold text-[#FF6A00]">{employee.role}</p>
          <p className="mt-2 text-sm font-semibold text-[#1F2A6D]">{employee.department}</p>
          <div className="mt-4 flex flex-wrap justify-center gap-x-7 gap-y-2 text-sm font-medium text-[#6B7280] sm:justify-start">
            <span className="inline-flex items-center gap-2">
              <Mail className="h-4 w-4 text-[#2E3A8C]" />
              {employee.email}
            </span>
            <span className="inline-flex items-center gap-2">
              <Phone className="h-4 w-4 text-[#2E3A8C]" />
              {employee.phone}
            </span>
            <span className="inline-flex items-center gap-2">
              <Calendar className="h-4 w-4 text-[#2E3A8C]" />
              Joined: {employee.joined}
            </span>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row lg:pr-3">
        <button className="inline-flex h-12 items-center justify-center gap-2 rounded-lg border border-[#DCE8FF] bg-white px-6 text-sm font-bold text-[#1F2A6D] shadow-[0_10px_24px_rgba(31,42,109,0.10)] transition hover:bg-[#F4F7FB]">
          <Lock className="h-4 w-4" />
          Change Password
        </button>
        <button className="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-[#FF6A00] px-7 text-sm font-bold text-white shadow-[0_14px_28px_rgba(255,106,0,0.30)] transition hover:bg-[#FF7A1A]">
          <Edit2 className="h-4 w-4" />
          Edit Profile
        </button>
      </div>
    </div>
  </section>
);

const SidebarNav: React.FC<{ activeSection: string; onNavigate: (id: string) => void }> = ({
  activeSection,
  onNavigate,
}) => (
  <aside className={`${sectionShell} flex min-h-[620px] w-full flex-col p-3 lg:w-60`}>
    <nav className="space-y-1">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = activeSection === item.id;

        return (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className={`flex h-14 w-full items-center gap-3 rounded-lg px-4 text-left text-sm font-semibold transition ${
              isActive
                ? 'bg-[#FFF3EA] text-[#FF6A00] shadow-[inset_4px_0_0_#FF6A00]'
                : 'border-b border-[#EEF0F7] text-[#1F2A6D] hover:bg-[#F4F7FB]'
            }`}
          >
            <Icon className="h-4 w-4 shrink-0" />
            <span className="truncate">{item.label}</span>
          </button>
        );
      })}
    </nav>

  </aside>
);

const PersonalDetailsCard: React.FC<{ isActive?: boolean; details?: DetailItem[] }> = ({ isActive, details = [] }) => (
  <section
    id="personal"
    className={`${sectionShell} p-5 scroll-mt-20 transition-all duration-300 ${isActive ? 'ring-1 ring-[#FF6A00]/35 shadow-[0_20px_48px_rgba(255,106,0,0.13)]' : ''}`}
  >
    <div className="mb-5 flex items-center justify-between">
      <SectionTitle icon={User} title="Personal Details" />
      <CardMenu />
    </div>
    <div className="grid grid-cols-1 divide-y divide-[#E9ECF5] sm:grid-cols-2 sm:divide-x sm:divide-y-0">
      <div className="grid gap-4 pr-0 sm:pr-6">
        {details.slice(0, 4).map((item) => (
          <div key={item.label}>
            <p className="text-xs font-semibold text-[#6B7280]">{item.label}</p>
            <p className="mt-1 text-sm font-bold text-[#111827]">{item.value}</p>
          </div>
        ))}
      </div>
      <div className="grid gap-4 pt-4 sm:pl-6 sm:pt-0">
        {details.slice(4).map((item) => (
          <div key={item.label}>
            <p className="text-xs font-semibold text-[#6B7280]">{item.label}</p>
            <p className="mt-1 text-sm font-bold text-[#111827]">{item.value}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const AddressDetailsCard: React.FC<{ isActive?: boolean; addressDetails?: any }> = ({ isActive, addressDetails = {} }) => (
  <section
    id="address"
    className={`${sectionShell} relative overflow-hidden p-5 scroll-mt-20 transition-all duration-300 ${isActive ? 'ring-1 ring-[#FF6A00]/35 shadow-[0_20px_48px_rgba(255,106,0,0.13)]' : ''}`}
  >
    <div className="mb-5 flex items-center justify-between">
      <SectionTitle icon={MapPin} title="Address Details" />
      <CardMenu />
    </div>

    <div className="relative z-10 space-y-5">
      <div>
        <p className="text-xs font-semibold text-[#6B7280]">Address</p>
        <p className="mt-1 text-sm font-bold text-[#111827]">{addressDetails.address}</p>
      </div>
      <div>
        <p className="text-xs font-semibold text-[#6B7280]">Address Line 2</p>
        <p className="mt-1 text-sm font-bold text-[#111827]">{addressDetails.line2}</p>
      </div>
      <div className="grid grid-cols-3 divide-x divide-[#E9ECF5] border-t border-[#E9ECF5] pt-4">
        {[
          ['City', addressDetails.city],
          ['State', addressDetails.state],
          ['Pincode', addressDetails.pincode],
        ].map(([label, value], index) => (
          <div key={label} className={index === 0 ? 'pr-4' : 'px-4'}>
            <p className="text-xs font-semibold text-[#6B7280]">{label}</p>
            <p className="mt-1 text-sm font-bold text-[#111827]">{value}</p>
          </div>
        ))}
      </div>
    </div>

    <Building2 className="absolute bottom-10 right-9 h-24 w-24 text-[#DCE8FF]" />
  </section>
);

const ReportingStructureCard: React.FC<{
  isActive?: boolean;
  supervisorOpt?: string;
  employeeName?: string;
  reportingMethod?: string;
}> = ({ isActive, supervisorOpt = '', employeeName = '', reportingMethod = '' }) => (
  <section
    id="reporting"
    className={`${sectionShell} p-5 scroll-mt-20 transition-all duration-300 ${isActive ? 'ring-1 ring-[#FF6A00]/35 shadow-[0_20px_48px_rgba(255,106,0,0.13)]' : ''}`}
  >
    <div className="mb-5 flex items-center justify-between">
      <SectionTitle icon={Users} title="Reporting Structure" />
      <CardMenu />
    </div>

    <div className="overflow-hidden rounded-xl border border-[#E4E8F2]">
      <div className="grid grid-cols-3 bg-[#F4F7FB] text-xs font-semibold text-[#6B7280]">
        <div className="px-4 py-3">supervisor_opt</div>
        <div className="border-x border-[#E4E8F2] px-4 py-3">Employee Name</div>
        <div className="px-4 py-3">Reporting Method</div>
      </div>
      <div className="grid grid-cols-3 text-sm font-bold text-[#111827]">
        <div className="px-4 py-3">
          <span className="rounded-full bg-[#EAF7EF] px-2 py-1 text-xs text-[#168044]">
            {supervisorOpt || 'No'}
          </span>
        </div>
        <div className="border-x border-[#E4E8F2] px-4 py-3">{employeeName || '—'}</div>
        <div className="px-4 py-3">{reportingMethod || '—'}</div>
      </div>
    </div>

    <div className="mt-7 flex flex-col items-center">
      <div className="grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br from-[#1F2A6D] via-[#2E3A8C] to-[#FF6A00] text-white shadow-lg">
        <Users className="h-4 w-4" />
      </div>
      <div className="h-7 w-px bg-[#CBD3E7]" />
      <div className="h-px w-52 bg-[#CBD3E7]" />
      <div className="grid w-60 grid-cols-3">
        {['#168044', '#FF6A00', '#2E3A8C'].map((color) => (
          <div key={color} className="flex flex-col items-center">
            <div className="h-5 w-px bg-[#CBD3E7]" />
            <div
              className="grid h-8 w-8 place-items-center rounded-full border bg-white"
              style={{ borderColor: color, color }}
            >
              <User className="h-3.5 w-3.5" />
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const AttendanceCard: React.FC<{ isActive?: boolean; schedule?: any[] }> = ({ isActive, schedule = [] }) => (
  <section
    id="attendance"
    className={`${sectionShell} p-5 scroll-mt-20 transition-all duration-300 ${isActive ? 'ring-1 ring-[#FF6A00]/35 shadow-[0_20px_48px_rgba(255,106,0,0.13)]' : ''}`}
  >
    <div className="mb-5 flex items-center justify-between">
      <SectionTitle icon={Calendar} title="Attendance Schedule" />
      <CardMenu />
    </div>

    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-6">
      {schedule.map((day) => (
        <div
          key={day.day}
          className={`rounded-lg p-3 text-center ${
            day.accent ? 'bg-[#FFF3EA] text-[#FF6A00]' : 'bg-[#F4F7FB] text-[#1F2A6D]'
          }`}
        >
          <p className="text-xs font-bold">{day.day}</p>
          <p className="mt-5 text-xs font-bold text-[#111827]">{day.start}</p>
          <p className="mt-5 text-xs font-bold text-[#111827]">{day.end}</p>
        </div>
      ))}
    </div>
  </section>
);

const BankDetailsCard: React.FC<{ isActive?: boolean; bankDetails?: DetailItem[] }> = ({ isActive, bankDetails = [] }) => (
  <section
    id="deposit"
    className={`${sectionShell} p-5 scroll-mt-20 transition-all duration-300 ${isActive ? 'ring-1 ring-[#FF6A00]/35 shadow-[0_20px_48px_rgba(255,106,0,0.13)]' : ''}`}
  >
    <div className="mb-5 flex items-center justify-between">
      <SectionTitle icon={Landmark} title="Deposit (Bank Details)" />
      <CardMenu />
    </div>

    <div className="grid grid-cols-1 gap-y-4 sm:grid-cols-2 lg:grid-cols-6 lg:divide-x lg:divide-[#E9ECF5]">
      {bankDetails.map((item, index) => (
        <div key={item.label} className={index === 0 ? 'lg:pr-5' : 'lg:px-5'}>
          <p className="text-xs font-semibold text-[#6B7280]">{item.label}</p>
          <p className="mt-1 text-sm font-bold text-[#111827]">{item.value}</p>
        </div>
      ))}
    </div>
  </section>
);

export default function ProfileView() {
  const [activeSection, setActiveSection] = useState('personal');
  const [apiData, setApiData] = useState<any>(null);
  const [sessionData, setSessionData] = useState<any>(() => {
    if (typeof window === 'undefined') return null;
    try {
      const userData = localStorage.getItem('userData');
      if (userData) {
        const parsedData = JSON.parse(userData);
        const { APP_URL, token, sub_institute_id, user_id, org_type } = parsedData;
        if (APP_URL && token && sub_institute_id && user_id && org_type) {
          return {
            url: APP_URL,
            token,
            subInstituteId: String(sub_institute_id),
            userId: String(user_id),
            orgType: String(org_type),
          };
        }
      }
    } catch (error) {
      console.error('Error parsing userData on init:', error);
    }
    return null;
  });
  const [employeesList, setEmployeesList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const IMAGE_BASE_URL = 'https://s3-triz.fra1.cdn.digitaloceanspaces.com/public/hp_user/';
  const defaultImage = 'https://cdn.builder.io/api/v1/image/assets/TEMP/630b9c5d4cf92bb87c22892f9e41967c298051a0?placeholderIfAbsent=true&apiKey=f18a54c668db405eb048e2b0a7685d39';


  useLayoutEffect(() => {
    const fetchProfile = async () => {
      if (!sessionData) {
        setLoading(false);
        return;
      }
      try {
        const res = await fetch(`${sessionData?.url}/user/add_user/${sessionData?.userId}/edit?type=API&token=${sessionData?.token}&sub_institute_id=${sessionData?.subInstituteId}&org_type=${sessionData?.orgType}&syear=2025`);
        if (!res.ok) throw new Error('Failed to fetch profile');
        const json = await res.json();
        setApiData(json.data); // only the data object from response, as requested
        setEmployeesList(json.employees || []);
      } catch (err) {
        console.error('Profile fetch error:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [sessionData]);

  const employeeData = useMemo(() => {
    if (!apiData) {
        return { name: '', userprofile: '', status: '', role: '', department: '', email: '', phone: '', joined: '' };
    }
    const fullName = apiData.full_name || [apiData.name_suffix, apiData.first_name, apiData.middle_name, apiData.last_name].filter(Boolean).join(' ').trim();
    const init = ((apiData.first_name || '').charAt(0) + (apiData.last_name || '').charAt(0)).toUpperCase() || 'JD';
    const joinStr = apiData.joined_date
      ? new Date(apiData.joined_date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }).replace(/,/, '')
      : (apiData.join_year || '');
    const profileImage = apiData?.image 
      ? `${IMAGE_BASE_URL}${apiData.image}` 
      : defaultImage;

    return {
      name: fullName,
      userprofile: profileImage,
      status: apiData.status == 1 || apiData.status === '1' ? 'Active' : 'Inactive',
      role: apiData.userJobrole || '',
      department: apiData.userDepartment || '',
      email: apiData.email || '',
      phone: apiData.mobile || '',
      joined: joinStr,
    };
  }, [apiData]);

  const personalDetails = useMemo<DetailItem[]>(() => {
    if (!apiData) {
      return [];
    }
    const formatDob = (d: string) => {
      if (!d) return '';
      const dt = new Date(d);
      return dt.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }).replace(/,/, '');
    };
    const gender = apiData.gender === 'M' ? 'Male' : apiData.gender === 'F' ? 'Female' : apiData.gender || '';
    const joinY = apiData.join_year || (apiData.joined_date ? new Date(apiData.joined_date).getFullYear().toString() : '');
    return [
      { label: 'Full Name', value: apiData.full_name || '' },
      { label: 'Mobile', value: apiData.mobile || '' },
      { label: 'Email', value: apiData.email || '' },
      { label: 'Department', value: apiData.userDepartment || '' },
      { label: 'Date of Birth', value: formatDob(apiData.birthdate) },
      { label: 'Job Role', value: apiData.userJobrole || '' },
      { label: 'Gender', value: gender },
      { label: 'Join Year', value: joinY },
    ];
  }, [apiData]);

  const addressDetails = useMemo(() => {
    if (!apiData) {
      return { address: '', line2: '', city: '', state: '', pincode: '' };
    }
    return {
      address: apiData.address || '',
      line2: apiData.address_2 || apiData.landmark || '',
      city: apiData.city || '',
      state: apiData.state || '',
      pincode: apiData.pincode || '',
    };
  }, [apiData]);

  const bankDetails = useMemo<DetailItem[]>(() => {
    if (!apiData) {
      return [];
    }
    return [
      { label: 'Bank Name', value: apiData.bank_name || '' },
      { label: 'Branch Name', value: apiData.branch_name || '' },
      { label: 'Account No.', value: apiData.account_no || '' },
      { label: 'IFSC Code', value: apiData.ifsc_code || '' },
      { label: 'Amount', value: apiData.amount ? `Rs ${apiData.amount}` : '' },
      { label: 'Transfer Type', value: apiData.transfer_type || '' },
    ];
  }, [apiData]);

  const reportingInfo = useMemo(() => {
    if (!apiData) return { supervisorOpt: '', employeeName: '', reportingMethod: '' };
    const empId = apiData.employee_id;
    const matchedEmployee = employeesList.find((e: any) => String(e.id) === String(empId));
    return {
      supervisorOpt: apiData.supervisor_opt || '',
      employeeName: matchedEmployee?.first_name + ' ' + matchedEmployee?.last_name || '',
      reportingMethod: apiData.reporting_method || '',
    };
  }, [apiData, employeesList]);

  const attendanceSchedule = useMemo(() => {
    if (!apiData) return [];

    const dayMap = [
      { key: 'monday',    label: 'Mon' },
      { key: 'tuesday',   label: 'Tue' },
      { key: 'wednesday', label: 'Wed' },
      { key: 'thursday',  label: 'Thu' },
      { key: 'friday',    label: 'Fri' },
      { key: 'saturday',  label: 'Sat', accent: true },
    ];

    const formatTime = (timeStr: string | null | undefined): string => {
      if (!timeStr) return '—';
      const parts = timeStr.split(':');
      let hour = parseInt(parts[0], 10);
      const minute = parts[1] || '00';
      const ampm = hour >= 12 ? 'PM' : 'AM';
      hour = hour % 12 || 12;
      return `${hour.toString().padStart(2, '0')}:${minute} ${ampm}`;
    };

    return dayMap.map((d) => {
      const inKey = `${d.key}_in_date`;
      const outKey = `${d.key}_out_date`;
      const start = formatTime(apiData[inKey]);
      const end = formatTime(apiData[outKey]);

      return {
        day: d.label,
        start,
        end,
        accent: !!d.accent,
      };
    });
  }, [apiData]);

  const handleNavigate = (id: string) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen bg-[#F4F7FB] text-[#111827]">
      <div className="mb-5">
        <h1 className="text-2xl font-bold text-[#111827]">User Profile</h1>
        <p className="mt-2 text-sm font-medium text-[#6B7280]">
          Manage your profile information and account preferences.
        </p>
      </div>

      {loading ? (
        <GapsToGrowthLoader label="Loading profile..." className="min-h-[400px]" />
      ) : (
        <>
          <ProfileHeader employee={employeeData} />

          <div className="mt-5 flex flex-col gap-5 lg:flex-row">
            <SidebarNav activeSection={activeSection} onNavigate={handleNavigate} />

            <main className="grid min-w-0 flex-1 grid-cols-1 gap-5 xl:grid-cols-2">
              <PersonalDetailsCard isActive={activeSection === 'personal'} details={personalDetails} />
              <AddressDetailsCard isActive={activeSection === 'address'} addressDetails={addressDetails} />
              <ReportingStructureCard 
                isActive={activeSection === 'reporting'} 
                supervisorOpt={reportingInfo.supervisorOpt}
                employeeName={reportingInfo.employeeName}
                reportingMethod={reportingInfo.reportingMethod}
              />
              <AttendanceCard isActive={activeSection === 'attendance'} schedule={attendanceSchedule} />
              <div className="xl:col-span-2">
                <BankDetailsCard isActive={activeSection === 'deposit'} bankDetails={bankDetails} />
              </div>
            </main>
          </div>
        </>
      )}
    </div>
  );
}
