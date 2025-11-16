import { SafeAreaView } from "react-native-safe-area-context";
import "../global.css";
import {
  focusManager,
  onlineManager,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import * as Network from "expo-network";
import { Stack } from "expo-router";
import { useEffect } from "react";
import { AppState, type AppStateStatus, Platform } from "react-native";

const queryClient = new QueryClient();

export default function Layout() {
  onlineManager.setEventListener((setOnline) => {
    const eventSubscription = Network.addNetworkStateListener((state) => {
      setOnline(!!state.isConnected);
    });
    return eventSubscription.remove;
  });

  function onAppStateChange(status: AppStateStatus) {
    if (Platform.OS !== "web") {
      focusManager.setFocused(status === "active");
    }
  }

  // biome-ignore lint/correctness/useExhaustiveDependencies: We add a subscription only once
  useEffect(() => {
    const subscription = AppState.addEventListener("change", onAppStateChange);

    return () => subscription.remove();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: {
            backgroundColor: "transparent",
          },
        }}
      >
        <Stack.Screen name="(tabs)" />
      </Stack>
    </QueryClientProvider>
  );
}
