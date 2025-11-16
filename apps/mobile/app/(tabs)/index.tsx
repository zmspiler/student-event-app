import { useQuery } from "@tanstack/react-query";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { PageTitle } from "@/components/page-title";
import { apiQueryClient } from "@/lib/api-client";

export default function Home() {
  const { error } = useQuery(apiQueryClient.events.getAll.queryOptions());

  return (
    <SafeAreaView className="p-4">
      <PageTitle text="Events" />
      {error && <Text>Error: {error.message}</Text>}
    </SafeAreaView>
  );
}
