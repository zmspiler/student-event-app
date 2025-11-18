import { Button, TextInput, View } from "react-native";

export default function Login() {
  return (
    <View className="p-4 gap-2">
      <TextInput
        placeholder="Email"
        className="border border-gray-400 rounded-xl px-4"
      />
      <TextInput
        placeholder="Password"
        className="border border-gray-400 rounded-xl px-4"
        secureTextEntry
      />
      <Button title="Login" onPress={() => {}} />
    </View>
  );
}
