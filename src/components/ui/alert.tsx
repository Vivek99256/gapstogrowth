import type { HTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/utils';

type AlertVariant = 'info' | 'success' | 'warning' | 'danger';

const variants: Record<AlertVariant, string> = {
  info: 'border-[#DCE2F8] bg-[#F0F3FF] text-[#1F2A6D]',
  success: 'border-[#CFEBDD] bg-[#EAF7EF] text-[#166534]',
  warning: 'border-[#FFD8B5] bg-[#FFF3EA] text-[#9A4A00]',
  danger: 'border-[#FECACA] bg-[#FEF2F2] text-[#991B1B]',
};

export function Alert({
  className,
  variant = 'info',
  icon,
  ...props
}: HTMLAttributes<HTMLDivElement> & { variant?: AlertVariant; icon?: ReactNode }) {
  return (
    <div className={cn('flex gap-3 rounded-lg border p-4 text-xs font-semibold leading-5', variants[variant], className)} role="alert" {...props}>
      {icon && <span className="mt-0.5 shrink-0">{icon}</span>}
      <div className="min-w-0 flex-1">{props.children}</div>
    </div>
  );
}

export function AlertTitle({ className, ...props }: HTMLAttributes<HTMLHeadingElement>) {
  return <h4 className={cn('mb-1 text-sm font-black', className)} {...props} />;
}

export function AlertDescription({ className, ...props }: HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cn('text-xs font-medium leading-5', className)} {...props} />;
}
