import { NextRequest, NextResponse } from "next/server";

import { createOpenApiDocument } from "@/server/openapi";

export const GET = async (req: NextRequest) => {
  const { origin } = new URL(req.url);
  const document = createOpenApiDocument(origin);

  return NextResponse.json(document, { status: 200 });
};
