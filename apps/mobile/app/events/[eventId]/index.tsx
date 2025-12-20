import { FontAwesome } from "@expo/vector-icons";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Image } from "expo-image";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Pressable, Text, View } from "react-native";
import { apiQueryClient } from "@/lib/api-client";
import { authClient } from "@/lib/auth-client";

export default function Index() {
  const { eventId } = useLocalSearchParams();
  const { navigate } = useRouter();
  const { data: session } = authClient.useSession();
  const { mutateAsync } = useMutation(
    apiQueryClient.events.delete.mutationOptions(),
  );
  const { data, isLoading } = useQuery(
    apiQueryClient.events.get.queryOptions({
      input: {
        id: eventId as string,
      },
    }),
  );

  return (
    <View>
      <View>
        {data?.imageUrl && (
          <Image
            source={{
              uri: `${process.env.EXPO_PUBLIC_API_URL}${data.imageUrl}`,
            }}
            contentFit={"cover"}
            style={{ width: "100%", height: 200 }}
          />
        )}
      </View>

      <View className="p-4 gap-2">
        {isLoading && <Text>Loading...</Text>}
        {data && (
          <View className="gap-2">
            <Text className="font-bold text-2xl">{data.title}</Text>
            <Text className="text-gray-600">
              {new Date(data.date).toDateString()} @ {data.location}
            </Text>
            <Text className="text-gray-800">{data.description}</Text>
          </View>
        )}
      </View>

      {data && data.ownerId === session?.user.id && (
        <View className="items-center">
          <Pressable
            onPress={async () => {
              if (eventId) {
                await mutateAsync({ id: data.id });
                navigate("/(tabs)");
              }
            }}
          >
            <FontAwesome name="close" size={18} />
          </Pressable>
        </View>
      )}
    </View>
  );
}
