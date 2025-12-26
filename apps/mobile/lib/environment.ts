import { Platform } from "react-native";

const webApiUrl = process.env.EXPO_PUBLIC_WEB_API_URL;
const androidApiUrl = process.env.EXPO_PUBLIC_ANDROID_API_URL;

if (!webApiUrl || !androidApiUrl) {
  throw new Error("Missing required environment variables");
}

export const API_URL = Platform.OS === "web" ? webApiUrl : androidApiUrl;
