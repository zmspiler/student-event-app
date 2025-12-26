import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { FlatList, Text, View } from "react-native";
import { EventCard } from "@/components/event-card";
import { apiQueryClient } from "@/lib/api-client";
import { getSavedEvents } from "@/lib/utils/saved-events";

export default function Saved() {
  const { data } = useQuery(
    apiQueryClient.events.getAll.queryOptions({ input: {} }),
  );
  const [savedEvents, setSavedEvents] = useState<string[]>([]);

  useEffect(() => {
    getSavedEvents().then((events) => {
      setSavedEvents(events);
    });
  }, []);

  return (
    <View className="p-4">
      {savedEvents.length > 0 && data && (
        <FlatList
          data={data.filter((event) => savedEvents.includes(event.id))}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <EventCard event={item} />}
        />
      )}
      {savedEvents.length === 0 && (
        <Text className="text-center">You have no saved events.</Text>
      )}
    </View>
  );
}
