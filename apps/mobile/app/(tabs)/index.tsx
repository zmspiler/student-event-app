import { useQuery } from "@tanstack/react-query";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { SearchBox } from "@/components/search-box";
import { apiQueryClient } from "@/lib/api-client";

export default function Home() {
  const { error, data, isLoading } = useQuery(
    apiQueryClient.events.getAll.queryOptions(),
  );

  return (
    <SafeAreaView className="px-4 gap-2">
      <SearchBox placeholder="Find events" />
      {isLoading && <Text className="text-center mt-4">Loading...</Text>}
      {error && (
        <Text className="text-center text-red-500 mt-4">
          Error: {error.message}
        </Text>
      )}
      {data?.length === 0 && !isLoading && (
        <Text className="text-center mt-4">No events found.</Text>
      )}
    </SafeAreaView>
  );
}
