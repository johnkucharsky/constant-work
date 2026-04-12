import { Task } from "@/schemas/tasks.sever";

export interface TaskHeadCell {
  id: keyof Task;
  label: string;
}

export type Order = "asc" | "desc";

export type CommonError = { name: string; message: string; details?: string };
