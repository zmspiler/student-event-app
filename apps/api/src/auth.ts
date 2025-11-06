import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { openAPI } from "better-auth/plugins";
import { prisma } from "./prisma";
import { AUTH_SECRET, AUTH_URL } from "./environment";

export const auth = betterAuth({
  plugins: [
    openAPI({
      path: "/spec",
    }),
  ],
  database: prismaAdapter(prisma, {
    provider: "sqlite",
  }),
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 8,
  },
  baseURL: AUTH_URL,
  secret: AUTH_SECRET,
  basePath: "/auth",
  trustedOrigins: ["http://localhost:3080"],
});
