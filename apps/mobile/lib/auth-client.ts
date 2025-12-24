import { expoClient } from "@better-auth/expo/client";
import { createAuthClient } from "better-auth/react";
import * as SecureStore from "expo-secure-store";
import { API_URL } from "./environment";

export const authClient = createAuthClient({
  baseURL: API_URL,
  basePath: "/auth",
  plugins: [
    expoClient({
      scheme: "student-event-app",
      storagePrefix: "student-event-app",
      storage: SecureStore,
    }),
  ],
});
