import { FileCheck2, ShieldCheck } from 'lucide-react';
import { FieldGroupForm, FormActions } from '../FormControls';
import type { FieldGroup } from '../types';

const complianceFields: FieldGroup[] = [
  {
    title: 'Compliance Ownership',
    icon: ShieldCheck,
    fields: [
      { label: 'Compliance Owner', value: 'Ethan Brooks', required: true },
      { label: 'Owner Email', value: 'ethan.brooks@apexlearning.example', required: true },
      {
        label: 'Review Frequency',
        value: 'Quarterly',
        required: true,
        type: 'select',
        options: ['Monthly', 'Quarterly', 'Half-yearly', 'Annually'],
      },
      {
        label: 'Compliance Status',
        value: 'Active',
        required: true,
        type: 'select',
        options: ['Active', 'Draft', 'Inactive'],
      },
    ],
  },
  {
    title: 'Policy Requirements',
    icon: FileCheck2,
    fields: [
      { label: 'Mandatory Policy Set', value: 'Code of Conduct, Data Privacy, Workplace Safety', required: true, type: 'textarea' },
      { label: 'Acknowledgement Window', value: '14 days', required: true },
      { label: 'Escalation Email', value: 'compliance@apexlearning.example' },
    ],
  },
];

export default function ComplianceSetupTab() {
  return (
    <form>
      <FieldGroupForm groups={complianceFields} />
      <FormActions submitLabel="Submit Compliance Setup" />
    </form>
  );
}
