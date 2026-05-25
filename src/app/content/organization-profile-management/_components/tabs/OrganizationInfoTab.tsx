'use client';

import { Building2, Minus, Plus } from 'lucide-react';
import { useState } from 'react';
import { Card, FileUpload, IconButton } from '@/components/ui';
import { FieldGroupForm, FormActions } from '../FormControls';
import type { FieldGroup } from '../types';

const organizationFields: FieldGroup[] = [
  {
    title: 'Organization Information',
    icon: Building2,
    fields: [
      { label: 'Legal Name', value: 'HealthCare', required: true },
      { label: 'CIN (Corporate Identification Number)', value: 'U85320GJ2018PTC101670', required: true },
      { label: 'GSTIN (Optional)', value: '1234123487890SDFG', span: 'two' },
      { label: 'PAN', value: '9979176582', required: true },
      {
        label: 'Industry',
        value: 'Healthcare',
        type: 'select',
        options: ['Healthcare', 'Technology Services', 'Education', 'Manufacturing', 'Finance'],
      },
      {
        label: 'Employee Count',
        value: '201-500 employees',
        required: true,
        type: 'select',
        options: ['1-50 employees', '51-200 employees', '201-500 employees', '501-1000 employees'],
      },
      {
        label: 'Work Week',
        value: 'Monday to Saturday',
        required: true,
        type: 'select',
        options: ['Monday to Friday', 'Monday to Saturday', 'Flexible work week'],
      },
      {
        label: 'Registered Address',
        value: '201 Sundar Chamber, Athwa Gate, Surat, Gujarat 395001',
        required: true,
        span: 'full',
      },
      { label: 'Mobile No', value: '99258642448', prefix: '+91 (India)' },
      { label: 'Email', value: 'trizinnovation2018@gmail.com' },
      { label: 'Website', value: 'https://np.schoolardone.com/' },
    ],
  },
];

const createSisterCompanyFields = (index: number): FieldGroup[] => [
  {
    title: `Sister Concern Company #${index}`,
    icon: Building2,
    fields: [
      { label: 'Legal Name', value: '', placeholder: 'Enter legal company name' },
      { label: 'CIN', value: '', placeholder: 'Enter 21-digit CIN' },
      { label: 'GSTIN', value: '', placeholder: 'Enter 15-digit GSTIN' },
      { label: 'PAN', value: '', placeholder: 'Enter PAN (e.g., AAAAA9999A)' },
      {
        label: 'Industry',
        value: 'Healthcare',
        type: 'select',
        options: ['Healthcare', 'Technology Services', 'Education', 'Manufacturing', 'Finance'],
      },
      {
        label: 'Employee Count',
        value: 'Select employee count',
        type: 'select',
        options: ['Select employee count', '1-50 employees', '51-200 employees', '201-500 employees', '501-1000 employees'],
      },
      { label: 'Registered Address', value: '', placeholder: 'Enter complete registered address', span: 'full' },
      { label: 'Mobile No', value: '', placeholder: 'Enter mobile number', prefix: '+91 (India)' },
      { label: 'Email', value: '', placeholder: 'Enter email address' },
      { label: 'Website', value: '', placeholder: 'Enter website URL' },
    ],
  },
];

function LogoUpload({ title = 'Organization Logo', preview = true }: { title?: string; preview?: boolean }) {
  return (
    <FileUpload
      title={title}
      actionLabel="Upload Logo"
      preview={preview ? <div className="h-full w-full bg-[radial-gradient(circle_at_35%_30%,#222,transparent_28%),linear-gradient(135deg,#050505,#2d2d2d)]" /> : undefined}
      placeholder={!preview ? <Building2 className="h-5 w-5 text-[#6B7280]" /> : undefined}
    />
  );
}

function SisterCompanySection({
  index,
  canAdd,
  onAdd,
  onRemove,
}: {
  index: number;
  canAdd: boolean;
  onAdd: () => void;
  onRemove: () => void;
}) {
  const canRemove = index > 1;

  return (
    <Card className="p-5">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h3 className="text-sm font-black text-[#111827]">Sister Concern Company #{index}</h3>
          <p className="mt-1 text-xs font-medium text-[#6B7280]">Add related legal entities that share administration with this organization.</p>
        </div>
        <div className="flex items-center gap-2">
          {canRemove && (
            <IconButton
              onClick={onRemove}
              aria-label={`Remove sister concern company ${index}`}
              size="sm"
            >
              <Minus className="h-4 w-4" />
            </IconButton>
          )}
          {canAdd && (
            <IconButton
              onClick={onAdd}
              aria-label="Add sister concern company"
              variant="primary"
              size="sm"
            >
              <Plus className="h-4 w-4" />
            </IconButton>
          )}
        </div>
      </div>
      <FieldGroupForm groups={createSisterCompanyFields(index)} />
      <div className="mt-5">
        <LogoUpload title="Company Logo" preview={false} />
      </div>
    </Card>
  );
}

export default function OrganizationInfoTab() {
  const [sisterCompanyIds, setSisterCompanyIds] = useState([1]);

  const addSisterCompany = () => {
    setSisterCompanyIds((current) => (current.length >= 2 ? current : [...current, Math.max(...current) + 1]));
  };

  const removeSisterCompany = (id: number) => {
    setSisterCompanyIds((current) => (current.length === 1 ? current : current.filter((item) => item !== id)));
  };

  return (
    <form className="space-y-5">
      <Card className="p-5">
        <FieldGroupForm groups={organizationFields} />
        <div className="mt-5">
          <LogoUpload />
        </div>
      </Card>
      {sisterCompanyIds.map((id, index) => (
        <SisterCompanySection
          key={id}
          index={index + 1}
          canAdd={sisterCompanyIds.length < 2}
          onAdd={addSisterCompany}
          onRemove={() => removeSisterCompany(id)}
        />
      ))}
      <FormActions submitLabel="Submit Organization Information" />
    </form>
  );
}
