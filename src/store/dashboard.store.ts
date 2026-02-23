import { create } from "zustand";

type FilterState = Record<string, string[]>;

interface DashboardState {
  pieMode: "value" | "percentage";
  projectionMode: "numbers" | "dollars";
  filters: FilterState;
  sortField: string;
  sortDirection: "asc" | "desc";
  page: number;
  pageSize: number;
  setPieMode: (mode: "value" | "percentage") => void;
  setProjectionMode: (mode: "numbers" | "dollars") => void;
  setFilter: (key: string, value: string[]) => void;
  setSort: (field: string, direction: "asc" | "desc") => void;
  setPage: (page: number) => void;
}

export const useDashboardStore = create<DashboardState>((set) => ({
  pieMode: "value",
  projectionMode: "numbers",
  filters: {},
  sortField: "name",
  sortDirection: "asc",
  page: 1,
  pageSize: 10,
  setPieMode: (mode) => set({ pieMode: mode }),
  setProjectionMode: (mode) => set({ projectionMode: mode }),
  setFilter: (key, value) =>
    set((state) => ({ filters: { ...state.filters, [key]: value } })),
  setSort: (field, direction) =>
    set({ sortField: field, sortDirection: direction }),
  setPage: (page) => set({ page }),
}));
