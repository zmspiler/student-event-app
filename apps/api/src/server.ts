import Fastify from "fastify";
import { handler } from "./handler";

const fastify = Fastify();

fastify.addContentTypeParser("*", (_request, _payload, done) => {
  // Fully utilize oRPC feature by allowing any content type
  // And let oRPC parse the body manually by passing `undefined`
  done(null, undefined);
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

fastify
  .listen({ port: 3000 })
  .then(() => console.log("Server running on http://localhost:3000"));
