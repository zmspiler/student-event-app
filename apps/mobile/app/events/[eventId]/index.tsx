import { FontAwesome } from "@expo/vector-icons";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Image } from "expo-image";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Linking, Pressable, Text, View } from "react-native";
import { Button } from "@/components/button";
import { apiQueryClient } from "@/lib/api-client";
import { authClient } from "@/lib/auth-client";
import { API_URL } from "@/lib/environment";
import { isEventSaved, saveEvent, unsaveEvent } from "@/lib/utils/saved-events";

export default function Index() {
  const { eventId } = useLocalSearchParams();
  const { navigate } = useRouter();
  const { data: session } = authClient.useSession();
  const { mutateAsync } = useMutation(
    apiQueryClient.events.delete.mutationOptions(),
  );
  const { data, isLoading } = useQuery(
    apiQueryClient.events.get.queryOptions({
      input: {
        id: eventId as string,
      },
    }),
  );
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    if (eventId && typeof eventId === "string") {
      isEventSaved(eventId).then((saved) => {
        setIsSaved(saved);
      });
    }
  }, [eventId]);

  return (
    <>
      <Stack.Screen options={{ headerTitle: data?.title || "Event" }} />
      <View className="h-full">
        <View>
          {data?.imageUrl && (
            <Image
              source={{
                uri: `${API_URL}${data.imageUrl}`,
              }}
              contentFit={"cover"}
              style={{ width: "100%", height: 200 }}
            />
          )}
        </View>

        <View className="p-4 gap-2">
          {isLoading && <Text>Loading...</Text>}
          {data && (
            <View className="gap-2">
              <Text className="font-bold text-2xl">{data.title}</Text>
              <Text className="text-gray-600">
                {new Date(data.date).toDateString()} @ {data.location}
              </Text>
              <Text className="text-gray-800">{data.description}</Text>
            </View>
          )}
        </View>

        <View className="absolute bottom-10 left-0 right-0 items-center pb-4">
          <View className="flex-row items-center gap-4">
            {data?.url && (
              <View className="flex-row gap-2">
                <Button
                  title="Visit event page"
                  className="shadow-md rounded-xl px-8 py-4 text-lg text-white bg-blue-500"
                  textClassName="font-bold"
                  onPress={() => {
                    if (data.url) {
                      Linking.openURL(data.url);
                    }
                  }}
                />
                <Pressable
                  className="bg-blue-500 p-4 rounded-xl aspect-square h-full items-center justify-center"
                  onPress={async () => {
                    if (isSaved) {
                      await unsaveEvent(data.id);
                      setIsSaved(false);
                    } else {
                      await saveEvent(data.id);
                      setIsSaved(true);
                    }
                  }}
                >
                  <FontAwesome
                    name={isSaved ? "bookmark" : "bookmark-o"}
                    size={18}
                    color={"white"}
                  />
                </Pressable>
              </View>
            )}
            {data && data.ownerId === session?.user.id && (
              <View className="flex-row gap-2">
                <Pressable
                  className="bg-gray-400 p-4 rounded-xl aspect-square h-full items-center justify-center"
                  onPress={() =>
                    navigate({
                      pathname: "/events/[eventId]/edit",
                      params: { eventId: data.id },
                    })
                  }
                >
                  <FontAwesome name="pencil" size={18} color={"white"} />
                </Pressable>
                <Pressable
                  className="bg-gray-400 p-4 rounded-xl aspect-square h-full items-center justify-center"
                  onPress={async () => {
                    if (eventId) {
                      await mutateAsync({ id: data.id });
                      navigate("/(tabs)");
                    }
                  }}
                >
                  <FontAwesome name="close" size={18} color={"white"} />
                </Pressable>
              </View>
            )}
          </View>
        </View>
      </View>
    </>
  );
}
