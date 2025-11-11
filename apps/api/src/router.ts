import type { RouterClient } from "@orpc/server";
import createEvent from "./procedures/events/create";
import deleteEvent from "./procedures/events/delete";
import getEvent from "./procedures/events/get";
import getAllEvents from "./procedures/events/get-all";
import updateEvent from "./procedures/events/update";

export const router = {
  events: {
    get: getEvent,
    getAll: getAllEvents,
    create: createEvent,
    update: updateEvent,
    delete: deleteEvent,
  },
};

export type SEARouterClient = RouterClient<typeof router>;
