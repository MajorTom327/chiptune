import type { PrismaClient } from "@prisma/client";
import { compose, isEmpty, keys, prop, reject, values } from "ramda";
import { roleMapping } from "~/config/roleMapping";
import { RoleEnum } from "~/enums/RoleEnum";

export const seedRole = async (prisma: PrismaClient) => {
  // * Insert all not existing roles
  await Promise.allSettled(
    values(RoleEnum).map((role) => (
      prisma.role.create({
        data: {
          name: role,
        }
      })
    ))
  );

  // * Add sub roles
  const cleanMapping = reject(compose(isEmpty, prop('permissions')), roleMapping)
  await Promise.allSettled(
    cleanMapping.map(({ role, permissions }) => (
      prisma.role.update({
        where: { name: role },
        data: { childrens: { connect: permissions.map((name) => ({ name })) } }
      })
    ))
  );

};

export default seedRole;
