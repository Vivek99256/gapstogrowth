import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

function DataList({ className, ...props }: HTMLAttributes<HTMLDListElement>) {
  return <dl className={cn("space-y-3 text-xs", className)} {...props} />;
}

function DataListItem({ label, value, className }: { label: ReactNode; value: ReactNode; className?: string }) {
  return (
    <div className={cn("flex justify-between gap-4", className)}>
      <dt className="font-bold text-[#64748B]">{label}</dt>
      <dd className="text-right font-black text-[#111827]">{value}</dd>
    </div>
  );
}

export { DataList, DataListItem };
