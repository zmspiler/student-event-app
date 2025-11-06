import z from "zod";
import { EventSchema } from "../../../prisma/generated/schemas";
import { base } from "../../middleware/base";
import { prisma } from "../../prisma";

export default base
  .route({
    method: "GET",
    tags: ["events"],
    path: "/events/{id}",
    successStatus: 200,
  })
  .input(z.object({ id: z.cuid() }))
  .output(EventSchema)
  .handler(async ({ input, errors }) => {
    const event = await prisma.event.findUnique({
      where: { id: input.id },
    });

    if (!event) {
      throw errors.NOT_FOUND();
    }

    return event;
  });
