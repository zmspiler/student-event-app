import { EventModelSchema } from "../../../prisma/generated/schemas";
import { requireAuth } from "../../middleware/require-auth";
import { prisma } from "../../prisma";

export default requireAuth
  .output(EventModelSchema.array())
  .handler(async () => prisma.event.findMany());
