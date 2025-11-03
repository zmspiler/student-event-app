import { onError } from "@orpc/server";
import { router } from "./router";
import { OpenAPIHandler } from "@orpc/openapi/fastify";
import { ZodSmartCoercionPlugin } from "@orpc/zod";
import { OpenAPIReferencePlugin } from "@orpc/openapi/plugins";
import { ZodToJsonSchemaConverter } from "@orpc/zod/zod4";
import { RequestHeadersPlugin, ResponseHeadersPlugin } from "@orpc/server/plugins";

export const handler = new OpenAPIHandler(router, {
  plugins: [
    new RequestHeadersPlugin(),
    new ResponseHeadersPlugin(),
    new ZodSmartCoercionPlugin(),
    new OpenAPIReferencePlugin({
      docsProvider: 'scalar',
      docsPath: '/docs',
      schemaConverters: [
        new ZodToJsonSchemaConverter(),
      ],
      specGenerateOptions: {
        info: {
          title: 'Student Event App API',
          version: '1.0.0',
        },
      },
    }),
  ],
  interceptors: [onError((error) => console.log("Error", (error as () => ({ message: string }))().message))],
});
