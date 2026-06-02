import * as React from "react";

import { cn } from "@/lib/utils";

interface AspectRatioProps extends React.HTMLAttributes<HTMLDivElement> {
  ratio?: number;
}

function AspectRatio({
  ratio = 16 / 9,
  className,
  style,
  ...props
}: AspectRatioProps) {
  return <div style={{ aspectRatio: String(ratio), ...style }} className={cn("relative w-full overflow-hidden", className)} {...props} />;
}

export { AspectRatio };
