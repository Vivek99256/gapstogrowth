import type { Step } from './types';

export const steps: Step[] = [
  {
    id: 'organization',
    title: 'Organization Information',
  },
  {
    id: 'departments',
    title: 'Department Management',
  },
  {
    id: 'compliance',
    title: 'Compliance Setup',
  },
  {
    id: 'disciplinary',
    title: 'Disciplinary Setup',
  },
];

export const guidanceItems = [
  'Use the legal organization name used across contracts and compliance records.',
  'Keep primary contact details current so approval alerts reach the right admin.',
  'Complete location and employee range before moving to department setup.',
];
