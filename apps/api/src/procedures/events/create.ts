import { requireAuth } from "@/middleware/require-auth";
import { saveBase64Image } from "@/utils/files";
import { prisma } from "@/utils/prisma";

export default requireAuth.events.create.handler(
  async ({ input: { imageBase64, ...input }, errors }) => {
    let imageName: string | undefined;

    if (imageBase64) {
      try {
        imageName = await saveBase64Image(imageBase64, "png");
      } catch {
        throw errors.INVALID_IMAGE_TYPE();
      }
    }

    const event = await prisma.event.create({
      data: {
        ...input,
        imageUrl: imageName ? `/uploads/images/${imageName}` : undefined,
      },
    });
    return event;
  },
);
