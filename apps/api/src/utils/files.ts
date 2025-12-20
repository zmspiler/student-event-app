import { randomUUID } from "node:crypto";
import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";

/**
 * Saves a base64 encoded image to the public/images folder after validating its extension
 * @param base64String - The base64 encoded image string (with or without data URI prefix)
 * @param extension - The image file extension
 * @returns The file name
 */
export async function saveBase64Image(
  base64String: string,
  extension: ImageExtension,
): Promise<string> {
  const publicDir = join(process.cwd(), "public", "uploads", "images");

  // Ensure the directory exists
  await mkdir(publicDir, { recursive: true });

  // Remove data URI prefix if present
  const base64Data = base64String.replace(/^data:image\/\w+;base64,/, "");

  // Generate a unique filename
  const filename = `${randomUUID()}.${extension}`;
  const filePath = join(publicDir, filename);

  // Convert base64 to buffer and save
  const buffer = Buffer.from(base64Data, "base64");
  await writeFile(filePath, buffer);

  return filename;
}

type ImageExtension = "png" | "jpg" | "jpeg" | "gif" | "webp" | "bmp" | "tiff";
