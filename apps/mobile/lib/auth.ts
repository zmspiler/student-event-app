import { expoClient } from "@better-auth/expo/client";
import { createAuthClient } from "better-auth/react";
import * as SecureStore from "expo-secure-store";

export const authClient = createAuthClient({
  baseUrl: process.env.EXPO_PUBLIC_API_URL,
  basePath: "/auth",
  plugins: [
    expoClient({
      scheme: "student-event-app",
      storagePrefix: "student-event-app",
      storage: SecureStore,
    }),
  ],
});
