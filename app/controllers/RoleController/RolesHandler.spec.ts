import type { User } from "@prisma/client";
import seed from "~/../prisma/seeds";
import { prisma } from "~/db.server";
import RolesEnum from "~/enums/RoleEnum";
import { RolesHandler } from "./RolesHandler";

const rolesHandler = new RolesHandler();

let user: User;

describe.skip("RolesHandler", () => {

  beforeAll(async () => {
    await seed(prisma);
    let _user = await prisma.user.findFirst({
      where: {},
    });

    if (!_user) {
      throw new Error("User not found");
    }

    user = _user;
  });

  beforeEach(async () => {
    await prisma.user.update({
      where: { id: user.id },
      data: {
        roles: { connect: { name: RolesEnum.admin } },
      },
    });
  });

  test("Non existant role should return false", async () => {
    const hasRole = await rolesHandler.userHasRole(user.id, [
      "non-existant-role",
    ]);
    expect(hasRole).toBe(false);
  });

  test("as first level admin", async () => {
    const hasRole = await rolesHandler.userHasRole(user.id, [RolesEnum.admin]);
    expect(hasRole).toBe(true);
  });

  // test("as second level role", async () => {
  //   const hasRole = await rolesHandler.userHasRole(user.id, [RolesEnum.manager]);
  //   expect(hasRole).toBe(true);
  // });

  test("Should return empty if no userId", async () => {
    const roles = await rolesHandler.getUserRole();
    expect(roles).toEqual([]);
  });

  test("Should return empty if user doesnt exist", async () => {
    const roles = await rolesHandler.getUserRole("non-existant-user");
    expect(roles).toEqual([]);
  });

  test("Should return true if the user has the role", async () => {
    const hasRole = await rolesHandler.ensureUserHasRoles(user.id, [RolesEnum.admin]);
    expect(hasRole).toBe(true);
  })
});
