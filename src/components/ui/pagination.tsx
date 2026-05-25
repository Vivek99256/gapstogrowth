import type { ButtonHTMLAttributes, HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

export function Pagination({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('flex items-center gap-1', className)} {...props} />;
}

export function PaginationButton({ className, active, ...props }: ButtonHTMLAttributes<HTMLButtonElement> & { active?: boolean }) {
  return (
    <button
      type="button"
      className={cn(
        'h-7 min-w-7 rounded border px-2 text-xs font-black transition',
        active ? 'border-[#1F2A6D] bg-[#1F2A6D] text-white' : 'border-[#DDE4F2] bg-white text-[#1F2A6D] hover:bg-[#F8FAFE]',
        className,
      )}
      {...props}
    />
  );
}
