import React from "react";
import { useFetcher, useSearchParams } from "@remix-run/react";
import { loginForm } from "~/forms/Auth";
import Card from "~/components/Card";
import Button from "~/components/Button";
import { isNotNil } from "ramda-adjunct";
import type { ActionFunction } from "@remix-run/node";
import authenticator from "~/services/auth.server";
import logger from "~/lib/logger.server";
import Alert from "~/components/Alert/Alert";

type Props = {};

export const Login: React.FC<Props> = ({}) => {
  const fetcher = useFetcher();
  const [search] = useSearchParams();

  const badCredentials = search.get("badCredentials");

  return (
    <>
      <Card>
        <div className="card-title">
          <h1 className="text-2xl text-center">Login</h1>
        </div>
        {badCredentials && (
          <Alert variant="error">
            <p>Bad credentials</p>
          </Alert>
        )}
        {loginForm.render({
          fetcher,
          children: (
            <div className="flex justify-end gap-2">
              <Button to="/signin">Sign in</Button>
              <Button variant="success" type="submit">
                Login
              </Button>
            </div>
          ),
          method: "post",
          action: "/login",
        })}
      </Card>
    </>
  );
};

export const action: ActionFunction = async ({ request }) => {
  logger.verbose("Login the user in");
  await loginForm.verifyToken(request).catch((error) => {
    logger.verbose("Token is invalid", { error });
    throw error;
  });
  logger.verbose("Token is valid");
  const cloneRequest = request.clone();
  const formData = await request.formData();
  const { error, data } = loginForm.parse(formData);

  if (isNotNil(error)) {
    return { error, data };
  }

  logger.verbose("Login the user with data:", { data });

  await authenticator.authenticate("user-pass", cloneRequest, {
    successRedirect: "/",
    failureRedirect: "/login?badCredentials=true",
  });

  return { data };
};

export default Login;
