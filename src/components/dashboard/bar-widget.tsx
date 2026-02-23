"use client";

import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChartComponent } from "@/components/charts/bar-chart";
import { useDashboardStore } from "@/store/dashboard.store";
import { client } from "@/lib/api-client";
import { Skeleton } from "@/components/ui/skeleton";

export function BarWidget() {
  const { projectionMode, setProjectionMode } = useDashboardStore();
  const { data, isLoading } = useQuery({
    queryKey: ["dashboard-metrics"],
    queryFn: () => client<{ totalBookValue: number }>("/dashboard"),
  });

  if (isLoading) return <Skeleton className="h-64 w-full" />;

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Monthly Projections</CardTitle>
        <div className="flex gap-2">
          <button
            onClick={() => setProjectionMode("numbers")}
            className={`rounded px-2 py-1 text-xs ${projectionMode === "numbers" ? "bg-primary text-white" : "bg-muted"}`}
          >
            Numbers
          </button>
          <button
            onClick={() => setProjectionMode("dollars")}
            className={`rounded px-2 py-1 text-xs ${projectionMode === "dollars" ? "bg-primary text-white" : "bg-muted"}`}
          >
            Dollars
          </button>
        </div>
      </CardHeader>
      <CardContent>
        <BarChartComponent />
      </CardContent>
    </Card>
  );
}
