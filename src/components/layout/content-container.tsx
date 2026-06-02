import * as React from "react";

import { cn } from "@/lib/utils";

function ContentContainer({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn("mx-auto w-full max-w-[1440px]", className)} {...props} />;
}

export { ContentContainer };
