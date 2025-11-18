import { useQuery } from "@tanstack/react-query";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { PageTitle } from "@/components/page-title";
import { SearchBox } from "@/components/search-box";
import { apiQueryClient } from "@/lib/api-client";

export default function Home() {
  const { error, data, isLoading } = useQuery(
    apiQueryClient.events.getAll.queryOptions(),
  );

  return (
    <SafeAreaView className="p-4">
      <View className="gap-2">
        <PageTitle text="Events" />
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
      </View>
    </SafeAreaView>
  );
}
