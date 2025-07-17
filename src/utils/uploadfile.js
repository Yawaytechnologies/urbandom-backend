import * as s3Service from "../service/third-party/s3service.js";
import Property from "../data/models/property.model.js";
import mongoose from "mongoose";


const handlePropertyFileUpload = async (propertyId, files) => {
  const property = await Property.findById(propertyId);

  if (!property) {
    throw new Error("Property not found");
  }

  if (!files || files.length === 0) {
    throw new Error("No files provided");
  }

  const uploadResults = [];
  const newImages = [];
  const newVideos = [];

  for (const file of files) {
    const { buffer, originalname, mimetype } = file;

    let folder = `properties/${propertyId}/`;
    if (mimetype.startsWith("image/")) folder += "images/";
    else if (mimetype.startsWith("video/")) folder += "videos/";

    const filePath = `${folder}${Date.now()}-${originalname}`;

    const result = await s3Service.uploadFile(buffer, filePath, mimetype);
    uploadResults.push(result);

    if (mimetype.startsWith("image/")) {
      newImages.push(result.key);
    } else if (mimetype.startsWith("video/")) {
      newVideos.push(result.key);
    }
  }

  console.log("images:", newImages);

  // Use $push with $each to add to arrays in MongoDB
  await Property.findByIdAndUpdate(
    propertyId,
    {
      $push: {
      "media.images": { $each: newImages },  // Adding to the 'images' array inside 'media'
      "media.videos": { $each: newVideos },  // Adding to the 'videos' array inside 'media'
    },
    },
    { new: true, runValidators: false }
  );

  return {
    message: "Files uploaded and linked to property",
    files: uploadResults,
  };
};

const handleDocumentFileUpload = async (files) => {
  if (!files || files.length === 0) {
    throw new Error("No files provided");
  }
  const newDocuments = [];

  for (const file of files) {
    const { buffer, originalname, mimetype } = file;

    let folder = `soldProperty/`;
    if (mimetype.startsWith("application/")) folder += "documents/";

    const filePath = `${folder}${Date.now()}-${originalname}`;

    const result = await s3Service.uploadFile(buffer, filePath, mimetype);

    if (mimetype.startsWith("application/")) {
      newDocuments.push({
        name: originalname,
        file: result.key,
      });
    }
  }

  return newDocuments;
};
export { handlePropertyFileUpload, handleDocumentFileUpload };
