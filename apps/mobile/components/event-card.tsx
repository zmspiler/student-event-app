import { Image } from "expo-image";
import { navigate } from "expo-router/build/global-state/routing";
import { Pressable, Text, View } from "react-native";
import { API_URL } from "@/lib/environment";

export function EventCard({ event }: Props) {
  return (
    <Pressable
      className="border border-gray-400 rounded-xl mb-4 overflow-hidden"
      onPress={() =>
        navigate({
          pathname: "/events/[eventId]",
          params: { eventId: event.id },
        })
      }
    >
      {event.imageUrl && (
        <Image
          source={{
            uri: `${API_URL}${event.imageUrl}`,
          }}
          style={{ width: "100%", height: 150 }}
        />
      )}
      <View className="px-4 py-3">
        <Text className="font-bold text-lg">{event.title}</Text>
        <Text className="text-gray-600">{event.location}</Text>
        <Text className="text-gray-600">
          {new Date(event.date).toDateString()}
        </Text>
      </View>
    </Pressable>
  );
}

type Props = {
  event: {
    id: string;
    title: string;
    location: string;
    date: string;
    imageUrl?: string | null;
  };
};
