import { PrismaClient } from "@prisma/client";

declare global {
  // Extend the global object with a property named 'prisma' to store the PrismaClient instance
  namespace NodeJS {
    interface Global {
      prisma?: PrismaClient;
    }
  }
}

const prisma: PrismaClient =
  process.env.NODE_ENV === "production"
    ? new PrismaClient()
    : (global as any).prisma ?? ((global as any).prisma = new PrismaClient());

export default prisma;
