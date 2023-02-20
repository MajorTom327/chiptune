import type { RoleEnum } from "~/enums/RoleEnum"

export type RoleMapping = {
  role: RoleEnum,
  permissions: RoleEnum[]
}
