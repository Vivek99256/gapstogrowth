import type { InputHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

export function Radio({ className, ...props }: Omit<InputHTMLAttributes<HTMLInputElement>, 'type'>) {
  return (
    <input
      type="radio"
      className={cn('h-4 w-4 border-[#D7DDEB] accent-[#FF6A00] outline-none focus-visible:ring-4 focus-visible:ring-[#FF6A00]/10', className)}
      {...props}
    />
  );
}
