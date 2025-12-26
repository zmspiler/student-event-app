import { base } from "@/middleware/base";
import { prisma } from "@/utils/prisma";

export default base.events.getAll.handler(async ({ input }) =>
  prisma.event.findMany({
    where: {
      title: {
        contains: input.find,
      },
      ownerId: input.ownerId,
      approved: true,
    },
  }),
);
