import z from "zod";
import { requireAuth } from "../../middleware/require-auth";
import { prisma } from "../../prisma";

export default requireAuth
.route({
  method: "DELETE",
  path: "/events/{id}",
  successStatus: 204,
})
  .input(z.object({ id: z.cuid() }))
  .handler(async ({ input, errors }) => {
    const event = await prisma.event.delete({
      where: { id: input.id },
    });

    if (!event) {
      throw errors.NOT_FOUND;
    }
  });
