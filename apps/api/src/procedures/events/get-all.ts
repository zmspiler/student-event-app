import { base } from "../../middleware/base";
import { prisma } from "../../prisma";

export default base.events.getAll.handler(async () => prisma.event.findMany());
