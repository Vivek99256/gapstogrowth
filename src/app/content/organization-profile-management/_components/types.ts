import type { ElementType } from 'react';

export type Field = {
  label: string;
  value: string;
  placeholder?: string;
  required?: boolean;
  helper?: string;
  type?: 'input' | 'select' | 'textarea';
  options?: string[];
  span?: 'full' | 'two' | 'three';
  prefix?: string;
};

export type FieldGroup = {
  title: string;
  icon: ElementType;
  fields: Field[];
};

export type StepId = 'organization' | 'departments' | 'compliance' | 'disciplinary';

export type Step = {
  id: StepId;
  title: string;
};
