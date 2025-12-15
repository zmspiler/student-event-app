import { requireAuth } from "@/middleware/require-auth";
import { saveImage } from "@/utils/files";
import { prisma } from "@/utils/prisma";

export default requireAuth.events.create.handler(async ({ input, errors }) => {
  let imageName: string | undefined;

  if (input.image) {
    try {
      imageName = await saveImage(input.image, ["png", "jpg", "jpeg"]);
    } catch {
      throw errors.INVALID_IMAGE_TYPE();
    }
  }

  const event = await prisma.event.create({
    data: {
      ...input,
      imageUrl: imageName ? `/images/${imageName}` : undefined,
    },
  });
  return event;
});
