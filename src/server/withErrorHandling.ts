import { Prisma } from "@root/generated/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

import { CommonError } from "@/app/types";

// TS2344: Type T does not satisfy the constraint "/api/tasks"
// Type string is not assignable to type "/api/tasks"

export function withErrorHandling<TParams = unknown>(
  handler: (req: NextRequest, context: TParams) => Promise<Response>,
) {
  return async (req: NextRequest, context: TParams) => {
    try {
      return await handler(req, context);
    } catch (err) {
      console.error({ ApiHandledError: err });
      if (err instanceof Prisma.PrismaClientKnownRequestError) {
        return NextResponse.json<CommonError>(
          {
            name: err.name,
            message: err.message,
            details: JSON.stringify(err.meta),
          },
          { status: 400 },
        );
      }

      if (err instanceof ZodError) {
        return NextResponse.json<CommonError>(
          {
            name: err.name,
            message: err.message,
            details: err.issues.toString(),
          },
          { status: 400 },
        );
      }

      if (err instanceof Error) {
        return NextResponse.json(
          {
            error: err.name,
            message: err.message,
            details: err.stack ?? "" + err.cause,
          },
          { status: 500 },
        );
      }

      return NextResponse.json(
        {
          error: "UnknownError",
          message: "Something went wrong",
        },
        { status: 500 },
      );
    }
  };
}
