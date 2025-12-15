import { FontAwesome } from "@expo/vector-icons";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Pressable, Text, View } from "react-native";
import { SearchBox } from "@/components/search-box";
import { apiQueryClient } from "@/lib/api-client";

export default function Home() {
  const { navigate } = useRouter();
  const [find, setFind] = useState("");
  const { error, data, isLoading, refetch } = useQuery(
    apiQueryClient.events.getAll.queryOptions({ input: { find } }),
  );

  return (
    <View className="p-4 gap-4">
      <View className="flex-row items-center gap-2">
        <SearchBox
          className="flex-1"
          placeholder="Find events"
          onChangeText={async (value) => {
            setFind(value);
          }}
        />
        <Pressable
          className="p-3 bg-blue-400 rounded-xl"
          onPress={async () => refetch()}
        >
          <FontAwesome name="refresh" size={18} color={"white"} />
        </Pressable>
      </View>

      {isLoading && <Text className="text-center mt-4">Loading...</Text>}
      {error && (
        <Text className="text-center text-red-500 mt-4">
          Error: {error.message}
        </Text>
      )}
      {data && data?.length > 0 ? (
        data.map((event) => (
          <Pressable
            className="border border-gray-400 rounded-xl px-4 py-3"
            key={event.id}
            onPress={() =>
              navigate({
                pathname: "/events/[eventId]",
                params: { eventId: event.id },
              })
            }
          >
            <Text className="font-bold text-lg">{event.title}</Text>
            <Text className="text-gray-600">{event.location}</Text>
            <Text className="text-gray-600">
              {new Date(event.date).toDateString()}
            </Text>
            {event.description && (
              <Text className="mt-2 text-gray-800">{event.description}</Text>
            )}
          </Pressable>
        ))
      ) : (
        <Text className="text-center mt-4">No events found.</Text>
      )}
    </View>
  );
}
