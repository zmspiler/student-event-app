import { useMutation, useQuery } from "@tanstack/react-query";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { Text } from "react-native";
import { EventForm } from "@/forms/event-form";
import { apiQueryClient } from "@/lib/api-client";
import { mergeDateAndTime } from "@/lib/utils/date-time";

export default function EditEvent() {
  const { eventId } = useLocalSearchParams();
  const { back } = useRouter();
  const { data } = useQuery(
    apiQueryClient.events.get.queryOptions({
      input: {
        id: eventId as string,
      },
    }),
  );
  const { mutateAsync } = useMutation(
    apiQueryClient.events.update.mutationOptions(),
  );

  return (
    <>
      <Stack.Screen options={{ headerTitle: "Edit Event" }} />
      {data ? (
        <EventForm
          mode="edit"
          value={{
            title: data.title,
            description: data.description,
            date: new Date(data.date),
            time: new Date(data.date),
            location: data.location,
            url: data.url || undefined,
          }}
          onSubmit={async ({ description, date, time, image, ...value }) => {
            await mutateAsync({
              id: eventId as string,
              description: description ?? "",
              imageBase64: image,
              date: mergeDateAndTime(date, time),
              ...value,
            });
            back();
          }}
        />
      ) : (
        <Text>Loading...</Text>
      )}
    </>
  );
}
