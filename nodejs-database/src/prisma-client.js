import { PrismaClient } from "./generated/prisma";

export const prismaClient = new PrismaClient({
    errorFormat: "pretty",
    log: ["query", "info", "warn", "error"]
});