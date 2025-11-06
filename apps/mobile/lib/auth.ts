import { expoClient } from "@better-auth/expo/client";
import { createAuthClient } from "better-auth/react";
import * as SecureStore from "expo-secure-store";

export const authClient = createAuthClient({
  baseUrl: "http://10.0.2.2:3000",
  basePath: "/auth",
  plugins: [
    expoClient({
      scheme: "student-event-app",
      storagePrefix: "student-event-app",
      storage: SecureStore,
    }),
  ],
});
