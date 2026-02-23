"use client";

import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChartComponent } from "@/components/charts/pie-chart";
import { useDashboardStore } from "@/store/dashboard.store";
import { client } from "@/lib/api-client";
import { Skeleton } from "@/components/ui/skeleton";

export function PieWidget() {
  const { pieMode, setPieMode } = useDashboardStore();
  const { data, isLoading } = useQuery({
    queryKey: ["dashboard-metrics"],
    queryFn: () => client<{ totalBookValue: number }>("/dashboard"),
  });

  if (isLoading) return <Skeleton className="h-64 w-full" />;

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Real Estate Breakdown</CardTitle>
        <div className="flex gap-2">
          <button
            onClick={() => setPieMode("value")}
            className={`rounded px-2 py-1 text-xs ${pieMode === "value" ? "bg-primary text-white" : "bg-muted"}`}
          >
            Value
          </button>
          <button
            onClick={() => setPieMode("percentage")}
            className={`rounded px-2 py-1 text-xs ${pieMode === "percentage" ? "bg-primary text-white" : "bg-muted"}`}
          >
            Percentage
          </button>
        </div>
      </CardHeader>
      <CardContent>
        <PieChartComponent />
      </CardContent>
    </Card>
  );
}
