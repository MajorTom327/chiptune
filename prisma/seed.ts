import seed from "./seeds";
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

seed(prisma)
  .catch((e: any) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
