import { base } from "@/middleware/base";
import { prisma } from "@/utils/prisma";

export default base.events.get.handler(async ({ input, errors }) => {
  const event = await prisma.event.findUnique({
    where: { id: input.id },
  });

  if (!event) {
    throw errors.NOT_FOUND();
  }

  return event;
});
