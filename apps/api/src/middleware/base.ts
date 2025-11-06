import { os } from "@orpc/server";
import type {
  RequestHeadersPluginContext,
  ResponseHeadersPluginContext,
} from "@orpc/server/plugins";

interface ORPCContext
  extends RequestHeadersPluginContext,
    ResponseHeadersPluginContext {}

export const base = os.$context<ORPCContext>().errors({
  UNAUTHORIZED: {
    message: "Authentication required to access this resource.",
    status: 401,
  },
  NOT_FOUND: {
    message: "Entity not found.",
    status: 404,
  },
});
