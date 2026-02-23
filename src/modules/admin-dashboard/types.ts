import { Property } from "@/lib/validations/dashboard";

export interface DashboardMetrics {
  totalBookValue: number;
  investmentRealEstate: number;
  primaryRealEstate: number;
  aum: number;
}

export interface TableData {
  rows: Property[];
  totalPages: number;
}
