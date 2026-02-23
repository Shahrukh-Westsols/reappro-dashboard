import { client } from "@/lib/api-client";
import { DashboardMetrics, TableData } from "../types";

export const dashboardService = {
  getMetrics: () => client<DashboardMetrics>("/dashboard"),
  getTableData: (page: number, size: number, sort: string, dir: string) =>
    client<TableData>(
      `/table-data?page=${page}&size=${size}&sort=${sort}&direction=${dir}`,
    ),
};
