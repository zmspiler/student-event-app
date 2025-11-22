import { useQuery } from "@tanstack/react-query";
import { useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";
import { apiQueryClient } from "@/lib/api-client";

export default function Index() {
  const { eventId } = useLocalSearchParams();
  const { data, isLoading } = useQuery(
    apiQueryClient.events.get.queryOptions({
      input: {
        id: eventId as string,
      },
    }),
  );

  return (
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
  );
}
