/** biome-ignore-all lint/style/noNonNullAssertion: App will exit if environment variables are not present  */

const envVars = [
  {
    name: "EXPO_PUBLIC_ASD_ANDROID_API_URL",
    value: process.env.EXPO_PUBLIC_ASD_ANDROID_API_URL,
  },
];

const missing = envVars.filter((v) => !v.value).map((v) => v.name);
if (missing.length > 0) {
  console.error("Missing environment variables:", missing.join(", "));
  process.exit(1);
}

export const API_URL = process.env.EXPO_PUBLIC_ASD_ANDROID_API_URL!;
