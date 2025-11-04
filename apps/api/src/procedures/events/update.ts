import z from "zod";
import {
  EventInputSchema,
  EventSchema,
} from "../../../prisma/generated/schemas";
import { requireAuth } from "../../middleware/require-auth";
import { prisma } from "../../prisma";

export default requireAuth
.route({
  method: "PUT",
  tags: ["events"],
  path: "/events/{id}",
  successStatus: 200,
})
  .input(EventInputSchema.extend({ id: z.cuid() }))
  .output(EventSchema)
  .handler(async ({ input }) => {
    const event = await prisma.event.update({
      where: { id: input.id },
      data: input,
    });
    return event;
  });
