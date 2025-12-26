import { requireAuth } from "@/middleware/require-auth";
import { saveBase64Image } from "@/utils/files";
import { prisma } from "@/utils/prisma";

export default requireAuth.events.update.handler(
  async ({
    input: { imageBase64, ...input },
    errors,
    context: { session },
  }) => {
    let imageName: string | undefined;
    const where: { id: string; ownerId?: string } = { id: input.id };

    if (imageBase64) {
      try {
        imageName = await saveBase64Image(imageBase64, "png");
      } catch {
        throw errors.INVALID_IMAGE_TYPE();
      }
    }
    if (imageBase64) {
      try {
        imageName = await saveBase64Image(imageBase64, "png");
      } catch {
        throw errors.INVALID_IMAGE_TYPE();
      }
    }

    if (!(session.user.role === "admin")) {
      where.ownerId = session.user.id;
    }

    const event = await prisma.event.update({
      where,
      data: {
        ...input,
        ownerId: session.user.id,
        approved: false,
        imageUrl: imageName ? `/uploads/images/${imageName}` : undefined,
      },
    });
    return event;
  },
);
