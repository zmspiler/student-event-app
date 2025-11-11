import { requireAuth } from "../../middleware/require-auth";
import { prisma } from "../../prisma";

export default requireAuth.events.update.handler(async ({ input }) => {
  const event = await prisma.event.update({
    where: { id: input.id },
    data: input,
  });
  return event;
});
