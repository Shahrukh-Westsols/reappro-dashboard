"use client";

import * as React from "react";
import { IconFilter } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useDashboardStore } from "@/store/dashboard.store";

interface FilterPopoverProps {
  options: { key: string; label: string; options: string[] }[];
}

export function FilterPopover({ options }: FilterPopoverProps) {
  const { filters, setFilter } = useDashboardStore();

  const handleCheckedChange = (
    key: string,
    value: string,
    checked: boolean,
  ) => {
    const current = filters[key] || [];
    const updated = checked
      ? [...current, value]
      : current.filter((v) => v !== value);
    setFilter(key, updated);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <IconFilter className="h-4 w-4" /> Filters
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="space-y-4">
          {options.map((filter) => (
            <div key={filter.key}>
              <h4 className="mb-2 font-medium">{filter.label}</h4>
              <div className="space-y-2">
                {filter.options.map((opt) => (
                  <div key={opt} className="flex items-center space-x-2">
                    <Checkbox
                      id={`${filter.key}-${opt}`}
                      checked={filters[filter.key]?.includes(opt) || false}
                      onCheckedChange={(checked) =>
                        handleCheckedChange(filter.key, opt, checked === true)
                      }
                    />
                    <Label htmlFor={`${filter.key}-${opt}`}>{opt}</Label>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}
