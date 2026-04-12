import { Prisma } from "@root/generated/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

import { CommonError } from "@/app/types";

const prismaErrorMap: Record<string, string> = {
  P2002: "Unique constraint failed",
  P2025: "Record not found",
};

export function withErrorHandling<TParams = unknown>(
  handler: (req: NextRequest, context: TParams) => Promise<Response>,
) {
  return async (req: NextRequest, context: TParams) => {
    try {
      return await handler(req, context);
    } catch (err) {
      // Always log full error internally
      console.error("API Error:", err);

      /**
       * 1. Prisma connection / initialization errors (Docker down, DB unreachable)
       */
      if (
        err instanceof Prisma.PrismaClientInitializationError ||
        err instanceof Prisma.PrismaClientRustPanicError
      ) {
        return NextResponse.json<CommonError>(
          {
            name: err.name,
            message: "Database is not available. Did you start Docker?",
          },
          { status: 503 },
        );
      }

      /**
       * 2. Prisma known request errors (bad queries, constraints, etc.)
       */
      if (err instanceof Prisma.PrismaClientKnownRequestError) {
        return NextResponse.json<CommonError>(
          {
            name: err.name,
            message: prismaErrorMap[err.code] ?? "Database query failed",
            details: err.meta ? JSON.stringify(err.meta) : undefined,
          },
          { status: 400 },
        );
      }

      /**
       * 3. Validation errors (Zod)
       */
      if (err instanceof ZodError) {
        return NextResponse.json<CommonError>(
          {
            name: err.name,
            message: "Validation failed",
            details: err.issues.map((i) => i.message).join(", "),
          },
          { status: 400 },
        );
      }

      /**
       * 4. Fallback (never leak internals)
       */
      return NextResponse.json(
        {
          error: "InternalServerError",
          message: "Something went wrong",
        },
        { status: 500 },
      );
    }
  };
}
