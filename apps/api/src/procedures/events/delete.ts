import { requireAuth } from "@/middleware/require-auth";
import { prisma } from "@/utils/prisma";

export default requireAuth.events.delete.handler(
  async ({ input, errors, context: { session } }) => {
    const event = await prisma.event.delete({
      where: { id: input.id, ownerId: session.user.id },
    });

    if (!event) {
      throw errors.NOT_FOUND();
    }
  },
);
