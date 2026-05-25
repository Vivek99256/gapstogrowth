import type { ProgressHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

export function Progress({ className, value = 0, max = 100, ...props }: ProgressHTMLAttributes<HTMLProgressElement>) {
  return (
    <progress
      value={value}
      max={max}
      className={cn('h-2 w-full overflow-hidden rounded-full [&::-moz-progress-bar]:bg-[#FF6A00] [&::-webkit-progress-bar]:bg-[#EEF2FF] [&::-webkit-progress-value]:bg-[#FF6A00]', className)}
      {...props}
    />
  );
}
