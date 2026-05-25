import type { HTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/utils';

export function EmptyState({
  className,
  icon,
  title,
  description,
  action,
}: HTMLAttributes<HTMLDivElement> & {
  icon?: ReactNode;
  title: string;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <div className={cn('flex min-h-56 flex-col items-center justify-center rounded-lg border border-dashed border-[#C9D4EA] bg-[#F8FAFE] p-8 text-center', className)}>
      {icon && <div className="mb-3 grid h-10 w-10 place-items-center rounded-lg bg-white text-[#2E3A8C] shadow-sm">{icon}</div>}
      <h3 className="text-sm font-black text-[#111827]">{title}</h3>
      {description && <p className="mt-1 max-w-sm text-xs font-medium leading-5 text-[#6B7280]">{description}</p>}
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}
