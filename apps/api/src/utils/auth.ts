import { expo } from "@better-auth/expo";
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { admin, openAPI } from "better-auth/plugins";
import { AUTH_SECRET, AUTH_URL } from "./environment";
import { prisma } from "./prisma";

export const auth = betterAuth({
  plugins: [
    admin(),
    openAPI({
      path: "/spec",
    }),
    expo(),
  ],
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 8,
  },
  baseURL: AUTH_URL,
  secret: AUTH_SECRET,
  basePath: "/auth",
  trustedOrigins: ["http://localhost:3080", "asd://", "exp://"],
});
