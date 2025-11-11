import { requireAuth } from "../../middleware/require-auth";
import { prisma } from "../../prisma";

export default requireAuth.events.create.handler(async ({ input }) => {
  const event = await prisma.event.create({
    data: input,
  });
  return event;
});
