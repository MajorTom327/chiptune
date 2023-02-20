import type { PrismaClient } from "@prisma/client";
import seedRole from "./seedRoles";
import seedUser from "./seedUser";

export const seed = async (prisma: PrismaClient) => {
  await seedRole(prisma);
  await seedUser(prisma);
};

export default seed;
