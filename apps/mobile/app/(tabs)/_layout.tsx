import { FontAwesome } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { authClient } from "@/lib/auth-client";

export default function Layout() {
  const { data } = authClient.useSession();

  return (
    <Tabs>
      <Tabs.Screen
        name="saved"
        options={{
          href: "/saved",
          title: "Saved Events",
          tabBarIcon: () => (
            <FontAwesome name="bookmark" size={24} color="black" />
          ),
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          title: "Find",
          tabBarIcon: () => (
            <FontAwesome name="search" size={24} color="black" />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarIcon: () => <FontAwesome name="cog" size={24} color="black" />,
        }}
      />
    </Tabs>
  );
}
