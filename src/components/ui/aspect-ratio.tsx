import type { HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

export function AspectRatio({
  ratio = 16 / 9,
  className,
  style,
  ...props
}: HTMLAttributes<HTMLDivElement> & { ratio?: number }) {
  return <div className={cn('relative w-full overflow-hidden', className)} style={{ aspectRatio: String(ratio), ...style }} {...props} />;
}
