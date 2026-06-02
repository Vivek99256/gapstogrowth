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
    outline: "border-border bg-card text-secondary-foreground hover:bg-muted",
    ghost: "border-transparent bg-transparent text-secondary-foreground hover:bg-secondary",
    subtle: "border-border bg-muted text-secondary-foreground hover:bg-secondary",
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
