import { getFileUrl } from "../service/third-party/s3service.js"; // Adjust the import path if necessary

/**
 * Generates URLs for images and videos based on S3 keys
 * @param {Array} imageKeys - List of image keys stored in the database.
 * @param {Array} videoKeys - List of video keys stored in the database.
 * @returns {Object} - Object containing arrays of image and video URLs.
 */
export const generateMediaUrls = async (imageKeys, videoKeys) => {
  const s3BaseUrl = 'https://yawaytech.s3.us-east-1.amazonaws.com/';

  // Generate URLs for images
  const imageUrls = await Promise.allSettled(imageKeys.map((key) => getFileUrl(key)));

  // Generate URLs for videos
  const videoUrls = await Promise.allSettled(videoKeys.map((key) => {
    // If the key looks like a YouTube ID (11 chars long), return a YouTube URL
    if (key.length === 11) {
      return `https://www.youtube.com/watch?v=${key}`;
    } else {
      return getFileUrl(key); // For file-based videos, fetch the URL
    }
  }));

  // Filter successful results and extract the URLs
  const successfulImageUrls = imageUrls
    .filter(result => result.status === 'fulfilled')
    .map(result => result.value);

  const successfulVideoUrls = videoUrls
    .filter(result => result.status === 'fulfilled')
    .map(result => result.value);

  return {
    images: successfulImageUrls,
    videos: successfulVideoUrls,
  };
};
