import { prisma } from "~/db.server";
import rolesHandler from "./RolesHandler";

export class RoleController {
  async createRole(name: string) {
    const role = await prisma.role.create({
      data: {
        name
      }
    });

    return role;
  }

  async getUserRoles(userId?: string) {
    if (!userId) return [];
    return rolesHandler.getUserRole(userId);
  }

  async getAllRoles() {
    return prisma.role.findMany();
  }



}


export const roleController = new RoleController();
export default roleController
