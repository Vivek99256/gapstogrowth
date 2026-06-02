import type { LucideIcon } from "lucide-react";
import * as React from "react";

import { cn } from "@/lib/utils";
import { Card, CardContent } from "./card";
import { Progress } from "./progress";

function MetricCard({
  title,
  value,
  change,
  changeType = "neutral",
  icon: Icon,
  iconClassName,
  progress,
  className,
}: {
  title: string;
  value: string;
  change?: string;
  changeType?: "positive" | "negative" | "neutral";
  icon?: LucideIcon;
  iconClassName?: string;
  progress?: number;
  className?: string;
}) {
  return (
    <Card className={cn("transition hover:shadow-lg", className)}>
      <CardContent className="p-5">
        <div className="mb-4 flex items-center gap-3">
          {Icon && (
            <div
              className={cn(
                "grid h-11 w-11 place-items-center rounded-lg bg-secondary text-secondary-foreground",
                iconClassName
              )}
            >
              <Icon className="h-5 w-5" />
            </div>
          )}
          <h3 className="text-sm font-bold text-muted-foreground">{title}</h3>
        </div>
        <p className="mb-2 text-2xl font-black text-foreground">{value}</p>
        {change && (
          <p className="text-sm font-semibold">
            <span
              className={
                changeType === "positive"
                  ? "text-success"
                  : changeType === "negative"
                    ? "text-danger"
                    : "text-muted-foreground"
              }
            >
              {change}
            </span>
            <span className="ml-2 text-xs font-medium text-muted-foreground">monthly</span>
          </p>
        )}
        {typeof progress === "number" && <Progress value={progress} className="mt-3" />}
      </CardContent>
    </Card>
  );
}

export { MetricCard };
