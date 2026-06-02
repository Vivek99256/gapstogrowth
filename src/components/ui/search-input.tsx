import { Search } from "lucide-react";
import * as React from "react";

import { cn } from "@/lib/utils";
import { Input } from "./input";

export function SearchInput({ className, ...props }: React.ComponentProps<"input">) {
  return (
    <div className="relative">
      <Search className="pointer-events-none absolute left-3 top-1/2 size-3.5 -translate-y-1/2 text-[#8A94A8]" />
      <Input
        className={cn("pl-9 pr-3", className)}
        {...props}
      />
    </div>
  );
}
