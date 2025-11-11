import { createORPCClient, onError } from "@orpc/client";
import type { ContractRouterClient } from "@orpc/contract";
import type { JsonifiedClient } from "@orpc/openapi-client";
import { OpenAPILink } from "@orpc/openapi-client/fetch";
import { createTanstackQueryUtils } from "@orpc/tanstack-query";
import { fetch } from "expo/fetch";
import { contract } from "../../api/src/contract";

const link = new OpenAPILink(contract, {
  url: "http://10.0.2.2:3000/rpc",
  async fetch(request, init) {
    const resp = await fetch(request.url, {
      body: request.method === "GET" ? undefined : await request.blob(),
      headers: request.headers,
      method: request.method,
      signal: request.signal,
      ...init,
    });

    return resp;
  },
  interceptors: [onError((error) => console.error(error))],
});

export const apiClient: JsonifiedClient<ContractRouterClient<typeof contract>> =
  createORPCClient(link);
export const apiQueryClient = createTanstackQueryUtils(apiClient);
