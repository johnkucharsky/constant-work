import { Priority, Status } from "@root/generated/prisma/enums";
import { z } from "zod";

export const Meta = z.object({
  total: z.number(),
  page: z.number(),
  limit: z.number(),
  totalPages: z.number(),
});

export const PrioritySchema = z.enum(["LOW", "MEDIUM", "HIGH"]);
export const StatusSchema = z.enum(["TODO", "IN_PROGRESS", "DONE"]);

export const TaskSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string().nullable(),
  priority: PrioritySchema,
  status: StatusSchema,
  dueDate: z.string().nullable(),
  createdAt: z.string(),
  updatedAt: z.string(),
  tags: z.array(z.string()),
  parentId: z.string().nullable(),
});

export const TaskResponseSchema = z.object({
  data: z.array(TaskSchema),
  meta: Meta,
});

export const TaskQuerySchema = z.object({
  page: z.coerce.number().min(1).default(1),
  limit: z.coerce.number().min(1).max(50).default(5),
  sortBy: TaskSchema.keyof().optional(),
  order: z.enum(["asc", "desc"]).optional(),
  priority: PrioritySchema.optional(),
  status: StatusSchema.optional(),
  dueDateStart: z.string().optional(),
  dueDateEnd: z.string().optional(),
  q: z.string().optional(),
});

export type TaskResponse = z.infer<typeof TaskResponseSchema>;
export type TaskQuery = z.infer<typeof TaskQuerySchema>;
export type Task = z.infer<typeof TaskSchema>;

export const priorityLabel: Record<Priority, string> = {
  LOW: "Низкий",
  MEDIUM: "Средний",
  HIGH: "Высокий",
};

export const statusLabel: Record<Status, string> = {
  TODO: "Ожидает",
  IN_PROGRESS: "В работе",
  DONE: "Готово",
};

export const TaskParamsSchema = z.object({
  id: z.string(),
});
export type TaskParamsType = z.infer<typeof TaskParamsSchema>;

export const EditTaskSchema = TaskSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
}).partial();

export type EditTaskType = z.infer<typeof EditTaskSchema>;

export const AddTaskSchema = z.object({
  title: z.string(),
  description: z.string().nullable().optional(),
  priority: PrioritySchema,
  status: StatusSchema,
  dueDate: z.string().nullable().optional(),
});
export type AddTaskType = z.infer<typeof AddTaskSchema>;

export const DeleteManyTasksSchema = z.object({
  ids: z.array(z.string()).min(1),
});

export type DeleteManyTasksType = z.infer<typeof DeleteManyTasksSchema>;

export const SingleTaskResponseSchema = z.object({
  data: TaskSchema,
});
export type SingleTaskResponseType = z.infer<typeof SingleTaskResponseSchema>;

export const DeleteManyTasksResponseSchema = z.object({
  count: z.number(),
});
