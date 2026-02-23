import { useQuery } from "@tanstack/react-query";
import { dashboardService } from "../services/dashboard.service";

export function useDashboardData() {
  const metricsQuery = useQuery({
    queryKey: ["metrics"],
    queryFn: dashboardService.getMetrics,
  });

  const tableQuery = useQuery({
    queryKey: ["table"],
    queryFn: () => dashboardService.getTableData(1, 10, "name", "asc"),
  });

  return {
    metrics: metricsQuery.data,
    tableData: tableQuery.data,
    isLoading: metricsQuery.isLoading || tableQuery.isLoading,
    error: metricsQuery.error || tableQuery.error,
  };
}
