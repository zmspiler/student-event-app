import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import { PrismaClient } from "../generated/prisma/client";
import { DATABASE_URL } from "./environment";

const adapter = new PrismaBetterSqlite3({
  url: DATABASE_URL || "file:./prisma/dev.db",
});

export const prisma = new PrismaClient({ adapter });
