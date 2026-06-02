import * as React from "react";

import { cn } from "@/lib/utils";

function FormActions({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("flex flex-col gap-3 border-t border-border pt-5 sm:flex-row sm:items-center sm:justify-end", className)}
      {...props}
    />
  );
}

export { FormActions };
