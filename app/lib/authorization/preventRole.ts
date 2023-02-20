import { redirect } from "@remix-run/server-runtime";
import roleController from "~/controllers/RoleController";
import type { RoleEnum } from "~/enums/RoleEnum";
import { authenticator } from "~/services/auth.server";

export const preventRole = async (request: Request, role: RoleEnum) => {
  const user = await authenticator.isAuthenticated(request, { failureRedirect: "/login" });

  return roleController.getUserRoles(user.id).then((roles) => {
    if (roles.some((r) => r.name === role)) {
      return true;
    } else {
      throw redirect("/");
    }
  });
}
