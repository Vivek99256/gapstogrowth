import type { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Progress } from './progress';

export function MetricCard({
  title,
  value,
  change,
  changeType = 'neutral',
  icon: Icon,
  iconClassName,
  progress,
  className,
}: {
  title: string;
  value: string;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
  icon?: LucideIcon;
  iconClassName?: string;
  progress?: number;
  className?: string;
}) {
  return (
    <div className={cn('rounded-lg border border-[#DDE4F2] bg-white p-5 shadow-[0_10px_28px_rgba(31,42,109,0.05)] transition hover:shadow-[0_16px_38px_rgba(31,42,109,0.09)]', className)}>
      <div className="mb-4 flex items-center gap-3">
        {Icon && (
          <div className={cn('grid h-11 w-11 place-items-center rounded-lg bg-[#EEF2FF] text-[#2E3A8C]', iconClassName)}>
            <Icon className="h-5 w-5" />
          </div>
        )}
        <h3 className="text-sm font-bold text-[#6B7280]">{title}</h3>
      </div>
      <p className="mb-2 text-2xl font-black text-[#111827]">{value}</p>
      {change && (
        <p className="text-sm font-semibold">
          <span
            className={
              changeType === 'positive' ? 'text-[#168044]' : changeType === 'negative' ? 'text-[#B91C1C]' : 'text-[#6B7280]'
            }
          >
            {change}
          </span>
          <span className="ml-2 text-xs font-medium text-[#8A94A8]">monthly</span>
        </p>
      )}
      {typeof progress === 'number' && <Progress value={progress} className="mt-3" />}
    </div>
  );
}
