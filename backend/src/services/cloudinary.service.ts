import { Readable } from "node:stream";
import cloudinary from "../config/cloudinary.js";

interface CloudinaryUploadResult {
  secure_url: string;
  public_id: string;
}

export const uploadImage = (
  buffer: Buffer
): Promise<CloudinaryUploadResult> => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: "moviehub/movies",
        resource_type: "image",
      },
      (error, result) => {
        if (error || !result) {
          reject(
            error ?? new Error("Cloudinary upload failed")
          );

          return;
        }

        resolve({
          secure_url: result.secure_url,
          public_id: result.public_id,
        });
      }
    );

    Readable.from(buffer).pipe(uploadStream);
  });
};