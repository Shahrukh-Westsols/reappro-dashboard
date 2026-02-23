import * as React from "react";
import { cn } from "@/lib/utils/cn";

interface ChartContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  config: Record<string, { label: string; color: string }>;
}

export function ChartContainer({
  config,
  className,
  children,
  ...props
}: ChartContainerProps) {
  const style = Object.entries(config).reduce((acc, [key, { color }]) => {
    acc[`--color-${key}`] = color;
    return acc;
  }, {} as React.CSSProperties);

  return (
    <div className={cn("relative", className)} style={style} {...props}>
      {children}
    </div>
  );
}
