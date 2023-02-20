import type { Role } from "@prisma/client";
import { compose, complement, intersection, isEmpty, map, prop } from "ramda";
import { isEmptyArray } from "ramda-adjunct";
import type { RoleEnum } from "~/enums/RoleEnum";
import { useOptionalUser } from "../user/useOptionalUser"
import useRoles from "./useRoles";

type HasRoleQuery = RoleEnum | string | RoleEnum[] | string[]

type UseAuthorizeReturn = {
  hasRole: (roleName: HasRoleQuery) => boolean;
  roles: Role[]
}

export const useAuthorize = (): UseAuthorizeReturn => {
  const user = useOptionalUser();
  const roles = useRoles();

  const hasRole = (roleName: HasRoleQuery): boolean => {
    if (!user) return false;

    const roleNames = Array.isArray(roleName) ? roleName : [roleName];

    if (isEmpty(roleNames)) {
      return true;
    }

    // @ts-ignore
    const result = compose(
      complement(isEmptyArray),
      intersection(roleNames),
      map(prop("name"))
    )(roles) as boolean;

    return result;
  }

  return {
    hasRole,
    roles
  }
}

export default useAuthorize;
