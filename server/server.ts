import path from "path";
import express from "express";
import compression from "compression";
import morgan from "morgan";
import helmet from "helmet";

const { createRequestHandler } = require("@remix-run/express");

const BUILD_DIR = path.join(process.cwd(), "build");
const BUILD_FILE = path.join(BUILD_DIR, "index.js");

const app = express();

app.use(compression());

if (process.env.NODE_ENV === "production") {
  app.use(helmet());
} else {
  // http://expressjs.com/en/advanced/best-practice-security.html#at-a-minimum-disable-x-powered-by-header
  app.disable("x-powered-by");
}

// Remix fingerprints its assets so we can cache forever.
app.use(
  "/build",
  express.static("public/build", { immutable: true, maxAge: "1y" })
);

// Everything else (like favicon.ico) is cached for an hour. You may want to be
// more aggressive with this caching.
app.use(express.static("public", { maxAge: "1h" }));

app.use(morgan("tiny"));

app.all(
  "*",
  process.env.NODE_ENV === "development"
    ? (req, res, next) => {
      purgeRequireCache();

      return createRequestHandler({
        build: require(BUILD_FILE),
        mode: process.env.NODE_ENV,
      })(req, res, next);
    }
    : createRequestHandler({
      build: require(BUILD_FILE),
      mode: process.env.NODE_ENV,
    })
);


function purgeRequireCache() {
  // purge require cache on requests for "server side HMR" this won't let
  // you have in-memory objects between requests in development,
  // alternatively you can set up nodemon/pm2-dev to restart the server on
  // file changes, but then you'll have to reconnect to databases/etc on each
  // change. We prefer the DX of this, so we've included it for you by default
  for (const key in require.cache) {
    if (key.startsWith(BUILD_DIR)) {
      delete require.cache[key];
    }
  }
}


export default app;
