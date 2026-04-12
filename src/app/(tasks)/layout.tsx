import { PropsWithChildren } from "react";

import { ensureDatabaseConnection } from "@/server/prisma";

export default async function TasksLayout({ children }: PropsWithChildren) {
  await ensureDatabaseConnection();
  return children;
}
