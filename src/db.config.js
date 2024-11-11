// db.config.js
import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";

dotenv.config();

const prisma = new PrismaClient();

prisma.$connect().catch((err) => {
    console.error("Prisma connection error:", err);
});

export { prisma };
