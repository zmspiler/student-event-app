import fastifyCors from "@fastify/cors";
import Fastify from "fastify";
import { auth } from "./auth";
import { handler } from "./handler";

const fastify = Fastify({ logger: true });

fastify.addContentTypeParser("*", (_request, _payload, done) => {
  // Fully utilize oRPC feature by allowing any content type
  // And let oRPC parse the body manually by passing `undefined`
  done(null, undefined);
});

fastify.register(fastifyCors, {
  origin: process.env.CLIENT_ORIGIN || "http://localhost:3080",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
  credentials: true,
  maxAge: 86400,
});

fastify.all("/rpc/*", async (req, reply) => {
  const { matched } = await handler.handle(req, reply, {
    prefix: "/rpc",
    context: {}, // Provide initial context if needed
  });

  if (!matched) {
    reply.status(404).send("Not found");
  }
});

// Register authentication endpoint
fastify.route({
  method: ["GET", "POST"],
  url: "/auth/*",
  async handler(request, reply) {
    try {
      // Construct request URL
      const url = new URL(request.url, `http://${request.headers.host}`);

      // Convert Fastify headers to standard Headers object
      const headers = new Headers();
      Object.entries(request.headers).forEach(([key, value]) => {
        if (value) headers.append(key, value.toString());
      });
      // Create Fetch API-compatible request
      const req = new Request(url.toString(), {
        method: request.method,
        headers,
        body: request.body ? JSON.stringify(request.body) : undefined,
      });
      // Process authentication request
      const response = await auth.handler(req);
      // Forward response to client
      reply.status(response.status);
      // biome-ignore lint/suspicious/useIterableCallbackReturn: Copied from example
      response.headers.forEach((value, key) => reply.header(key, value));
      reply.send(response.body ? await response.text() : null);
    } catch (error) {
      // Log error with structured object to satisfy Fastify/pino types
      fastify.log.error({ err: error }, "Authentication Error");
      reply.status(500).send({
        error: "Internal authentication error",
        code: "AUTH_FAILURE",
      });
    }
  },
});

fastify.listen({ port: 3000 });
