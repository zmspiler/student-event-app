import { useMutation } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { EventForm } from "@/forms/event-form";
import { apiQueryClient } from "@/lib/api-client";
import { mergeDateAndTime } from "@/lib/utils/date-time";

export default function NewEvent() {
  const { navigate } = useRouter();
  const { mutateAsync } = useMutation(
    apiQueryClient.events.create.mutationOptions(),
  );

  return (
    <EventForm
      onSubmit={async ({ description, date, time, ...value }) => {
        await mutateAsync({
          description: description ?? "",
          date: mergeDateAndTime(date, time),
          ...value,
        });
        navigate("/(tabs)");
      }}
    />
  );
}
