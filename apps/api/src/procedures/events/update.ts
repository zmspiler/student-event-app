import {
  EventSchema,
  EventUpdateOneSchema,
} from "../../../prisma/generated/schemas";
import { requireAuth } from "../../middleware/require-auth";
import { prisma } from "../../prisma";

export default requireAuth
  .input(EventUpdateOneSchema)
  .output(EventSchema)
  .handler(async ({ input }) => {
    const event = await prisma.event.update(input);
    return event;
  });
