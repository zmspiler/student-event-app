import { FontAwesome } from "@expo/vector-icons";
import { useQuery } from "@tanstack/react-query";
import { useFocusEffect } from "expo-router";
import { useState } from "react";
import { FlatList, Pressable, Text, View } from "react-native";
import { useDebounce } from "use-debounce";
import { EventCard } from "@/components/event-card";
import { SearchBox } from "@/components/search-box";
import { apiQueryClient } from "@/lib/api-client";

export default function Home() {
  const [find, setFind] = useState("");
  const [debouncedFind] = useDebounce(find, 250);
  const { error, data, isLoading, refetch } = useQuery(
    apiQueryClient.events.getAll.queryOptions({
      input: { find: debouncedFind },
    }),
  );

  useFocusEffect(() => {
    refetch();
  });

  return (
    <View className="p-4 gap-4">
      <View className="flex-row items-center gap-2">
        <SearchBox
          className="flex-1"
          placeholder="Find events"
          onChangeText={setFind}
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
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <EventCard event={item} />}
      />
    </View>
  );
}
