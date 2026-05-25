import type { DetailsHTMLAttributes, HTMLAttributes } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

export function Accordion({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('divide-y divide-[#EEF1F7] rounded-lg border border-[#DDE4F2] bg-white', className)} {...props} />;
}

export function AccordionItem({ className, ...props }: DetailsHTMLAttributes<HTMLDetailsElement>) {
  return <details className={cn('group', className)} {...props} />;
}

export function AccordionTrigger({ className, children, ...props }: HTMLAttributes<HTMLElement>) {
  return (
    <summary
      className={cn('flex cursor-pointer list-none items-center justify-between gap-3 px-4 py-3 text-sm font-black text-[#111827] marker:hidden', className)}
      {...props}
    >
      {children}
      <ChevronDown className="h-4 w-4 shrink-0 text-[#2E3A8C] transition group-open:rotate-180" />
    </summary>
  );
}

export function AccordionContent({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('px-4 pb-4 text-sm font-medium leading-6 text-[#6B7280]', className)} {...props} />;
}
