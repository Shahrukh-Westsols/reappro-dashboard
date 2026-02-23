import { Suspense } from "react";
import { MetricsCards } from "@/components/dashboard/metrics-cards";
import { PieWidget } from "@/components/dashboard/pie-widget";
import { BarWidget } from "@/components/dashboard/bar-widget";
import { MapWidget } from "@/components/dashboard/map-widget";
import { CustomBarWidget } from "@/components/dashboard/custom-bar-widget";
import { DataTable } from "@/components/dashboard/data-table";
import { columns } from "./columns";
import { Skeleton } from "@/components/ui/skeleton";

const filterOptions = [
  { key: "status", label: "Status", options: ["Active", "Pending", "Closed"] },
  { key: "type", label: "Type", options: ["Residential", "Commercial"] },
];

export default function AdminDashboardPage() {
  return (
    <div className="space-y-6 p-6">
      <Suspense fallback={<Skeleton className="h-24 w-full" />}>
        <MetricsCards />
      </Suspense>
      <div className="grid gap-6 lg:grid-cols-2">
        <PieWidget />
        <BarWidget />
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <MapWidget />
        <CustomBarWidget />
      </div>
      <DataTable columns={columns} filterOptions={filterOptions} />
    </div>
  );
}
