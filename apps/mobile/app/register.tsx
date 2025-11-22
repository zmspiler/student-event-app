import { router, useRouter } from "expo-router";
import { useState } from "react";
import { Button, TextInput, View } from "react-native";
import { authClient } from "@/lib/auth-client";

export default function Register() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <View className="p-4 gap-2">
      <TextInput
        value={name}
        onChangeText={setName}
        placeholder="Name"
        className="border border-gray-400 rounded-xl px-4"
      />
      <TextInput
        value={email}
        onChangeText={setEmail}
        placeholder="Email"
        className="border border-gray-400 rounded-xl px-4"
      />
      <TextInput
        value={password}
        onChangeText={setPassword}
        placeholder="Password"
        className="border border-gray-400 rounded-xl px-4"
        secureTextEntry
      />
      <Button
        title="Register"
        onPress={async () => {
          await authClient.signUp.email(
            {
              name,
              email,
              password,
            },
            {
              onError: (ctx) => {
                console.log(ctx);
              },
              onSuccess: () => {
                router.replace("/(tabs)");
              },
            },
          );
        }}
      />
    </View>
  );
}
