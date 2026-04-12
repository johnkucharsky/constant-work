import { NextRequest, NextResponse } from "next/server";

import { EditTaskSchema, TaskParamsSchema } from "@/schemas/tasks.sever";
import { tasksService } from "@/server/modules/tasks-service";
import { withErrorHandling } from "@/server/withErrorHandling";

// DELETE /tasks/:id
export const DELETE = withErrorHandling(
  async (_req: NextRequest, ctx: RouteContext<"/api/tasks/[id]">) => {
    const params = await ctx.params;

    const { id } = TaskParamsSchema.parse(params);

    const result = await tasksService.remove({ id });

    return NextResponse.json(result, { status: 200 });
  },
);

// PATCH /tasks/:id
export const PATCH = withErrorHandling(
  async (req: NextRequest, ctx: RouteContext<"/api/tasks/[id]">) => {
    const params = await ctx.params;
    const { id } = TaskParamsSchema.parse(params);
    const body = await req.json();
    const parsed = EditTaskSchema.parse(body);

    const result = await tasksService.edit({
      id,
      ...parsed,
    });

    return NextResponse.json(result, { status: 201 });
  },
);
