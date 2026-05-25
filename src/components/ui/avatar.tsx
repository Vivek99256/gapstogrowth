import type { HTMLAttributes, ImgHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

export function Avatar({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('relative flex h-9 w-9 shrink-0 overflow-hidden rounded-full bg-[#FFF3EA]', className)} {...props} />;
}

export function AvatarImage({ className, alt = '', ...props }: ImgHTMLAttributes<HTMLImageElement>) {
  return <img alt={alt} className={cn('aspect-square h-full w-full object-cover', className)} {...props} />;
}

export function AvatarFallback({ className, ...props }: HTMLAttributes<HTMLSpanElement>) {
  return <span className={cn('flex h-full w-full items-center justify-center text-xs font-black text-[#C45B00]', className)} {...props} />;
}
