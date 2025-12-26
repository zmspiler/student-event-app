import { useRouter } from "expo-router";
import { Text, View } from "react-native";
import { Button } from "@/components/button";
import { MenuButton } from "@/components/menu-button";
import { authClient } from "@/lib/auth-client";

export default function Settings() {
  const router = useRouter();
  const { data } = authClient.useSession();
  const { navigate } = useRouter();

  return (
    <View className="p-4 gap-2">
      {data ? (
        <View className="gap-4">
          <Button
            title="Log out"
            onPress={async () => {
              await authClient.signOut();
            }}
          />
          <View className="gap-3">
            <View>
              <Text className="text-xl font-bold mb-2">Manage</Text>
              <View className="border-b" />
            </View>
            <MenuButton
              text="View my events"
              onPress={() => navigate("/events/my-events")}
            />
            <MenuButton
              text="Create new event"
              onPress={() => navigate("/events/new")}
            />
          </View>
        </View>
      ) : (
        <View className="gap-2">
          <Button title="Login" onPress={() => router.navigate("/login")} />
          <Button
            title="Register"
            onPress={() => router.navigate("/register")}
          />
        </View>
      )}
    </View>
  );
}
