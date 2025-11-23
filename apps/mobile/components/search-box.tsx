import { TextInput } from "react-native";

export function SearchBox({ onChange, ...props }: Props) {
  return (
    <TextInput
      {...props}
      onChangeText={onChange}
      className={`px-4 rounded-xl border border-gray-400 ${props.className ?? ""}`}
    />
  );
}

type Props = {
  onChange?: (value: string) => void | Promise<void>;
} & TextInput["props"];
