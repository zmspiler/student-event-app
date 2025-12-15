import { serve } from "@hono/node-server";
import { serveStatic } from "@hono/node-server/serve-static";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { auth } from "@/utils/auth";
import { handler } from "./handler";
import { CLIENT_ORIGIN } from "./utils/environment";

const app = new Hono();

app.use(logger());

app.use(
  "*",
  cors({
    origin: CLIENT_ORIGIN || "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
    credentials: true,
  }),
);

app.use("/static/*", serveStatic({ root: "./public" }));

app.use(async (c, next) => {
  const expoOrigin = c.req.raw.headers.get("expo-origin");
  if (expoOrigin) {
    c.req.raw.headers.set("origin", expoOrigin);
  }
  await next();
});

// RPC routes
app.use("/rpc/*", async (c, next) => {
  const { matched, response } = await handler.handle(c.req.raw, {
    prefix: "/rpc",
    context: {}, // Provide initial context if needed
  });

  if (matched) {
    return c.newResponse(response.body, response);
  }

  await next();
});

// Auth routes
app.on(["POST", "GET"], "/auth/*", (c) => {
  return auth.handler(c.req.raw);
});

const server = serve({
  fetch: app.fetch,
  port: 3000,
});

server.on("listening", () => {
  console.log(`Server is ready.`);
});

// Handle graceful shutdown
process.on("SIGINT", () => {
  server.close();
  process.exit(0);
});

process.on("SIGTERM", () => {
  server.close((err) => {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    process.exit(0);
  });
});
