import { oc } from "@orpc/contract";
import z from "zod";
import { EventSchema } from "../prisma/generated/schemas";

const PublicEventSchema = EventSchema.omit({
  createdAt: true,
  updatedAt: true,
});

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
      .output(PublicEventSchema)
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
      .output(PublicEventSchema.array()),
    getUnapproved: oc
      .route({
        method: "GET",
        tags: ["events"],
        path: "/events/unapproved",
        successStatus: 200,
      })
      .output(PublicEventSchema.array())
      .errors({
        FORBIDDEN: {
          message: "You do not have permission to view unapproved events.",
          status: 403,
        },
      }),
    setApproval: oc
      .route({
        method: "POST",
        tags: ["events"],
        path: "/events/{id}/approval",
        successStatus: 200,
      })
      .input(
        z.object({
          id: z.cuid(),
          approved: z.boolean(),
        }),
      )
      .errors({
        FORBIDDEN: {
          message: "You do not have permission to set event approval.",
          status: 403,
        },
      }),
    create: oc
      .route({
        method: "POST",
        tags: ["events"],
        path: "/events",
        successStatus: 201,
      })
      .input(
        PublicEventSchema.extend({
          date: z.coerce.date(),
          imageBase64: z.base64().optional(),
        }).omit({ id: true, imageUrl: true, ownerId: true, approved: true }),
      )
      .output(PublicEventSchema)
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
        PublicEventSchema.extend({
          id: z.cuid(),
          date: z.coerce.date(),
          imageBase64: z.base64().optional(),
        }).omit({ imageUrl: true, ownerId: true, approved: true }),
      )
      .output(PublicEventSchema)
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
