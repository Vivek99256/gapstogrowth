import { Badge } from './badge';

const statusVariants: Record<string, 'success' | 'warning' | 'destructive' | 'default' | 'outline'> = {
  active: 'success',
  completed: 'success',
  success: 'success',
  pending: 'warning',
  draft: 'warning',
  inactive: 'destructive',
  failed: 'destructive',
  high: 'destructive',
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
