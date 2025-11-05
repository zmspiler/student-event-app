import {
  EventInputSchema,
  EventModelSchema
} from "../../../prisma/generated/schemas";
import { requireAuth } from "../../middleware/require-auth";
import { prisma } from "../../prisma";

export default requireAuth
  .route({
    method: "POST",
    tags: ["events"],
    path: "/events",
    successStatus: 201,
  })
  .input(EventInputSchema)
  .output(EventModelSchema)
  .handler(async ({ input }) => {
    const event = await prisma.event.create({
      data: input,
    });
    return event;
  });
