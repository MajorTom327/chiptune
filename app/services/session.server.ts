import { createCookieSessionStorage } from "@remix-run/node";
import assert from 'node:assert';
import { isNil, path } from "ramda";
import { isProduction } from "~/lib/isEnv";

const sessionSecret = path<string>(['env', 'SESSION_SECRET'], process);

assert(!isNil(sessionSecret), "SESSION_SECRET is not defined");

export const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: "__session",
    httpOnly: true,
    path: "/",
    sameSite: "lax",
    secrets: [sessionSecret!],
    secure: isProduction(),
  },
});

export let { getSession, commitSession, destroySession } = sessionStorage;
