"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FilterPopover } from "./filter-popover";

interface TableToolbarProps {
  onSearch: (value: string) => void;
  filterOptions: { key: string; label: string; options: string[] }[];
}

export function TableToolbar({ onSearch, filterOptions }: TableToolbarProps) {
  return (
    <div className="flex items-center gap-2 py-4">
      <Input
        placeholder="Search..."
        className="max-w-sm"
        onChange={(e) => onSearch(e.target.value)}
      />
      <FilterPopover options={filterOptions} />
      <Button variant="outline" size="sm">
        Sort by
      </Button>
    </div>
  );
}
