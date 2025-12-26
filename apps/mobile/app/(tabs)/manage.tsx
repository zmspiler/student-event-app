import { useRouter } from "expo-router";
import { View } from "react-native";
import { MenuButton } from "@/components/menu-button";

export default function Manage() {
  const { navigate } = useRouter();

  return (
    <View className="p-4 gap-3">
      <MenuButton
        text="View unapproved events"
        onPress={() => navigate("/events/unapproved")}
      />
    </View>
  );
}
