import ImageKit from "@imagekit/nodejs";
import { File } from "node:buffer";
import { config } from "../config/config.js";

if (!globalThis.File) {
  globalThis.File = File;
}

const client = new ImageKit({
  privateKey: config.IMAGEKIT_PRIVATE_KEY,
});

export async function uploadFile(buffer, filename, folder = "snitch") {
  const result = await client.files.upload({
    file: await ImageKit.toFile(buffer),
    fileName:filename,
    folder,
  });
  return result;
}
