import { Priority, Status } from "@root/generated/prisma/enums";
import { addYears, startOfDay } from "date-fns";
import z from "zod";

export const AddTaskFormSchema = z.object({
  title: z
    .string()
    .trim()
    .min(2, "Название слишком короткое")
    .max(100, "Название слишком длинное"),

  description: z.string().optional(),

  priority: z.enum(Priority, { message: "Выберите приоритет" }),

  status: z.enum(Status, {
    message: "Выберите статус",
  }),

  dueDate: z
    .date()
    .nullable()
    .refine(
      (date) => !date || date >= startOfDay(new Date()),
      "Дата не может быть раньше сегодняшнего дня",
    )
    .refine(
      (date) => !date || date <= addYears(new Date(), 1),
      "Дата не может быть больше чем через год",
    ),
});
export type AddTaskFormType = typeof AddTaskFormSchema;
export type AddTaskFormFields = z.infer<typeof AddTaskFormSchema>;

export const EditTaskFormSchema = z.object({
  title: z.string().trim().max(100, "Название слишком длинное").optional(),

  description: z.string().optional(),

  priority: z
    .enum(Priority, { message: "Выберите приоритет" })
    .optional()
    .or(z.literal("")),

  status: z
    .enum(Status, {
      message: "Выберите статус",
    })
    .optional()
    .or(z.literal("")),

  dueDate: z
    .date()
    .nullable()
    .refine(
      (date) => !date || date >= startOfDay(new Date()),
      "Дата не может быть раньше сегодняшнего дня",
    )
    .refine(
      (date) => !date || date <= addYears(new Date(), 1),
      "Дата не может быть больше чем через год",
    )
    .optional(),
});
export type EditTaskFormType = typeof EditTaskFormSchema;
export type EditTaskFormFields = z.infer<typeof EditTaskFormSchema>;
