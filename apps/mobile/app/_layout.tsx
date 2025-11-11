import { SafeAreaView } from "react-native-safe-area-context";
import "../global.css";
import { Stack } from "expo-router";

export default function Layout() {
  return (
    <SafeAreaView className="flex-1 p-4 bg-white">
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: {
            backgroundColor: "transparent",
          },
        }}
      />
    </SafeAreaView>
  );
}
