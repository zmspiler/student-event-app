import { EventModelSchema } from "../../../prisma/generated/schemas";
import { requireAuth } from "../../middleware/require-auth";
import { prisma } from "../../prisma";

export default requireAuth
  .route({
    method: "GET",
    tags: ["events"],
    path: "/events",
    successStatus: 200,
  })
  .output(EventModelSchema.array())
  .handler(async () => prisma.event.findMany());
