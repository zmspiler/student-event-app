import { useRouter } from "expo-router";
import { Button, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { authClient } from "@/lib/auth-client";

export default function Settings() {
  const router = useRouter();
  const { data } = authClient.useSession();

  return (
    <SafeAreaView className="px-4 gap-2">
      {data ? (
        <View className="gap-2">
          <Text className="text-4xl">Hi {data.user.name.split(" ")[0]}!</Text>
          <Button
            title="Logout"
            onPress={async () => {
              await authClient.signOut();
            }}
          />
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
    </SafeAreaView>
  );
}
