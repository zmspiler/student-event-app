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
        }),
      )
      .output(EventSchema),
    update: oc
      .route({
        method: "PUT",
        tags: ["events"],
        path: "/events/{id}",
        successStatus: 200,
      })
      .input(EventInputSchema.extend({ id: z.cuid() }))
      .output(EventSchema)
      .errors({
        NOT_FOUND: {
          message: "Entity not found.",
          status: 404,
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
