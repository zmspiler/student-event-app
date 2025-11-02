import z from "zod";
import { EventSchema } from "../../../prisma/generated/schemas";
import { requireAuth } from "../../middleware/require-auth";
import { prisma } from "../../prisma";

export default requireAuth
  .input(z.cuid())
  .output(EventSchema)
  .handler(async ({ input, errors }) => {
    const event = await prisma.event.findUnique({
      where: { id: input },
    });

    if (!event) {
      throw errors.NOT_FOUND;
    }

    return event;
  });
