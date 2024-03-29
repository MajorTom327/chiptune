import type { ActionFunction } from "@remix-run/node";
import authenticator from "~/services/auth.server";

export const action: ActionFunction = async ({ request }) => {
  console.log("Logging out");

  await authenticator.logout(request, {
    redirectTo: "/login",
  });
  return null;
};
