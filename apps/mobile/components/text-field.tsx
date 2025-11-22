import { TextInput } from "react-native";

export function TextField(props: Props) {
  return (
    <TextInput
      className={`border border-gray-400 rounded-xl px-4 ${props.className}`}
      {...props}
    />
  );
}

type Props = TextInput["props"];
