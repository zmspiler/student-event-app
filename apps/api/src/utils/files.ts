import { randomUUID } from "node:crypto";
import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";

/**
 * Saves a file to the public folder and returns the relative URL path
 * @param file - The file to save
 * @returns The file name
 */
export async function saveFile(file: File, subdirectory: string = ""): Promise<string> {
  const publicDir = join(process.cwd(), "public", subdirectory);

  // Ensure the uploads directory exists
  await mkdir(publicDir, { recursive: true });

  // Generate a unique filename while preserving the extension
  const ext = file.name.split(".").pop() || "";
  const filename = `${randomUUID()}.${ext}`;
  const filePath = join(publicDir, filename);

  // Convert the file to a buffer and save it
  const buffer = Buffer.from(await file.arrayBuffer());
  await writeFile(filePath, buffer);

  return filename;
}

/**
 * Saves an image file to the public/images folder after validating its extension
 * @param file - The image file to save
 * @param allowedExtensions - Array of allowed image file extensions
 * @returns The file name
 */
export async function saveImage(file: File, allowedExtensions: ImageExtension[]): Promise<string> {
  const ext = file.name.split(".").pop()?.toLowerCase();
  if (!ext || !allowedExtensions.includes(ext as ImageExtension)) {
    throw new Error("Invalid image file type.");
  }

  return saveFile(file, "images");
}

type ImageExtension = 'png' | 'jpg' | 'jpeg' | 'gif' | 'webp' | 'bmp' | 'tiff';