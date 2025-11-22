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
      <Button title="Refresh" onPress={() => refetch()} />
      {isLoading && <Text className="text-center mt-4">Loading...</Text>}
      {error && (
        <Text className="text-center text-red-500 mt-4">
          Error: {error.message}
        </Text>
      )}
      {data?.length === 0 && !isLoading && (
        <Text className="text-center mt-4">No events found.</Text>
      )}
    </View>
  );
}
