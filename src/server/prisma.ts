import "dotenv/config";

import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@root/generated/prisma/client";

export class DatabaseUnavailableError extends Error {
  constructor(message = "Database is not available. Did you start Docker?") {
    super(message);
    this.name = "DatabaseUnavailableError";
  }
}

const connectionString = `${process.env.DATABASE_URL}`;

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

let databaseCheckPromise: Promise<void> | null = null;

export const ensureDatabaseConnection = async () => {
  if (databaseCheckPromise === null) {
    databaseCheckPromise = prisma.$queryRaw`SELECT 1`
      .then(() => undefined)
      .catch(() => {
        databaseCheckPromise = null;
        throw new DatabaseUnavailableError();
      });
  }

  await databaseCheckPromise;
};

export { prisma };
