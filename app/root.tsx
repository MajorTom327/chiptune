import type { LoaderFunction, MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";
import {
  AuthenticityTokenProvider,
  createAuthenticityToken,
} from "remix-utils";
import Layout from "./components/Layout/Layout";
import { sessionStorage } from "./services/session.server";
import styles from "./styles/app.css";
import authenticator from "./services/auth.server";
import type UserSession from "./types/UserSession";
import { Analytics } from "@vercel/analytics/react";
import roleController from "./controllers/RoleController";
import type { Role } from "@prisma/client";

export function links() {
  return [{ rel: "stylesheet", href: styles }];
}

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "Bellz",
  viewport: "width=device-width,initial-scale=1",
});

type LoaderData = {
  csrf: string;
  user?: UserSession | null;
  roles: Role[];
  env: Record<string, string | undefined>;
};

export const loader: LoaderFunction = async ({ request }) => {
  const session = await sessionStorage.getSession(
    request.headers.get("cookie")
  );

  const csrf = createAuthenticityToken(session);
  const user = await authenticator.isAuthenticated(request);
  const roles: Role[] = await roleController.getUserRoles(user?.id);

  const env = {};

  return json<LoaderData>(
    { csrf, user, roles, env },
    {
      headers: {
        "Set-Cookie": await sessionStorage.commitSession(session),
      },
    }
  );
};

export default function App() {
  let { csrf } = useLoaderData<LoaderData>();

  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <AuthenticityTokenProvider token={csrf}>
          <Layout>
            <Outlet />
            <ScrollRestoration />
            <Scripts />
            <LiveReload />
          </Layout>
        </AuthenticityTokenProvider>
      </body>
    </html>
  );
}
