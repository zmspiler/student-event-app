import { OpenAPIHandler } from "@orpc/openapi/fetch";
import { OpenAPIReferencePlugin } from "@orpc/openapi/plugins";
import { onError } from "@orpc/server";
import {
  RequestHeadersPlugin,
  ResponseHeadersPlugin,
} from "@orpc/server/plugins";
import { ZodSmartCoercionPlugin } from "@orpc/zod";
import { ZodToJsonSchemaConverter } from "@orpc/zod/zod4";
import { router } from "./router";

export const handler = new OpenAPIHandler(router, {
  plugins: [
    new RequestHeadersPlugin(),
    new ResponseHeadersPlugin(),
    new ZodSmartCoercionPlugin(),
    new OpenAPIReferencePlugin({
      docsProvider: "scalar",
      docsPath: "/spec",
      specPath: "/spec.json",
      schemaConverters: [new ZodToJsonSchemaConverter()],
      specGenerateOptions: {
        info: {
          title: "Student Event App API",
          version: "1.0.0",
        },
      },
    }),
  ],
  interceptors: [onError((error) => console.log(error))],
});
