import { Image } from "expo-image";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import { Alert, View } from "react-native";
import { Button } from "./button";

export default function ImageField({ onChange }: Props) {
  const [imageUri, setImageUri] = useState<string | undefined>(undefined);

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
    <View>
      <Button title="Pick the event image" onPress={pickImage} />
      {imageUri && (
        <Image
          source={{
            uri: imageUri,
          }}
          contentFit={"scale-down"}
          style={{ width: "100%", height: 200 }}
        />
      )}
    </View>
  );
}

type Props = {
  onChange?: (base64: string | undefined) => void;
};
