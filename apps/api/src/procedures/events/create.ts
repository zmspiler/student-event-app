import {
  EventCreateOneSchema,
  EventSchema,
} from "../../../prisma/generated/schemas";
import { requireAuth } from "../../middleware/require-auth";
import { prisma } from "../../prisma";

export default requireAuth
  .input(EventCreateOneSchema)
  .output(EventSchema)
  .handler(async ({ input }) => {
    const event = await prisma.event.create(input);
    return event;
  });
