import { FontAwesome } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { Pressable, TextInput, View } from "react-native";

export function SearchBox(props: TextInput["props"]) {
  const [value, setValue] = useState(props.value ?? "");

  useEffect(() => {
    props.onChangeText?.(value);
  }, [value, props.onChangeText]);

  return (
    <View
      className={`flex-row items-center justify-between rounded-xl border border-gray-400 overflow-hidden ${props.className ?? ""}`}
    >
      <TextInput
        {...props}
        className="pl-3"
        value={value}
        onChangeText={setValue}
      />
      <Pressable onPress={() => setValue("")} className="p-3">
        <FontAwesome name="close" size={18} color={"gray"} />
      </Pressable>
    </View>
  );
}
