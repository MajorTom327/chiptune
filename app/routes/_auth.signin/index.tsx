import React from "react";
import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import Card from "~/components/Card";
import { signInForm } from "~/forms/Auth";
import Button from "~/components/Button";
import { useFetcher } from "@remix-run/react";
import logger from "~/lib/logger.server";
import { isNotNil } from "ramda-adjunct";
import authController from "~/controllers/AuthController";

type LoaderData = {};

export const loader: LoaderFunction = async () => {
  if (process.env.DISABLE_AUTH) {
    return redirect("/");
  }
  return null;
};

export const SigninPage = () => {
  const fetcher = useFetcher();

  return (
    <div>
      <Card>
        <div className="card-title">
          <h1 className="text-2xl text-center">Login</h1>
        </div>
        {signInForm.render({
          fetcher,
          children: (
            <div className="flex justify-end gap-2">
              <Button to="/login">Login</Button>
              <Button variant="success" type="submit">
                SignIn
              </Button>
            </div>
          ),
          method: "post",
          action: "/signin",
        })}
      </Card>
    </div>
  );
};

export const action: ActionFunction = async ({ request }) => {
  const cloneRequest = request.clone();
  const formdata = await request.formData();
  await signInForm.verifyToken(cloneRequest).catch((error) => {
    logger.verbose("Token is invalid", { error });
    throw error;
  });

  const { error, data } = await signInForm.parse(formdata);

  if (isNotNil(error)) {
    return { error, data };
  }

  await authController.signIn(data.email, data.password);
  return redirect("/login");
};

export default SigninPage;
