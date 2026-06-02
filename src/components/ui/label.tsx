import * as React from "react";

import { cn } from "@/lib/utils";

function Label({ className, ...props }: React.ComponentProps<"label">) {
  return (
    <label
      data-slot="label"
      className={cn(
        "flex items-center gap-2 text-xs font-bold text-foreground select-none",
        className
      )}
      {...props}
    />
  );
}

function RequiredIndicator() {
  return <span className="text-primary" aria-hidden="true">*</span>;
}

export { Label, RequiredIndicator };
