import * as React from "react";

import { Label, RequiredIndicator } from "@/components/ui/label";
import { cn } from "@/lib/utils";

type FormFieldProps = React.ComponentProps<"div"> & {
  label: React.ReactNode;
  htmlFor?: string;
  required?: boolean;
  helpText?: React.ReactNode;
  error?: React.ReactNode;
  success?: React.ReactNode;
};

function FormField({
  className,
  label,
  htmlFor,
  required,
  helpText,
  error,
  success,
  children,
  ...props
}: FormFieldProps) {
  const message = error ?? success ?? helpText;

  return (
    <div className={cn("space-y-2", className)} {...props}>
      <Label htmlFor={htmlFor}>
        {label}
        {required && <RequiredIndicator />}
      </Label>
      {children}
      {message && (
        <p
          className={cn(
            "text-xs font-medium text-muted-foreground",
            error && "text-danger",
            success && !error && "text-success",
          )}
        >
          {message}
        </p>
      )}
    </div>
  );
}

export { FormField };
export type { FormFieldProps };
