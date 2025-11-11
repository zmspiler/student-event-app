import { createORPCClient, onError } from "@orpc/client";
import { OpenAPILink } from "@orpc/openapi-client/fetch";
import { createTanstackQueryUtils } from "@orpc/tanstack-query";
import { router, type SEARouterClient } from "../../api/src/router";

const link = new OpenAPILink(router, {
  url: "http://10.0.2.2:3000/rpc",
  async fetch(request, init) {
    const { fetch } = await import("expo/fetch");

    const resp = await fetch(request.url, {
      body: await request.blob(),
      headers: {
        credentials: "include",
        ...request.headers,
      },
      method: request.method,
      signal: request.signal,
      ...init,
    });

    return resp;
  },
  interceptors: [onError((error) => console.error(error))],
});

export const apiClient: SEARouterClient = createORPCClient(link);
export const apiQueryClient = createTanstackQueryUtils(apiClient);
