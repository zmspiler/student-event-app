import { useQuery } from "@tanstack/react-query";
import { Link, useRouter } from "expo-router";
import { Pressable, Text, View } from "react-native";
import { Button } from "@/components/button";
import { SearchBox } from "@/components/search-box";
import { apiQueryClient } from "@/lib/api-client";

export default function Home() {
  const { navigate } = useRouter();
  const { error, data, isLoading, refetch } = useQuery(
    apiQueryClient.events.getAll.queryOptions(),
  );

  return (
    <View className="p-4 gap-4">
      <View>
        <SearchBox className="mb-2" placeholder="Find events" />
        <Button
          title="Refresh"
          disabled={isLoading}
          onPress={async () => {
            await refetch();
          }}
        />
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
