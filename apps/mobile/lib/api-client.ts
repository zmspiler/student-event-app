import { createORPCClient, ORPCError, onError } from "@orpc/client";
import { type ContractRouterClient, ValidationError } from "@orpc/contract";
import type { JsonifiedClient } from "@orpc/openapi-client";
import { OpenAPILink } from "@orpc/openapi-client/fetch";
import { createTanstackQueryUtils } from "@orpc/tanstack-query";
import { fetch } from "expo/fetch";
import z from "zod";
import { contract } from "../../api/src/contract";
import { authClient } from "./auth-client";

const link = new OpenAPILink(contract, {
  url: `${process.env.EXPO_PUBLIC_API_URL}/rpc`,
  async fetch(request, init) {
    const cookies = authClient.getCookie();
    const headers = request.headers;
    headers.set("credentials", "omit");
    headers.set("Cookie", cookies);

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
