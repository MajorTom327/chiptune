import { authenticator } from "~/services/auth.server";

export const preventNotLogged = (request: Request) => {
  return authenticator.isAuthenticated(request, { failureRedirect: "/login" })
}
