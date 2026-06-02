import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";
import { Button } from "./button";

export function IconButton({
  className,
  variant = "outline",
  size = "md",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "outline" | "ghost" | "subtle";
  size?: "sm" | "md" | "lg";
}) {
  const sizeClasses: Record<string, string> = {
    sm: "h-8 w-8 rounded-md",
    md: "h-9 w-9 rounded-md",
    lg: "h-10 w-10 rounded-lg",
  };

  const variantClass: Record<string, string> = {
    primary: "",
    outline: "border-[#DCE3F2] bg-white text-[#1F2A6D] hover:bg-[#F4F7FB]",
    ghost: "border-transparent bg-transparent text-[#1F2A6D] hover:bg-[#EEF2FF]",
    subtle: "border-[#DDE4F2] bg-[#F8FAFE] text-[#2E3A8C] hover:bg-[#EEF2FF]",
  };

  return (
    <Button
      variant={variant === "primary" ? "default" : "ghost"}
      size="icon"
      className={cn(sizeClasses[size], variant === "primary" ? "" : variantClass[variant], className)}
      {...props}
    />
  );
}
