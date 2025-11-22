import { Text, TouchableOpacity } from "react-native";

export function Button({ title, disabled, onPress }: Props) {
  return (
    <TouchableOpacity
      className={`p-3 bg-blue-400 rounded-xl${disabled ? " opacity-50" : ""}`}
      disabled={disabled}
      onPress={onPress}
    >
      <Text className={`mx-auto text-white${disabled ? " text-black" : ""}`}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}

type Props = {
  title: string;
  disabled?: boolean;
  onPress?: () => void | Promise<void>;
};
