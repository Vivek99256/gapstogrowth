import type { DetailsHTMLAttributes, HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

export function Collapsible({ className, ...props }: DetailsHTMLAttributes<HTMLDetailsElement>) {
  return <details className={cn('group', className)} {...props} />;
}

export function CollapsibleTrigger({ className, ...props }: HTMLAttributes<HTMLElement>) {
  return <summary className={cn('cursor-pointer list-none marker:hidden', className)} {...props} />;
}

export function CollapsibleContent({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('mt-2', className)} {...props} />;
}
