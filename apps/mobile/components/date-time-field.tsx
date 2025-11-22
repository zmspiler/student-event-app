import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

export function DateTimeField({
  value = new Date(),
  placeholder = "Choose date",
  onChange,
  mode = "datetime",
  is24Hour,
}: Props) {
  const [date, setDate] = useState<Date | undefined>(undefined);

  const showPicker = () =>
    DateTimePickerAndroid.open({
      mode: "date",
      value,
      is24Hour,
      onChange: (event, newDate) => {
        if (event.type === "dismissed") return;

        setDate(newDate);

        if (onChange && newDate) {
          onChange(newDate);
        }
      },
    });

  return (
    <TouchableOpacity
      className="border border-gray-400 rounded-xl px-4 py-3"
      onPress={showPicker}
    >
      <Text className={date ? "text-black" : "text-gray-500"}>
        {date ? date.toDateString() : placeholder}
      </Text>
    </TouchableOpacity>
  );
}

type Props = {
  value?: Date;
  placeholder?: string;
  onChange?: (date: Date) => void | Promise<void>;
  mode?: "date" | "time" | "datetime" | "countdown";
  is24Hour?: boolean;
};
