import { EventSchema } from "../../../prisma/generated/schemas";
import { requireAuth } from "../../middleware/require-auth";
import { prisma } from "../../prisma";

export default requireAuth
.route({
  method: "GET",
  path: "/events",
  successStatus: 200,  
})
  .output(EventSchema.array())
  .handler(async () => prisma.event.findMany());
