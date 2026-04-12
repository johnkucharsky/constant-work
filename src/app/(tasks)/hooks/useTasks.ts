import { useState } from "react";
import useSWR from "swr";

import { useTaskFilters } from "@/app/(tasks)/hooks/useTaskFilters";
import { useTaskOrder } from "@/app/(tasks)/hooks/useTaskOrder";
import { api } from "@/lib/api";
import {
  TaskQuery,
  TaskQuerySchema,
  TaskResponse,
  TaskResponseSchema,
} from "@/schemas/tasks.sever";

const LIMIT = 5;

export const useTasks = ({ initialTasks }: { initialTasks?: TaskResponse }) => {
  const { order, sortBy } = useTaskOrder();
  const { priority, status, dueDateStart, dueDateEnd, query } =
    useTaskFilters();
  const [page, setPage] = useState(1);

  const data = useSWR<TaskResponse | undefined, unknown, TaskQuery>(
    {
      page,
      order: sortBy !== undefined ? order : undefined,
      sortBy: sortBy ?? undefined,
      q: query,
      priority: priority ?? undefined,
      status: status ?? undefined,
      dueDateStart:
        dueDateStart !== null ? dueDateStart.toISOString() : undefined,
      dueDateEnd: dueDateEnd !== null ? dueDateEnd.toISOString() : undefined,
      limit: LIMIT,
    },
    async (params) => {
      const response = await api.get<TaskResponse>("/api/tasks", {
        params: TaskQuerySchema.parse(params),
      });

      return TaskResponseSchema.parse(response.data);
    },
    {
      keepPreviousData: true,
      fallbackData: initialTasks,
      revalidateOnMount: false,
      revalidateOnFocus: false,
    },
  );

  return {
    ...data,
    page,
    setPage,
  };
};
