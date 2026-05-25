import type { InputHTMLAttributes } from 'react';
import { Search } from 'lucide-react';
import { cn } from '@/lib/utils';

export function SearchInput({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="relative block">
      <Search className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#8A94A8]" />
      <input
        className={cn(
          'h-9 w-full rounded-md border border-[#DDE4F2] bg-white pl-9 pr-3 text-xs font-semibold text-[#111827] outline-none transition placeholder:text-[#9CA3AF] focus:border-[#FF6A00] focus:ring-4 focus:ring-[#FF6A00]/10',
          className,
        )}
        {...props}
      />
    </label>
  );
}
