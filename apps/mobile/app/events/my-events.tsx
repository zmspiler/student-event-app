import { useQuery } from "@tanstack/react-query";
import { Stack, useRouter } from "expo-router";
import { FlatList, View } from "react-native";
import { EventCard } from "@/components/event-card";
import { apiQueryClient } from "@/lib/api-client";
import { authClient } from "@/lib/auth-client";

export default function MyEvents() {
  const auth = authClient.useSession();
  const { data } = useQuery(
    apiQueryClient.events.getAll.queryOptions({
      input: { ownerId: auth.data?.user.id || "" },
    }),
  );
  const { back } = useRouter();

  if (!auth.data?.session) back();

  return (
    <>
      <Stack.Screen options={{ headerTitle: "My Events" }} />
      <View className="p-4">
        <FlatList
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <EventCard event={item} />}
        />
      </View>
    </>
  );
}
