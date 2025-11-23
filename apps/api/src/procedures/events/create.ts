import { requireAuth } from "../../middleware/require-auth";
import { prisma } from "../../prisma";
import { saveImage } from "../../utils/files";

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
