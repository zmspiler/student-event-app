import getEvent from "./procedures/events/get";
import getAllEvents from "./procedures/events/get-all";
import createEvent from "./procedures/events/create";
import updateEvent from "./procedures/events/update";
import deleteEvent from "./procedures/events/delete";

export const router = {
  events: {
    get: getEvent,
    getAll: getAllEvents,
    create: createEvent,
    update: updateEvent,
    delete: deleteEvent,
  },
};
