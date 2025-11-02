import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "sqlite",
  }),
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 8,
  },
  baseURL: process.env.AUTH_URL || "http://localhost:3000",
  secret: process.env.AUTH_SECRET,
  basePath: "/auth",
  trustedOrigins: ["http://localhost:3080"],
});
