import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useDashboardStore } from "@/store/dashboard.store";

const data = [
  { name: "Jan", numbers: 4000, dollars: 2400 },
  { name: "Feb", numbers: 3000, dollars: 1398 },
  { name: "Mar", numbers: 2000, dollars: 9800 },
  { name: "Apr", numbers: 2780, dollars: 3908 },
  { name: "May", numbers: 1890, dollars: 4800 },
  { name: "Jun", numbers: 2390, dollars: 3800 },
];

export function BarChartComponent() {
  const { projectionMode } = useDashboardStore();
  return (
    <ResponsiveContainer width="100%" height={250}>
      <BarChart data={data}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar
          dataKey={projectionMode === "numbers" ? "numbers" : "dollars"}
          fill="var(--color-primary)"
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
