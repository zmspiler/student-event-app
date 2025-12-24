import { useForm } from "@tanstack/react-form";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { View } from "react-native";
import z from "zod";
import { Button } from "@/components/button";
import { DateTimeField } from "@/components/date-field";
import ImageField from "@/components/image-field";
import { TextField } from "@/components/text-field";
import { TimeField } from "@/components/time-field";
import { apiQueryClient } from "@/lib/api-client";

export default function NewEvent() {
  const { navigate } = useRouter();
  const { mutateAsync } = useMutation(
    apiQueryClient.events.create.mutationOptions(),
  );
  const { Field, Subscribe, handleSubmit, reset } = useForm({
    defaultValues,
    validators: {
      onChange: EventSchema,
    },
    onSubmit: async ({ value }) => {
      const dateTime = new Date(
        value.date.getFullYear(),
        value.date.getMonth(),
        value.date.getDate(),
        value.time.getHours(),
        value.time.getMinutes(),
      );

      await mutateAsync({
        title: value.title,
        description: value.description ?? "",
        location: value.location,
        date: dateTime,
        imageBase64: value.image,
        url: value.url,
      });
      reset();
      navigate("/(tabs)");
    },
  });

  return (
    <View className="p-4 gap-2">
      <Field name="title">
        {(field) => (
          <TextField
            placeholder="Title"
            value={field.state.value}
            onChangeText={field.handleChange}
          />
        )}
      </Field>
      <Field name="location">
        {(field) => (
          <TextField
            placeholder="Location"
            value={field.state.value}
            onChangeText={field.handleChange}
          />
        )}
      </Field>
      <Field name="image">
        {(field) => <ImageField onChange={field.handleChange} />}
      </Field>
      <Field name="date">
        {(field) => (
          <DateTimeField
            minimumDate={new Date()}
            value={field.state.value}
            onChange={field.handleChange}
          />
        )}
      </Field>
      <Field name="time">
        {(field) => (
          <TimeField
            minimumDate={new Date(Date.now() + 60 * 60 * 1000)}
            value={field.state.value}
            onChange={field.handleChange}
          />
        )}
      </Field>
      <Field name="url">
        {(field) => (
          <TextField
            placeholder="URL"
            value={field.state.value}
            onChangeText={field.handleChange}
          />
        )}
      </Field>
      <Field name="description">
        {(field) => (
          <TextField
            placeholder="Description"
            multiline={true}
            style={{
              height: 200,
              textAlignVertical: "top",
            }}
            value={field.state.value ?? ""}
            onChangeText={field.handleChange}
          />
        )}
      </Field>

      <Subscribe
        selector={(state) => [
          state.canSubmit,
          state.isSubmitting,
          state.isPristine,
        ]}
        children={([canSubmit, isSubmitting, isPristine]) => (
          <Button
            title="Create event"
            disabled={!canSubmit || isSubmitting || isPristine}
            onPress={handleSubmit}
          />
        )}
      />
    </View>
  );
}

const EventSchema = z.object({
  title: z.string().min(1, "Event name is required"),
  description: z.string().nullable(),
  location: z.string().min(1, "Location is required"),
  date: z.date().min(new Date(), "Date must be at least 1 hour from now"),
  time: z.date().min(new Date(), "Time must be at least 1 hour from now"),
  image: z.base64().optional(),
  url: z.url().optional(),
});

type EventInput = z.infer<typeof EventSchema>;

const defaultValues: EventInput = {
  title: "",
  description: null,
  date: undefined!,
  location: "",
  time: undefined!,
};
