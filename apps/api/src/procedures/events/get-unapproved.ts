import { requireAuth } from "@/middleware/require-auth";
import { prisma } from "@/utils/prisma";

export default requireAuth.events.getUnapproved.handler(
  async ({ context: { session }, errors }) => {
    if (!session.user.role || session.user.role !== "admin") {
      throw errors.FORBIDDEN();
    }

    return prisma.event.findMany({
      where: {
        approved: false,
      },
    });
  },
);
