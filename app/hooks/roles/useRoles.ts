import type { Role } from "@prisma/client";
import { useMatchesData } from "../useMatchesData";

export const useRoles = (): Role[] => {
  const roles = useMatchesData<Role[]>("root")?.roles;
  return roles ?? [];
};

export default useRoles;
