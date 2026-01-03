import { requireAuth } from "@/middleware/require-auth";
import { prisma } from "@/utils/prisma";

export default requireAuth.events.delete.handler(
  async ({ input, errors, context: { session } }) => {
    const where: { id: string; ownerId?: string } = { id: input.id };
    if (!(session.user.role === "admin")) {
      where.ownerId = session.user.id;
    }

    const event = await prisma.event.delete({
      where,
    });

    if (!event) {
      throw errors.NOT_FOUND();
    }
  },
);
