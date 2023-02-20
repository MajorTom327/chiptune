import { prisma } from "~/db.server";
import bcrypt from "bcryptjs";
import { assoc, compose, omit, pathOr } from "ramda";
import type { UserSession } from "~/types/UserSession";
import { defaultRole } from "~/refs/constant";
import { roleController } from "./RoleController";
import logger from "~/lib/logger.server";

export class AuthController {

  private hashPassword(password: string) {
    return bcrypt.hash(password, 10);
  }

  async signIn(email: string, password: string) {
    const hashedPassword = await this.hashPassword(password);
    return prisma.user.create({
      data: {
        email,
        password: {
          create: {
            hash: hashedPassword,
          },
        },
        roles: {
          connect: {
            name: defaultRole,
          }
        }
      },
    })
  }

  async login(email: string, password: string): Promise<UserSession> {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
      include: {
        password: true,
      },
    });

    if (!user) {
      throw new Error("User not found");
    }
    const passwordMatch = await bcrypt.compare(password, pathOr('', ['password', 'hash'], user));
    if (!passwordMatch) {
      throw new Error("Invalid password");
    }

    const userRoles = await roleController.getUserRoles(user.id)

    return compose(
      assoc('roles', userRoles),
      omit(['password'])
    )(user) as UserSession;
  }

  async setUserPassword(userId: string, password: string) {
    const hashedPassword = await this.hashPassword(password);
    return prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        password: {
          upsert: {
            create: {
              hash: hashedPassword,
            },
            update: {
              hash: hashedPassword,
            }
          },
        },
      },
    });
  }
}

export const authController = new AuthController();

export default authController;
