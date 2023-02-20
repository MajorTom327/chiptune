import type { PrismaClient } from "@prisma/client";
import authController from "~/controllers/AuthController";
import { RoleEnum } from "~/enums/RoleEnum";

export const seedUser = async (prisma: PrismaClient) => {
  prisma.user.count().then(async (count) => {
    if (count === 0) {
      await authController.signIn("me@valentin-thomas.com", "password")
        .then(async (user) => {
          return prisma.user.update({
            where: { id: user.id },
            data: {
              roles: {
                connect: {
                  name: RoleEnum.admin
                }
              }
            }
          })
        });
    }
  });
};

export default seedUser
