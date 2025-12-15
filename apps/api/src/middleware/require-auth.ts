import { ORPCError } from "@orpc/contract";
import { auth } from "@/utils/auth";
import { base } from "./base";

const middleware = base.middleware(async ({ context, errors, next }) => {
  if (!context.reqHeaders) {
    throw new ORPCError("UNAUTHORIZED");
  }

  const session = await auth.api.getSession({
    headers: context.reqHeaders,
  });

  if (!session) {
    throw new ORPCError("UNAUTHORIZED");
  }

  return next({
    context: {
      session,
    },
  });
});

export const requireAuth = base.use(middleware);
