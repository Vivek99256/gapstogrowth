import type { InputHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

export function Switch({ className, ...props }: Omit<InputHTMLAttributes<HTMLInputElement>, 'type'>) {
  return (
    <input
      type="checkbox"
      role="switch"
      className={cn(
        'h-5 w-9 cursor-pointer appearance-none rounded-full bg-[#D7DDEB] p-0.5 transition before:block before:h-4 before:w-4 before:rounded-full before:bg-white before:shadow before:transition checked:bg-[#FF6A00] checked:before:translate-x-4 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#FF6A00]/10',
        className,
      )}
      {...props}
    />
  );
}
