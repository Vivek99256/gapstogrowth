import type { ButtonHTMLAttributes, HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

export function Tabs({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('w-full', className)} {...props} />;
}

export function TabsList({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('inline-flex rounded-lg border border-[#DDE4F2] bg-[#F8FAFE] p-1', className)} {...props} />;
}

export function TabsTrigger({ className, 'aria-selected': selected, ...props }: ButtonHTMLAttributes<HTMLButtonElement> & { 'aria-selected'?: boolean }) {
  return (
    <button
      type="button"
      aria-selected={selected}
      className={cn(
        'h-8 rounded-md px-3 text-xs font-black text-[#64748B] transition hover:text-[#1F2A6D] aria-selected:bg-white aria-selected:text-[#1F2A6D] aria-selected:shadow-sm',
        className,
      )}
      {...props}
    />
  );
}

export function TabsContent({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('mt-4 outline-none', className)} {...props} />;
}
