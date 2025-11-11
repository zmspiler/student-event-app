import { requireAuth } from "../../middleware/require-auth";
import { prisma } from "../../prisma";

export default requireAuth.events.delete.handler(async ({ input, errors }) => {
  const event = await prisma.event.delete({
    where: { id: input.id },
  });

  if (!event) {
    throw errors.NOT_FOUND();
  }
});
