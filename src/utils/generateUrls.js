import Property from "../data/models/property.model.js";
import { getFileUrl } from "../service/third-party/s3service.js"; // Adjust the import path as necessary

export const generateUrls = async (req, res) => {
    const { propertyId } = req.params;
    const property = await Property.findById(propertyId)
    if (!property) {
        return res.status(404).json({ message: "Property not found" });
    }
    console.log("Property images and videos:", property.media.images, property.media.videos); // Debugging line
    const imageKeys = property.media?.images || [];
    const videoKeys = property.media?.videos || [];

    const imageUrls = await Promise.allSettled(imageKeys.map((key) => getFileUrl(key)));
    const videoUrls = await Promise.allSettled(videoKeys.map((key) => getFileUrl(key)));

    res.status(200).json({
     "media.images": imageUrls,
     "media.videos": videoUrls,
    });
}
