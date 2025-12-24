import { useForm } from "@tanstack/react-form";
import { View } from "react-native";
import z from "zod";
import { Button } from "@/components/button";
import { DateTimeField } from "@/components/date-field";
import ImageField from "@/components/image-field";
import { TextField } from "@/components/text-field";
import { TimeField } from "@/components/time-field";

export function EventForm({ value, onSubmit, mode = "create" }: Props) {
  const { Field, Subscribe, handleSubmit } = useForm({
    defaultValues: value ?? defaultValues,
    validators: {
      onChange: EventSchema,
    },
    onSubmit: onSubmit ? ({ value }) => onSubmit(value) : undefined,
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
            title={`${mode.toUpperCase()} EVENT`}
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

type Props = {
  value?: EventInput;
  onSubmit?: (value: EventInput) => void;
  mode?: "create" | "edit";
};
