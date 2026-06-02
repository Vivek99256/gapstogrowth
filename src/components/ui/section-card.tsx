import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "./card";

function SectionCard({
  className,
  contentClassName,
  title,
  description,
  action,
  children,
  ...props
}: HTMLAttributes<HTMLDivElement> & {
  contentClassName?: string;
  title?: ReactNode;
  description?: ReactNode;
  action?: ReactNode;
}) {
  return (
    <Card className={cn("p-0", className)} {...props}>
      {(title || description || action) && (
        <div className="flex items-start justify-between gap-4 px-5 pb-0 pt-5">
          <div className="min-w-0">
            {title && <h3 className="text-lg font-black text-foreground">{title}</h3>}
            {description && <p className="mt-1 text-xs font-medium leading-5 text-muted-foreground">{description}</p>}
          </div>
          {action && <div className="shrink-0">{action}</div>}
        </div>
      )}
      <CardContent className={cn(title || description || action ? "pt-4" : undefined, contentClassName)}>
        {children}
      </CardContent>
    </Card>
  );
}

export { SectionCard };
