import { NextRequest, NextResponse } from "next/server";

import {
  AddTaskSchema,
  DeleteManyTasksSchema,
  TaskQuery,
  TaskQuerySchema,
} from "@/schemas/tasks.sever";
import { tasksService } from "@/server/modules/tasks-service";
import { withErrorHandling } from "@/server/withErrorHandling";

export const GET = withErrorHandling(async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);

  const parsed: TaskQuery = TaskQuerySchema.parse(
    Object.fromEntries(searchParams),
  );
  const tasks = await tasksService.getAll(parsed);

  return NextResponse.json(tasks, { status: 200 });
});

export const POST = withErrorHandling(async (req: NextRequest) => {
  const body = await req.json();

  const parsed = AddTaskSchema.parse(body);

  const result = await tasksService.add(parsed);

  return NextResponse.json(result, { status: 201 });
});

export const DELETE = withErrorHandling(async (req: NextRequest) => {
  const body = await req.json();
  const parsedBody = DeleteManyTasksSchema.parse(body);

  const result = await tasksService.removeMany(parsedBody);

  return NextResponse.json(result, { status: 200 });
});
