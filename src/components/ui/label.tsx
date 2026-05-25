import type { LabelHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

export function Label({ className, ...props }: LabelHTMLAttributes<HTMLLabelElement>) {
  return <label className={cn('text-xs font-bold text-[#111827]', className)} {...props} />;
}

export function RequiredIndicator() {
  return <span className="text-[#FF6A00]" aria-hidden="true">*</span>;
}
