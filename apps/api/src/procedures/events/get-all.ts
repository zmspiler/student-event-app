import { os } from "@orpc/server";
import { EventSchema } from "../../../prisma/generated/schemas";
import { prisma } from "../../prisma";

export default os
  .output(EventSchema.array())
  .handler(async () => prisma.event.findMany());
