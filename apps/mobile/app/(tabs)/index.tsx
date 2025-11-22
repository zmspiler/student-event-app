import { useQuery } from "@tanstack/react-query";
import { Text, View } from "react-native";
import { Button } from "@/components/button";
import { SearchBox } from "@/components/search-box";
import { apiQueryClient } from "@/lib/api-client";

export default function Home() {
  const { error, data, isLoading, refetch } = useQuery(
    apiQueryClient.events.getAll.queryOptions(),
  );

  return (
    <View className="p-4 gap-2">
      <SearchBox placeholder="Find events" />
      <Button
        title="Refresh"
        disabled={isLoading}
        onPress={async () => {
          await refetch();
        }}
      />
      {isLoading && <Text className="text-center mt-4">Loading...</Text>}
      {error && (
        <Text className="text-center text-red-500 mt-4">
          Error: {error.message}
        </Text>
      )}
      {data && data?.length > 0 ? (
        data.map((event) => (
          <View
            key={event.id}
            className="border border-gray-400 rounded-xl px-4 py-3"
          >
            <Text className="font-bold text-lg">{event.title}</Text>
            <Text className="text-gray-600">{event.location}</Text>
            <Text className="text-gray-600">
              {new Date(event.date).toDateString()}
            </Text>
            {event.description && (
              <Text className="mt-2 text-gray-800">{event.description}</Text>
            )}
          </View>
        ))
      ) : (
        <Text className="text-center mt-4">No events found.</Text>
      )}
    </View>
  );
}
