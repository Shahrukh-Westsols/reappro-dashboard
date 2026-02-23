"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Primary RE", equity: 101.6, total: 165.5 },
  { name: "Investment RE", equity: 79.1, total: 79.1 },
];

export function CustomBarChart() {
  return (
    <ResponsiveContainer width="100%" height={250}>
      <BarChart data={data}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="equity" fill="#8884d8" />
        <Bar dataKey="total" fill="#82ca9d" />
      </BarChart>
    </ResponsiveContainer>
  );
}
