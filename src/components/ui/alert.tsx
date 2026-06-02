import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const alertVariants = cva(
  "relative w-full rounded-lg border px-4 py-3 text-xs font-semibold [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground",
  {
    variants: {
      variant: {
        default: "border-[#DDE4F2] bg-[#F0F3FF] text-[#1F2A6D]",
        destructive:
          "border-[#FECACA] bg-[#FEF2F2] text-[#991B1B]",
        success: "border-[#CFEBDD] bg-[#EAF7EF] text-[#166534]",
        warning: "border-[#FFD8B5] bg-[#FFF3EA] text-[#9A4A00]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

function Alert({
  className,
  variant,
  ...props
}: React.ComponentProps<"div"> &
  VariantProps<typeof alertVariants>) {
  return (
    <div
      data-slot="alert"
      role="alert"
      className={cn(alertVariants({ variant }), className)}
      {...props}
    />
  );
}

function AlertTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-title"
      className={cn("mb-1 font-black leading-none [&_svg]:size-4", className)}
      {...props}
    />
  );
}

function AlertDescription({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-description"
      className={cn("text-xs font-medium", className)}
      {...props}
    />
  );
}

export { Alert, AlertTitle, AlertDescription };
