import { PrismaClient } from "@prisma/client";

// Single shared Prisma Client instance for the whole app. Creating a new
// PrismaClient() inside every route file would open a new connection pool
// per file — this singleton avoids that, and with `node --watch` restarts
// during dev, `globalThis` caching also prevents exhausting DB connections
// from repeated hot-reload instantiations.

const globalForPrisma = globalThis;

export const prisma =
    globalForPrisma.prisma ??
    new PrismaClient({
        log: process.env.NODE_ENV === "development" ? ["warn", "error"] : ["error"],
    });

if (process.env.NODE_ENV !== "production") {
    globalForPrisma.prisma = prisma;
}