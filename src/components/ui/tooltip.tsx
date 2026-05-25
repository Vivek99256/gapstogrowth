import type { HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

export function Tooltip({ className, ...props }: HTMLAttributes<HTMLSpanElement>) {
  return <span className={cn('group relative inline-flex', className)} {...props} />;
}

export function TooltipContent({ className, ...props }: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn('pointer-events-none absolute bottom-full left-1/2 z-50 mb-2 hidden -translate-x-1/2 whitespace-nowrap rounded-md bg-[#111827] px-2 py-1 text-[11px] font-bold text-white shadow-lg group-hover:inline-flex group-focus-within:inline-flex', className)}
      {...props}
    />
  );
}
