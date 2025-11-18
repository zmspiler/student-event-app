import { TextInput } from "react-native";

export function SearchBox({ placeholder, onChange }: Props) {
  return (
    <TextInput
      placeholder={placeholder}
      onChangeText={onChange}
      className="px-4 rounded-xl border border-gray-400"
    />
  );
}

type Props = {
  placeholder?: string;
  onChange?: (value: string) => void | Promise<void>;
};
