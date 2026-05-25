import type { TextareaHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

export function Textarea({ className, ...props }: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      className={cn(
        'min-h-16 w-full rounded-md border border-[#D7DDEB] bg-white px-3 py-2.5 text-xs font-semibold text-[#111827] outline-none transition placeholder:text-[#9CA3AF] focus:border-[#FF6A00] focus:ring-4 focus:ring-[#FF6A00]/10 disabled:cursor-not-allowed disabled:bg-[#F8FAFE] disabled:text-[#8A94A8]',
        className,
      )}
      {...props}
    />
  );
}
