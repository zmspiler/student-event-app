import { FontAwesome } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { authClient } from "@/lib/auth-client";

export default function Layout() {
  const { data, error } = authClient.useSession();

  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: () => <FontAwesome name="home" size={24} color="black" />,
        }}
      />
      <Tabs.Screen
        name="new"
        options={{
          href: data && !error ? "/new" : null,
          title: "New Event",
          tabBarIcon: () => <FontAwesome name="plus" size={24} color="black" />,
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
