import { FontAwesome } from "@expo/vector-icons";
import { Image } from "expo-image";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import { Alert, Pressable, Text, View } from "react-native";

export default function ImageField({ onChange }: Props) {
  const [imageUri, setImageUri] = useState<string | undefined>(undefined);

  const clearImage = () => {
    setImageUri(undefined);
    onChange?.(undefined);
  };
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library.
    // Manually request permissions for videos on iOS when `allowsEditing` is set to `false`
    // and `videoExportPreset` is `'Passthrough'` (the default), ideally before launching the picker
    // so the app users aren't surprised by a system dialog after picking a video.
    // See "Invoke permissions for videos" sub section for more details.
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      Alert.alert(
        "Permission required",
        "Permission to access the media library is required.",
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: "images",
      base64: true,
      allowsEditing: false,
      quality: 1,
    });

    if (!result.canceled) {
      const asset = result.assets[0];
      setImageUri(asset.uri);
      onChange?.(asset.base64 ?? undefined);
    }
  };

  return (
    <Pressable
      className="border border-gray-400 rounded-xl overflow-hidden w-full"
      style={{ aspectRatio: 16 / 9 }}
      onPress={imageUri ? clearImage : pickImage}
    >
      {imageUri ? (
        <Image
          source={{ uri: imageUri }}
          style={{ width: "100%", height: "100%" }}
          contentFit="cover"
        />
      ) : (
        <View className="flex-row gap-2 justify-center items-center h-full">
          <FontAwesome name={"plus-circle"} color={"gray"} />
          <Text className="text-gray-500">Press to select an image</Text>
        </View>
      )}
    </Pressable>
  );
}

type Props = {
  onChange?: (base64: string | undefined) => void;
};
