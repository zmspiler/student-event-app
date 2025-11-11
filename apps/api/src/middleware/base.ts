import { implement } from "@orpc/server";
import type {
  RequestHeadersPluginContext,
  ResponseHeadersPluginContext,
} from "@orpc/server/plugins";
import { contract } from "../contract";

interface ORPCContext
  extends RequestHeadersPluginContext,
    ResponseHeadersPluginContext {}

export const os = implement(contract);
export const base = os.$context<ORPCContext>();
