"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Property } from "@/lib/validations/dashboard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";

export const columns: ColumnDef<Property>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Name
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    accessorKey: "netWorth",
    header: "Net Worth",
    cell: ({ row }) => `$${row.getValue<number>("netWorth").toLocaleString()}`,
  },
  {
    accessorKey: "irr",
    header: "IRR",
    cell: ({ row }) => `${row.getValue<number>("irr")}%`,
  },
  {
    accessorKey: "totalValue",
    header: "Total Value",
    cell: ({ row }) =>
      `$${row.getValue<number>("totalValue").toLocaleString()}`,
  },
  {
    id: "status",
    header: "Status",
    cell: () => <Badge variant="outline">Active</Badge>,
  },
];
