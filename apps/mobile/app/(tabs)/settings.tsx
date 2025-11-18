import { useRouter } from "expo-router";
import { Button } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Settings() {
  const router = useRouter();

  return (
    <SafeAreaView className="px-4 gap-2">
      <Button title="Login" onPress={() => router.navigate("/login")} />
    </SafeAreaView>
  );
}
