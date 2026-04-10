import { create } from "zustand";

import { Order } from "@/app/types";
import { Task } from "@/schemas/tasks";

type TaskOrderState = {
  order: Order;
  sortBy: keyof Task | null;

  setOrder: (order: Order) => void;
  setSortBy: (sortBy: keyof Task | null) => void;

  resetSorting: () => void;
};

export const useTaskOrder = create<TaskOrderState>((set) => ({
  order: "asc",
  sortBy: null,

  setOrder: (order) => set({ order }),
  setSortBy: (sortBy) => set({ sortBy }),

  resetSorting: () => set({ order: "asc", sortBy: null }),
}));
