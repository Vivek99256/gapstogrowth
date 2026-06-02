import * as React from "react";

import { cn } from "@/lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "flex h-9 w-full rounded-md border border-[#D7DDEB] bg-white px-3 py-1 text-xs font-semibold text-[#111827] shadow-sm transition outline-none placeholder:text-[#9CA3AF] focus:border-[#FF6A00] focus:ring-4 focus:ring-[#FF6A00]/10 disabled:cursor-not-allowed disabled:bg-[#F8FAFE] disabled:text-[#8A94A8]",
        className
      )}
      {...props}
    />
  );
}

export { Input };
