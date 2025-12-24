import {
  Text,
  TouchableOpacity,
  type TouchableOpacityProps,
} from "react-native";

export function Button({
  title,
  disabled,
  onPress,
  className,
  textClassName,
  ...props
}: Props) {
  return (
    <TouchableOpacity
      className={`p-3 bg-blue-400 rounded-xl${disabled ? " opacity-50" : ""} ${className}`}
      disabled={disabled}
      onPress={onPress}
      {...props}
    >
      <Text
        className={`mx-auto text-white${disabled ? " text-black" : ""} ${textClassName}`}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
}

type Props = {
  title: string;
  disabled?: boolean;
  onPress?: () => void | Promise<void>;
  textClassName?: string;
} & TouchableOpacityProps;
``;
