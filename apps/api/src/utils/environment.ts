/** biome-ignore-all lint/style/noNonNullAssertion: App is closed if any of the variables are missing */
import "dotenv/config";

const envVars = [
  { name: "ASD_DATABASE_URL", value: process.env.ASD_DATABASE_URL },
  { name: "ASD_AUTH_SECRET", value: process.env.ASD_AUTH_SECRET },
  { name: "ASD_AUTH_URL", value: process.env.ASD_AUTH_URL },
  { name: "ASD_CLIENT_ORIGIN", value: process.env.ASD_CLIENT_ORIGIN },
  { name: "ASD_PORT", value: process.env.ASD_PORT },
];

const missing = envVars.filter((v) => !v.value).map((v) => v.name);
if (missing.length > 0) {
  console.error("Missing environment variables:", missing.join(", "));
  process.exit(1);
}

export const DATABASE_URL = process.env.ASD_DATABASE_URL!;
export const AUTH_SECRET = process.env.ASD_AUTH_SECRET!;
export const AUTH_URL = process.env.ASD_AUTH_URL!;
export const CLIENT_ORIGIN = process.env.ASD_CLIENT_ORIGIN!;
export const PORT = Number(process.env.ASD_PORT!);
