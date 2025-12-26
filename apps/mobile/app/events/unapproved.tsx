import { useQuery } from "@tanstack/react-query";
import { Stack } from "expo-router";
import { FlatList, Text, View } from "react-native";
import { EventCard } from "@/components/event-card";
import { apiQueryClient } from "@/lib/api-client";

export default function UnapprovedEvents() {
  const { data } = useQuery(apiQueryClient.events.getUnapproved.queryOptions());

  return (
    <>
      <Stack.Screen options={{ title: "Approve events" }} />
      <View className="p-4">
        {data && data.length > 0 ? (
          <FlatList
            data={data}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <EventCard event={item} />}
          />
        ) : (
          <Text className="text-center">No events to approve.</Text>
        )}
      </View>
    </>
  );
}
