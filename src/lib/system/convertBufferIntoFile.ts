import { promises as fs } from "fs";

export default async function convertBufferIntoFile(
  file: File,
  fileName: string,
  fileType: string,
) {
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const filePath = `./public/${fileName}.${fileType}`;
  await fs.writeFile(filePath, buffer);
}
