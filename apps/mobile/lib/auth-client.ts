import { expoClient } from "@better-auth/expo/client";
import { admin } from "better-auth/plugins";
import { createAuthClient } from "better-auth/react";
import * as SecureStore from "expo-secure-store";
import { API_URL } from "./environment";

export const authClient = createAuthClient({
  baseURL: API_URL,
  basePath: "/auth",
  plugins: [
    admin(),
    expoClient({
      scheme: "student-event-app",
      storagePrefix: "student-event-app",
      storage: SecureStore,
    }),
  ],
});
