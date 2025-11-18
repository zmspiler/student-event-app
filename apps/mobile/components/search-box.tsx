import { TextInput } from "react-native";

export function SearchBox({ placeholder, onChange }: Props) {
  return (
    <TextInput
      placeholder={placeholder}
      onChangeText={onChange}
      style={{
        borderWidth: 1,
      }}
      className="px-4 rounded-xl border-gray-400"
    />
  );
}

type Props = {
  placeholder?: string;
  onChange?: (value: string) => void | Promise<void>;
};
