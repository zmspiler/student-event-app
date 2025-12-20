import { useForm } from "@tanstack/react-form";
import { useRouter } from "expo-router";
import { TextInput, View } from "react-native";
import z from "zod";
import { Button } from "@/components/button";
import { authClient } from "@/lib/auth-client";

export default function Login() {
  const { Subscribe, Field, handleSubmit } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    validators: {
      onChange: z.object({
        email: z.email(),
        password: z.string().min(8),
      }),
    },
    onSubmit: async ({ value: { email, password } }) => {
      await authClient.signIn.email(
        {
          email,
          password,
        },
        {
          onSuccess: () => router.replace("/(tabs)/settings"),
          onError: (ctx) => {
            alert(ctx.error.message);
          },
        },
      );
    },
  });
  const router = useRouter();

  return (
    <View className="p-4 gap-2">
      <Field name="email">
        {(field) => (
          <TextInput
            placeholder="Email"
            className="border border-gray-400 rounded-xl px-4"
            value={field.state.value}
            onChangeText={field.handleChange}
          />
        )}
      </Field>

      <Field name="password">
        {(field) => (
          <TextInput
            placeholder="Password"
            className="border border-gray-400 rounded-xl px-4"
            value={field.state.value}
            onChangeText={field.handleChange}
            secureTextEntry
          />
        )}
      </Field>

      <Subscribe
        selector={(state) => [
          state.canSubmit,
          state.isSubmitting,
          state.isPristine,
        ]}
        children={([canSubmit, isSubmitting, isPristine]) => (
          <Button
            title="Login"
            disabled={!canSubmit || isSubmitting || isPristine}
            onPress={handleSubmit}
          />
        )}
      />
    </View>
  );
}
