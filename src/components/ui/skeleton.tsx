"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      className={cn("bg-[#E8EDF6] animate-pulse rounded-md", className)}
      {...props}
    />
  );
}

export { Skeleton };
