import * as React from "react";

import { cn } from "@/lib/utils";

function FormSection({
  title,
  description,
  className,
  children,
  ...props
}: Omit<React.ComponentProps<"section">, "title"> & {
  title: React.ReactNode;
  description?: React.ReactNode;
}) {
  return (
    <section className={cn("space-y-4 border-t border-border pt-5 first:border-t-0 first:pt-0", className)} {...props}>
      <div>
        <h3 className="text-sm font-black text-foreground">{title}</h3>
        {description && <p className="mt-1 text-xs font-medium text-muted-foreground">{description}</p>}
      </div>
      {children}
    </section>
  );
}

export { FormSection };
