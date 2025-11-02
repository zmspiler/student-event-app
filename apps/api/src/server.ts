import { createServer } from "node:http";
import { handler } from "./handler";

const server = createServer(async (req, res) => {
  const result = await handler.handle(req, res, {
    context: { headers: req.headers },
  });

  if (!result.matched) {
    res.statusCode = 404;
    res.end("No procesure matched.");
  }
});

server.listen(3000, "127.0.0.1", () =>
  console.log("Listening on 127.0.0.1:3000"),
);
