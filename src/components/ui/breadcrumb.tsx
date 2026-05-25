import type { HTMLAttributes, LiHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

export function Breadcrumb({ className, ...props }: HTMLAttributes<HTMLElement>) {
  return <nav aria-label="Breadcrumb" className={cn('text-sm font-bold text-[#6B7280]', className)} {...props} />;
}

export function BreadcrumbList({ className, ...props }: HTMLAttributes<HTMLOListElement>) {
  return <ol className={cn('flex flex-wrap items-center gap-2', className)} {...props} />;
}

export function BreadcrumbItem({ className, ...props }: LiHTMLAttributes<HTMLLIElement>) {
  return <li className={cn('inline-flex items-center gap-2', className)} {...props} />;
}

export function BreadcrumbSeparator({ className, children = '/', ...props }: HTMLAttributes<HTMLSpanElement>) {
  return <span aria-hidden="true" className={cn('text-[#B6BECD]', className)} {...props}>{children}</span>;
}
