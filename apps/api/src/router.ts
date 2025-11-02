export const router = {
  events: {
    get: () => import("./procedures/events/get").then((m) => m.default),
    getAll: () => import("./procedures/events/get-all").then((m) => m.default),
    create: () => import("./procedures/events/create").then((m) => m.default),
    update: () => import("./procedures/events/update").then((m) => m.default),
    delete: () => import("./procedures/events/delete").then((m) => m.default),
  },
};
