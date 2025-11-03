import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { auth } from "./auth";
import { handler } from "./handler";

const app = new Hono();

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

app.on(["POST", "GET"], "/api/auth/*", (c) => {
	return auth.handler(c.req.raw);
});

serve({
  fetch: app.fetch,
  port: 3000
});
