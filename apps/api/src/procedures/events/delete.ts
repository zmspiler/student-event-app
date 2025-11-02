import { EventDeleteOneSchema } from "../../../prisma/generated/schemas";
import { requireAuth } from "../../middleware/require-auth";
import { prisma } from "../../prisma";

export default requireAuth
  .input(EventDeleteOneSchema)
  .handler(async ({ input, errors }) => {
    const event = await prisma.event.delete(input);

    if (!event) {
      throw errors.NOT_FOUND;
    }
  });
