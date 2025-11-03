import { os } from "@orpc/server";
import type {
  RequestHeadersPluginContext,
  ResponseHeadersPluginContext,
} from "@orpc/server/plugins";
import { auth } from "../auth";

interface ORPCContext
  extends RequestHeadersPluginContext,
    ResponseHeadersPluginContext {}

const base = os.$context<ORPCContext>().errors({
  UNAUTHORIZED: {
    message: "Authentication required to access this resource.",
    status: 401,
  },
  NOT_FOUND: {
    message: "Entity not found.",
    status: 404,
  },
});

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
