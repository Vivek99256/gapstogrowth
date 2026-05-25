import type { DialogHTMLAttributes, HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

export function Dialog({ className, ...props }: DialogHTMLAttributes<HTMLDialogElement>) {
  return (
    <dialog
      className={cn('w-[min(92vw,520px)] rounded-xl border border-[#DDE4F2] bg-white p-0 text-[#111827] shadow-[0_24px_70px_rgba(31,42,109,0.18)] backdrop:bg-[#111827]/40', className)}
      {...props}
    />
  );
}

export function DialogHeader({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('border-b border-[#EEF1F7] p-5', className)} {...props} />;
}

export function DialogTitle({ className, ...props }: HTMLAttributes<HTMLHeadingElement>) {
  return <h2 className={cn('text-lg font-black text-[#111827]', className)} {...props} />;
}

export function DialogDescription({ className, ...props }: HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cn('mt-1 text-sm font-medium text-[#6B7280]', className)} {...props} />;
}

export function DialogContent({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('p-5', className)} {...props} />;
}

export function DialogFooter({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('flex justify-end gap-3 border-t border-[#EEF1F7] p-5', className)} {...props} />;
}
