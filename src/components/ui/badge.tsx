import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-md border px-2 py-1 text-[11px] font-black whitespace-nowrap shrink-0 [&_svg]:not-[class*='size-']]:size-3 [&_svg]:pointer-events-none gap-1 [&_svg]:shrink-0 transition-all duration-200",
  {
    variants: {
      variant: {
        default: "border-transparent bg-[#EEF2FF] text-[#2E3A8C]",
        secondary: "border-transparent bg-[#F8FAFE] text-[#64748B]",
        destructive: "border-transparent bg-[#FEE2E2] text-[#B91C1C]",
        outline: "border border-[#DDE4F2] bg-white text-[#64748B]",
        success: "border-transparent bg-[#EAF7EF] text-[#168044]",
        warning: "border-transparent bg-[#FFF3EA] text-[#C45B00]",
        navy: "border-transparent bg-[#1F2A6D] text-white",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <span
      data-slot="badge"
      className={cn(badgeVariants({ variant }), className)}
      role="status"
      {...props}
    />
  );
}

export { Badge, badgeVariants };
