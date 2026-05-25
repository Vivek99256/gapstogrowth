import { FileCheck2, Scale } from 'lucide-react';
import { FieldGroupForm, FormActions } from '../FormControls';
import type { FieldGroup } from '../types';

const disciplinaryFields: FieldGroup[] = [
  {
    title: 'Disciplinary Workflow',
    icon: Scale,
    fields: [
      {
        label: 'Default Case Owner',
        value: 'People Operations',
        required: true,
        type: 'select',
        options: ['People Operations', 'Legal Team', 'Compliance Team'],
      },
      {
        label: 'Initial Review SLA',
        value: '3 business days',
        required: true,
        type: 'select',
        options: ['1 business day', '3 business days', '5 business days'],
      },
      {
        label: 'Escalation Level',
        value: 'Department Head',
        required: true,
        type: 'select',
        options: ['Manager', 'Department Head', 'HR Director', 'Executive Review'],
      },
      {
        label: 'Workflow Status',
        value: 'Active',
        required: true,
        type: 'select',
        options: ['Active', 'Draft', 'Inactive'],
      },
    ],
  },
  {
    title: 'Action Framework',
    icon: FileCheck2,
    fields: [
      { label: 'Allowed Actions', value: 'Coaching note, Written warning, Performance plan, Formal review', required: true, type: 'textarea' },
      { label: 'Appeal Window', value: '7 days', required: true },
      { label: 'Confidential Notes', value: 'Restrict sensitive case notes to HR admins and assigned reviewers.', type: 'textarea' },
    ],
  },
];

export default function DisciplinarySetupTab() {
  return (
    <form>
      <FieldGroupForm groups={disciplinaryFields} />
      <FormActions submitLabel="Submit Disciplinary Setup" />
    </form>
  );
}
