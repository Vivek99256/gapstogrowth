import type { ButtonHTMLAttributes, HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

export function DropdownMenu({ className, ...props }: HTMLAttributes<HTMLDetailsElement>) {
  return <details className={cn('relative inline-block', className)} {...props} />;
}

export function DropdownMenuTrigger({ className, ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button type="button" className={cn('inline-flex items-center justify-center outline-none', className)} {...props} />;
}

export function DropdownMenuContent({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'select-menu-scroll absolute right-0 z-50 mt-2 max-h-[224px] min-w-44 overflow-y-auto rounded-lg border border-navy-200 bg-white p-1 shadow-[0_18px_48px_rgba(31,42,109,0.14)] ring-1 ring-navy-100',
        className,
      )}
      {...props}
    />
  );
}

export function DropdownMenuItem({ className, ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type="button"
      className={cn(
        'flex h-9 w-full items-center gap-2 rounded-md border border-transparent px-3 text-left text-xs font-bold text-slate-600 outline-none transition duration-150 hover:border-navy-200 hover:bg-navy-100 hover:text-navy-900 focus:border-orange-700 focus:bg-orange-100 focus:text-navy-900 focus:ring-2 focus:ring-orange-700/15 aria-selected:border-navy-300 aria-selected:bg-navy-100 aria-selected:text-navy-900',
        className,
      )}
      {...props}
    />
  );
}
