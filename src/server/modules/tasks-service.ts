import { Prisma, Task as PrismaTask } from "@root/generated/prisma/client";

import {
  AddTaskType,
  EditTaskType,
  Task,
  TaskParamsType,
  TaskQuery,
  TaskResponse,
} from "@/schemas/tasks";
import { prisma } from "@/server/prisma";

export const tasksService = {
  async getAll({
    page = 1,
    limit = 10,
    sortBy,
    order = "desc",
    q,
    priority,
    status,
    dueDateStart,
    dueDateEnd,
  }: TaskQuery): Promise<TaskResponse> {
    // pagination
    const safeLimit = Math.min(limit, 50);
    const safePage = Math.max(page, 1);
    const skip = (safePage - 1) * safeLimit;
    // pagination

    // search and filters
    const where: Prisma.TaskWhereInput = {
      AND: [
        // 🔍 search
        q
          ? {
              OR: [
                { title: { contains: q, mode: "insensitive" } },
                { description: { contains: q, mode: "insensitive" } },
              ],
            }
          : {},

        priority ? { priority } : {},

        status ? { status } : {},

        dueDateStart || dueDateEnd
          ? {
              dueDate: {
                ...(dueDateStart && { gte: new Date(dueDateStart) }),
                ...(dueDateEnd && { lte: new Date(dueDateEnd) }),
              },
            }
          : {},
      ],
    };
    // search and filters

    // ordering
    const orderBy: Prisma.TaskOrderByWithRelationInput | undefined =
      sortBy !== undefined
        ? {
            [sortBy]: order,
          }
        : undefined;
    // ordering

    const [tasks, total] = await Promise.all([
      prisma.task.findMany({
        skip,
        take: safeLimit,
        where,
        orderBy,
      }),
      prisma.task.count({ where }),
    ]);

    return {
      data: serializeTasks(tasks),
      meta: {
        total,
        page: safePage,
        limit: safeLimit,
        totalPages: Math.ceil(total / safeLimit),
      },
    };
  },

  async remove({ id }: TaskParamsType): Promise<{ data: Task }> {
    const deletedTask = await prisma.task.delete({
      where: { id },
    });

    return {
      data: serializeTask(deletedTask),
    };
  },

  async edit(data: EditTaskType & TaskParamsType): Promise<{ data: Task }> {
    const { id, ...updateData } = data;

    const cleanData = Object.fromEntries(
      Object.entries(updateData).filter(([_, v]) => v !== undefined),
    ) as Partial<Omit<EditTaskType, "id">>;

    const updatedTask = await prisma.task.update({
      where: { id },
      data: {
        ...cleanData,
        ...(cleanData.dueDate !== undefined && {
          dueDate: cleanData.dueDate ? new Date(cleanData.dueDate) : null,
        }),
      },
    });

    return {
      data: serializeTask(updatedTask),
    };
  },
  async add(data: AddTaskType): Promise<{ data: Task }> {
    const createdTask = await prisma.task.create({ data });

    return {
      data: serializeTask(createdTask),
    };
  },
};

const serializeTasks = (tasks: PrismaTask[]) => {
  return tasks.map((task) => serializeTask(task));
};

const serializeTask = (task: PrismaTask) => ({
  ...task,
  dueDate: task.dueDate !== null ? task.dueDate.toISOString() : task.dueDate,
  createdAt: task.createdAt.toISOString(),
  updatedAt: task.updatedAt.toISOString(),
});
