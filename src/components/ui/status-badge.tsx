import { Badge } from './badge';

const statusVariants: Record<string, 'success' | 'warning' | 'danger' | 'default' | 'outline'> = {
  active: 'success',
  completed: 'success',
  success: 'success',
  pending: 'warning',
  draft: 'warning',
  inactive: 'danger',
  failed: 'danger',
  high: 'danger',
  medium: 'warning',
  low: 'success',
};

export function StatusBadge({ status, className }: { status: string; className?: string }) {
  return (
    <Badge variant={statusVariants[status.toLowerCase()] || 'default'} className={className}>
      {status}
    </Badge>
  );
}
