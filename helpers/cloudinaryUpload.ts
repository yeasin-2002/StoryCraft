import { UploadApiResponse, v2 } from "cloudinary";

export const cloudinaryUpload = async (file: Blob) => {
  return new Promise<UploadApiResponse>(async (resolve, reject) => {
    const buffer = Buffer.from(await file.arrayBuffer());
    v2.uploader
      .upload_stream(
        {
          resource_type: "auto",
          folder: "story-craft",
        },
        (err, result) => {
          if (err) {
            return reject(err);
          } else if (result) {
            return resolve(result);
          } else {
            return reject(new Error("fail to upload image  on cloudinary"));
          }
        }
      )
      .end(buffer);
  });
};
