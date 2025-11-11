import { Text } from "react-native";

export function PageTitle({ text }: { text: string }) {
  return <Text className="text-3xl font-bold text-green-600">{text}</Text>;
}
