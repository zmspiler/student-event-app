import { oc } from "@orpc/contract";
import z from "zod";
import { EventInputSchema, EventSchema } from "../prisma/generated/schemas";

export const contract = {
  events: {
    get: oc
      .route({
        method: "GET",
        tags: ["events"],
        path: "/events/{id}",
        successStatus: 200,
      })
      .input(z.object({ id: z.cuid() }))
      .output(EventSchema)
      .errors({
        NOT_FOUND: {
          message: "Entity not found.",
          status: 404,
        },
      }),
    getAll: oc
      .route({
        method: "GET",
        tags: ["events"],
        path: "/events",
        successStatus: 200,
      })
      .input(
        z.object({
          find: z.string().optional(),
          ownerId: z.string().optional(),
        }),
      )
      .output(EventSchema.array()),
    create: oc
      .route({
        method: "POST",
        tags: ["events"],
        path: "/events",
        successStatus: 201,
      })
      .input(
        EventInputSchema.extend({
          date: z.coerce.date(),
          imageBase64: z.base64().optional(),
        }).omit({ imageUrl: true, owner: true, ownerId: true }),
      )
      .output(EventSchema)
      .errors({
        INVALID_IMAGE_TYPE: {
          message: "Invalid image file type. Allowed types are png, jpg, jpeg.",
          status: 400,
        },
      }),
    update: oc
      .route({
        method: "PUT",
        tags: ["events"],
        path: "/events/{id}",
        successStatus: 200,
      })
      .input(
        EventInputSchema.extend({
          id: z.cuid(),
          date: z.coerce.date(),
          imageBase64: z.base64().optional(),
        }).omit({ imageUrl: true, owner: true, ownerId: true }),
      )
      .output(EventSchema)
      .errors({
        NOT_FOUND: {
          message: "Entity not found.",
          status: 404,
        },
        INVALID_IMAGE_TYPE: {
          message: "Invalid image file type. Allowed types are png, jpg, jpeg.",
          status: 400,
        },
      }),
    delete: oc
      .route({
        method: "DELETE",
        tags: ["events"],
        path: "/events/{id}",
        successStatus: 204,
      })
      .input(z.object({ id: z.cuid() }))
      .errors({
        NOT_FOUND: {
          message: "Entity not found.",
          status: 404,
        },
      }),
  },
};
