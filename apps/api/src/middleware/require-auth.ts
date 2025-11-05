import { auth } from "../auth";
import { base } from "./base";


const middleware = base.middleware(async ({ context, errors, next }) => {
  if (!context.reqHeaders) {
    throw errors.UNAUTHORIZED();
  }

  const session = await auth.api.getSession({
    headers: context.reqHeaders,
  });

  if (!session) {
    throw errors.UNAUTHORIZED();
  }

  return next({
    context: {
      session,
    },
  });
});

export const requireAuth = base.use(middleware);
