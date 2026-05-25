import type { HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

type BadgeVariant = 'default' | 'success' | 'warning' | 'danger' | 'navy' | 'outline';

const variants: Record<BadgeVariant, string> = {
  default: 'bg-[#EEF2FF] text-[#2E3A8C]',
  success: 'bg-[#EAF7EF] text-[#168044]',
  warning: 'bg-[#FFF3EA] text-[#C45B00]',
  danger: 'bg-[#FEE2E2] text-[#B91C1C]',
  navy: 'bg-[#1F2A6D] text-white',
  outline: 'border border-[#DDE4F2] bg-white text-[#64748B]',
};

export function Badge({ className, variant = 'default', ...props }: HTMLAttributes<HTMLSpanElement> & { variant?: BadgeVariant }) {
  return <span className={cn('inline-flex items-center rounded px-2 py-1 text-[11px] font-black', variants[variant], className)} {...props} />;
}
