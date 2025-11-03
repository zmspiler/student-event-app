import z from "zod";
import { requireAuth } from "../../middleware/require-auth";
import { EventModelSchema } from "../../../prisma/generated/schemas";
import { prisma } from "../../prisma";

export default requireAuth
  .input(z.cuid())
  .output(EventModelSchema)
  .handler(async ({ input, errors }) => {
    const event = await prisma.event.findUnique({
      where: { id: input },
    });

    if (!event) {
      throw errors.NOT_FOUND;
    }

    return event;
  });
