import { Button } from "./button";

export function MenuButton({ text, onPress }: Props) {
  return (
    <Button
      title={text}
      className="bg-gray-300"
      textClassName="color-black"
      onPress={onPress}
    />
  );
}

type Props = {
  text: string;
  onPress?: () => void;
};
