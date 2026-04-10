import { Priority, Status } from "@root/generated/prisma/enums";
import { create } from "zustand";

type TaskFiltersState = {
  query: string;
  priority: Priority | null;
  status: Status | null;
  dueDateStart: Date | null;
  dueDateEnd: Date | null;

  setQuery: (query: string) => void;
  setPriority: (priority: Priority | null) => void;
  setStatus: (status: Status | null) => void;
  setDueDateStart: (date: Date | null) => void;
  setDueDateEnd: (date: Date | null) => void;

  resetFilters: () => void;
};

export const useTaskFilters = create<TaskFiltersState>((set) => ({
  query: "",
  priority: null,
  status: null,
  dueDateStart: null,
  dueDateEnd: null,

  setQuery: (query) => set({ query }),
  setPriority: (priority) => set({ priority }),
  setStatus: (status) => set({ status }),
  setDueDateStart: (dueDateStart) => set({ dueDateStart }),
  setDueDateEnd: (dueDateEnd) => set({ dueDateEnd }),

  resetFilters: () =>
    set({
      query: "",
      priority: null,
      status: null,
      dueDateStart: null,
      dueDateEnd: null,
    }),
}));
