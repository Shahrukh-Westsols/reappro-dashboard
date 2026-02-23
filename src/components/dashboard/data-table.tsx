"use client";

import * as React from "react";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  ColumnDef,
  SortingState,
  flexRender,
} from "@tanstack/react-table";
import { useQuery } from "@tanstack/react-query";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TableToolbar } from "./table-toolbar";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useDashboardStore } from "@/store/dashboard.store";
import { Skeleton } from "@/components/ui/skeleton";
import { client } from "@/lib/api-client";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  filterOptions: { key: string; label: string; options: string[] }[];
}

interface TableResponse {
  rows: any[];
  totalPages: number;
}

export function DataTable<TData, TValue>({
  columns,
  filterOptions,
}: DataTableProps<TData, TValue>) {
  const { page, pageSize, sortField, sortDirection, setPage } =
    useDashboardStore();
  const [sorting, setSorting] = React.useState<SortingState>([
    { id: sortField, desc: sortDirection === "desc" },
  ]);

  const { data, isLoading, error } = useQuery<TableResponse>({
    queryKey: ["table-data", page, pageSize, sortField, sortDirection],
    queryFn: () =>
      client(
        `/table-data?page=${page}&size=${pageSize}&sort=${sortField}&direction=${sortDirection}`,
      ),
  });

  const table = useReactTable({
    data: data?.rows || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    manualPagination: true,
    pageCount: data?.totalPages || 1,
    state: {
      sorting,
      pagination: { pageIndex: page - 1, pageSize },
    },
    onSortingChange: setSorting,
    onPaginationChange: (updater) => {
      const newPagination =
        typeof updater === "function"
          ? updater({ pageIndex: page - 1, pageSize })
          : updater;
      setPage(newPagination.pageIndex + 1);
    },
  });

  if (isLoading) return <Skeleton className="h-64 w-full" />;
  if (error) return <div className="text-red-500">Error loading data</div>;

  return (
    <div>
      <TableToolbar
        onSearch={(value) => {
          // Implement search if needed
        }}
        filterOptions={filterOptions}
      />
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => table.previousPage()}
                aria-disabled={!table.getCanPreviousPage()}
                className={
                  !table.getCanPreviousPage()
                    ? "pointer-events-none opacity-50"
                    : ""
                }
              />
            </PaginationItem>
            {Array.from({ length: table.getPageCount() }, (_, i) => i + 1).map(
              (pageNum) => (
                <PaginationItem key={pageNum}>
                  <PaginationLink
                    onClick={() => table.setPageIndex(pageNum - 1)}
                    isActive={
                      table.getState().pagination.pageIndex === pageNum - 1
                    }
                  >
                    {pageNum}
                  </PaginationLink>
                </PaginationItem>
              ),
            )}
            <PaginationItem>
              <PaginationNext
                onClick={() => table.nextPage()}
                aria-disabled={!table.getCanNextPage()}
                className={
                  !table.getCanNextPage()
                    ? "pointer-events-none opacity-50"
                    : ""
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}
