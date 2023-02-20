import type { UserSession } from "~/types/UserSession";

import { useOptionalUser } from "./useOptionalUser";



export function useUser(): UserSession {
  const maybeUser = useOptionalUser();
  if (!maybeUser) {
    throw new Error(
      "No user found in root loader, but user is required by useUser. If user is optional, try useOptionalUser instead."
    );
  }
  return maybeUser;
}
