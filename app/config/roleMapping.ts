import { RoleEnum } from "~/enums/RoleEnum";
import type { RoleMapping } from "~/types/RoleMapping";

export const roleMapping: RoleMapping[] = [
  { role: RoleEnum.admin, permissions: [] },
  { role: RoleEnum.user, permissions: [] },
];

export default roleMapping;
