import { FontAwesome } from "@expo/vector-icons";
import { useQuery } from "@tanstack/react-query";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { FlatList, Pressable, Text, View } from "react-native";
import { useDebounce } from "use-debounce";
import { SearchBox } from "@/components/search-box";
import { apiQueryClient } from "@/lib/api-client";

export default function Home() {
  const { navigate } = useRouter();
  const [find, setFind] = useState("");
  const [debouncedFind] = useDebounce(find, 250);
  const { error, data, isLoading, refetch } = useQuery(
    apiQueryClient.events.getAll.queryOptions({
      input: { find: debouncedFind },
    }),
  );

  // Debounce refetch when 'find' changes
  // Only refetch 200ms after the user stops typing
  useEffect(() => {
    const handler = setTimeout(() => {
      refetch();
    }, 200);
    return () => clearTimeout(handler);
  }, [refetch]);

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
        renderItem={({ item }) => (
          <Pressable
            className="border border-gray-400 rounded-xl mb-4 overflow-hidden"
            onPress={() =>
              navigate({
                pathname: "/events/[eventId]",
                params: { eventId: item.id },
              })
            }
          >
            {item.imageUrl && (
              <Image
                source={{
                  uri: `${process.env.EXPO_PUBLIC_API_URL}${item.imageUrl}`,
                }}
                style={{ width: "100%", height: 150 }}
              />
            )}
            <View className="px-4 py-3">
              <Text className="font-bold text-lg">{item.title}</Text>
              <Text className="text-gray-600">{item.location}</Text>
              <Text className="text-gray-600">
                {new Date(item.date).toDateString()}
              </Text>
              {item.description && (
                <Text className="mt-2 text-gray-800">{item.description}</Text>
              )}
            </View>
          </Pressable>
        )}
      />
    </View>
  );
}
