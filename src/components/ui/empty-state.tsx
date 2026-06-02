import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

function EmptyState({
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
    <div className={cn("flex min-h-56 flex-col items-center justify-center rounded-lg border border-dashed border-border bg-muted p-8 text-center", className)}>
      {icon && <div className="mb-3 grid h-10 w-10 place-items-center rounded-lg bg-card text-secondary-foreground shadow-sm">{icon}</div>}
      <h3 className="text-sm font-black text-foreground">{title}</h3>
      {description && <p className="mt-1 max-w-sm text-xs font-medium leading-5 text-muted-foreground">{description}</p>}
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}

export { EmptyState };
