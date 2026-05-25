import type { InputHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

export type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  prefix?: string;
};

export function Input({ className, prefix, ...props }: InputProps) {
  if (prefix) {
    return (
      <span className="flex h-10 w-full overflow-hidden rounded-md border border-[#D7DDEB] bg-white focus-within:border-[#FF6A00] focus-within:ring-4 focus-within:ring-[#FF6A00]/10">
        <span className="inline-flex items-center border-r border-[#E4E9F4] bg-[#F8FAFE] px-3 text-xs font-bold text-[#1F2A6D]">
          {prefix}
        </span>
        <input
          className={cn('min-w-0 flex-1 bg-transparent px-3 text-xs font-semibold text-[#111827] outline-none placeholder:text-[#9CA3AF]', className)}
          {...props}
        />
      </span>
    );
  }

  return (
    <input
      className={cn(
        'h-10 w-full rounded-md border border-[#D7DDEB] bg-white px-3 text-xs font-semibold text-[#111827] outline-none transition placeholder:text-[#9CA3AF] focus:border-[#FF6A00] focus:ring-4 focus:ring-[#FF6A00]/10 disabled:cursor-not-allowed disabled:bg-[#F8FAFE] disabled:text-[#8A94A8]',
        className,
      )}
      {...props}
    />
  );
}
