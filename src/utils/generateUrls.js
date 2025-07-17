import Property from "../data/models/property.model.js";
import { getFileUrl } from "../service/third-party/s3service.js"; // Adjust the import path as necessary

export const generateUrls = async (req, res) => {
  const { propertyId } = req.params;
  
  // Fetch the property from the database
  const property = await Property.findById(propertyId);
  
  // If the property is not found, return a 404 error
  if (!property) {
    return res.status(404).json({ message: "Property not found" });
  }

  // Ensure images and videos are arrays (fallback to empty array if undefined)
  const imageKeys = property.media?.images || [];
  const videoKeys = property.media?.videos || [];

  console.log("Property images and videos:", imageKeys, videoKeys); // Debugging line
  
  // Generate URLs for images using Promise.allSettled
  const imageUrls = await Promise.allSettled(imageKeys.map((key) => getFileUrl(key)));
  
  // Generate URLs for videos
  const videoUrls = await Promise.allSettled(videoKeys.map((key) => {
    // Check if the key looks like a YouTube video ID (YouTube IDs are usually 11 characters long)
    if (key.length === 11) {
      return `https://www.youtube.com/watch?v=${key}`;  // YouTube video URL
    } else {
      return getFileUrl(key);  // For file-based videos, fetch the URL
    }
  }));

  // Map the results from Promise.allSettled to extract the successful URLs
  const successfulImageUrls = imageUrls
    .filter(result => result.status === 'fulfilled')
    .map(result => result.value);

  const successfulVideoUrls = videoUrls
    .filter(result => result.status === 'fulfilled')
    .map(result => result.value);

  // Send the successful URLs as a response
  res.status(200).json({
    images: successfulImageUrls,
    videos: successfulVideoUrls,
  });
}
