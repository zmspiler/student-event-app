import { requireAuth } from "@/middleware/require-auth";
import { prisma } from "@/utils/prisma";

export default requireAuth.events.setApproval.handler(
  async ({ context: { session }, errors, input }) => {
    if (!session.user.role || session.user.role !== "admin") {
      throw errors.FORBIDDEN();
    }

    return prisma.event.update({
      data: {
        approved: input.approved,
      },
      where: {
        id: input.id,
      },
    });
  },
);
