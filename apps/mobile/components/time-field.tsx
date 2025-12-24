import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import { useState } from "react";
import { Text, TouchableOpacity } from "react-native";

export function TimeField({
  value = new Date(),
  placeholder = "Time",
  onChange,
  is24Hour,
  minimumDate,
  maximumDate,
}: Props) {
  const [time, setTime] = useState<Date | undefined>(undefined);

  const showPicker = () =>
    DateTimePickerAndroid.open({
      mode: "time",
      minimumDate,
      maximumDate,
      value,
      is24Hour,
      onChange: (event, newTime) => {
        if (event.type === "dismissed") return;

        setTime(newTime);

        if (onChange && newTime) {
          onChange(newTime);
        }
      },
    });

  const formatTime = (date: Date) => {
    if (!date) return "";
    const hours = date.getHours();
    const minutes = date.getMinutes();
    if (is24Hour) {
      return `${hours.toString().padStart(2, "0")}:${minutes
        .toString()
        .padStart(2, "0")}`;
    } else {
      const period = hours >= 12 ? "PM" : "AM";
      const hour12 = hours % 12 || 12;
      return `${hour12}:${minutes.toString().padStart(2, "0")} ${period}`;
    }
  };

  return (
    <TouchableOpacity
      className="border border-gray-400 rounded-xl px-4 py-3"
      onPress={showPicker}
    >
      <Text className={time ? "text-black" : "text-gray-500"}>
        {time ? formatTime(time) : placeholder}
      </Text>
    </TouchableOpacity>
  );
}

type Props = {
  value?: Date;
  placeholder?: string;
  onChange?: (date: Date) => void | Promise<void>;
  is24Hour?: boolean;
  minimumDate?: Date;
  maximumDate?: Date;
};
