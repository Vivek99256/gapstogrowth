import type { HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

export function Spinner({ className, ...props }: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      aria-label="Loading"
      className={cn('inline-block h-4 w-4 animate-spin rounded-full border-2 border-[#DCE2F8] border-t-[#FF6A00]', className)}
      {...props}
    />
  );
}
