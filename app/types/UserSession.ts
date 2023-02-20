import type { Role, User } from "@prisma/client"

export type UserSession = User & {
  roles: Role[]
}

export default UserSession;
