import { EventModelSchema } from "../../../prisma/generated/schemas";
import { base } from "../../middleware/base";
import { prisma } from "../../prisma";

export default base
  .route({
    method: "GET",
    tags: ["events"],
    path: "/events",
    successStatus: 200,
  })
  .output(EventModelSchema.array())
  .handler(async () => prisma.event.findMany());
