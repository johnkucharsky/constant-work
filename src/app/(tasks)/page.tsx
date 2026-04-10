import { Box } from "@mui/material";

import FiltersBar from "@/app/(tasks)/components/filters";
import SearchBar from "@/app/(tasks)/components/search-bar";
import TaskTable from "@/app/(tasks)/components/task-table";
import { CommonError } from "@/app/types";
import { url } from "@/lib/url-builder";
import { TaskResponse } from "@/schemas/tasks";

export const dynamic = "force-dynamic";

async function fetchTasks(): Promise<TaskResponse> {
  const res = await fetch(url("/api/tasks", { limit: 5 }));

  if (!res.ok) {
    const parsed: CommonError = await res.json();
    throw new Error(JSON.stringify(parsed.details + parsed.message));
  }

  return (await res.json()) as TaskResponse;
}

export default async function ProductsPage() {
  const tasks = await fetchTasks();

  return (
    <Box
      sx={{
        backgroundColor: "#f6f6f6",
        pt: 2.5,
        height: "100%",
      }}
    >
      <SearchBar />
      <FiltersBar />
      <TaskTable initialTasks={tasks} />
    </Box>
  );
}
