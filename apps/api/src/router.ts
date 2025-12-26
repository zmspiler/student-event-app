import type { RouterClient } from "@orpc/server";
import { os } from "./middleware/base";
import createEvent from "./procedures/events/create";
import deleteEvent from "./procedures/events/delete";
import getEvent from "./procedures/events/get";
import getAllEvents from "./procedures/events/get-all";
import getUnapprovedEvents from "./procedures/events/get-unapproved";
import approveEvent from "./procedures/events/set-approval";
import updateEvent from "./procedures/events/update";

export const router = os.router({
  events: {
    get: getEvent,
    getAll: getAllEvents,
    create: createEvent,
    update: updateEvent,
    delete: deleteEvent,
    getUnapproved: getUnapprovedEvents,
    setApproval: approveEvent,
  },
});

export type SEARouterClient = RouterClient<typeof router>;
