export const router = {
  events: {
    getAll: () => import("./procedures/events/get-all").then((m) => m.default),
  },
};
