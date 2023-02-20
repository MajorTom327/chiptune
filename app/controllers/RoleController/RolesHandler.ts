import type { Role, User } from "@prisma/client";
import { mapSeries } from "bluebird";
import { append, compose, flatten, isEmpty, map, propOr, uniq } from "ramda";
import { isNilOrEmpty } from "ramda-adjunct";
import { prisma } from "~/db.server";
import type { RoleEnum } from "~/enums/RoleEnum";

export class RolesHandler {
  async getUserRole(userId?: string): Promise<Role[]> {
    if (!userId) {
      return [];
    }

    const user = await prisma.user.findFirst({
      where: { id: userId },
      include: {
        roles: true
      },
    });

    const roles = propOr([], "roles", user) as Role[];


    if (isNilOrEmpty(roles)) {
      return [];
    }

    return Promise.all(
      roles.map((role) => this.getChildTree(role))
    ).then((result) => {
      // @ts-ignore
      return compose(
        uniq,
        flatten,
        append(roles)
      )(result) as Role[];
    });
  }

  async userHasRole(userId: string, rolesName: string[]): Promise<boolean> {
    const roles = await this.getUserRole(userId);
    return roles.some(({ name }) => rolesName.includes(name));
  }

  async ensureUserHasRole(
    user: User | string,
    roleName: string | RoleEnum
  ): Promise<boolean> {
    const userId = typeof user === "string" ? user : user.id;
    const hasRole = await this.userHasRole(userId, [roleName]);

    if (hasRole) {
      return true;
    }
    throw new Response(`User does not have a valid role`, {
      statusText: "Forbidden",
      status: 403,
    });
  }

  async ensureUserHasRoles(
    user: User | string,
    rolesName: (string | RoleEnum)[]
  ): Promise<boolean> {
    const userId = typeof user === "string" ? user : user.id;
    const hasRole = await this.userHasRole(userId, rolesName);

    if (hasRole) {
      return true;
    }

    throw new Response(`User does not have a valid role`, {
      statusText: "Forbidden",
      status: 403,
    });
  }

  private async getChildTree(parent: Role): Promise<Role[]> {
    const current = await prisma.role.findFirst({
      where: {
        id: parent.id,
      },
      include: {
        childrens: true,
      },
    });

    if (!current || isEmpty(current.childrens)) {
      return [];
    }
    const childrens = current.childrens;

    const subChilds = await Promise.all(
      childrens.map((child) => this.getChildTree(child))
    );

    // @ts-ignore
    return compose(
      uniq,
      flatten,
      append(parent),
      append(flatten(subChilds))
    )(childrens) as Role[];
  }
}

export const rolesHandler = new RolesHandler();
export default rolesHandler;
