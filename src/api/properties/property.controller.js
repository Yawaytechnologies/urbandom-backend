import { createProperty, getAllProperties, getPropertyById, updateProperty, deleteProperty, findPropertiesByLocationFilters, lookingToFilters, filterByPropertyType, getPropertieslimit  } from "../../service/property.service.js";
import { generateMediaUrls } from "../../service/generateMedia.service.js";
import { handlePropertyFileUpload } from "../../utils/uploadfile.js";
import { getFileUrl } from "../../service/third-party/s3service.js";
import mongoose from "mongoose";
import Property from "../../data/models/property.model.js";

export const createPropertyController = async (req, res) => {
  try {
    const data = req.body;

    if (data.lookingTo === 'rent') {
      if (!data.priceDetails?.monthlyRent || !data.priceDetails?.securityDeposit) {
        return res.status(400).json({ message: "For rent, provide 'monthlyRent' and 'securityDeposit' in priceDetails." });
      }
    }

    if (data.lookingTo === 'sell') {
      if (!data.priceDetails?.amount) {
        return res.status(400).json({ message: "For sell, provide 'amount' in priceDetails." });
      }
    }

    if (data.lookingTo === 'pg-co/living') {
      if (
        !data.pgDetails?.pgName ||
        !data.pgDetails?.roomDetails ||
        data.pgDetails.roomDetails.length === 0
      ) {
        return res.status(400).json({ message: "For PG/Co-living, provide 'pgName' and at least one 'roomDetail'." });
      }
    }

    const property = await createProperty(data);
    res.status(201).json({ message: "Property created successfully", property });

  } catch (error) {
    res.status(500).json({ message: "Error creating property", error: error.message });
  }
};


export const getAllPropertiesController = async (req, res) => {
  try {
    const properties = await getAllProperties();
    res.status(200).json(properties);
    // Generate media URLs for each property
    properties.forEach(property => {
      property.media = generateUrls(property.media);
    });
    // Populate URLs for nested fields
    await Promise.all(properties.map(property => generateMediaUrls(property)));
    // Return the properties with populated URLs
    res.status(200).json(properties);
  } catch (error) {
    res.status(500).json({ message: "Error fetching properties", error: error.message });
  }
}

export const getPropertyByIdController = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid property ID" });
    }

    // Get property with location populated
    const property = await getPropertyById(id);
    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }

    // Convert to plain object
    const propertyData = property.toObject?.() || property;

    // Extract media keys
    const imageKeys = Array.isArray(propertyData.media?.images) ? propertyData.media.images : [];
    const videoKeys = Array.isArray(propertyData.media?.videos) ? propertyData.media.videos : [];

    // Generate media URLs
    const imageUrls = await Promise.allSettled(imageKeys.map((key) => getFileUrl(key)));
    const videoUrls = await Promise.allSettled(videoKeys.map((key) => getFileUrl(key)));

    // Filter fulfilled results only
    const filteredImages = imageUrls.filter(r => r.status === 'fulfilled').map(r => r.value);
    const filteredVideos = videoUrls.filter(r => r.status === 'fulfilled').map(r => r.value);

    // Replace media with actual URLs
    propertyData.media = {
      images: filteredImages,
      videos: filteredVideos,
    };

    // Send response
    res.status(200).json({
      success: true,
      data: propertyData,
    });

  } catch (error) {
    res.status(500).json({
      message: "Error fetching property",
      error: error.message,
    });
  }
};

export const updatePropertyController = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;

    if (data.lookingTo === 'rent') {
      if (!data.priceDetails?.monthlyRent || !data.priceDetails?.securityDeposit) {
        return res.status(400).json({ message: "For rent, provide 'monthlyRent' and 'securityDeposit' in priceDetails." });
      }
    }

    if (data.lookingTo === 'sell') {
      if (!data.priceDetails?.amount) {
        return res.status(400).json({ message: "For sell, provide 'amount' in priceDetails." });
      }
    }

    if (data.lookingTo === 'pg-co/living') {
      if (
        !data.pgDetails?.pgName ||
        !data.pgDetails?.roomDetails ||
        data.pgDetails.roomDetails.length === 0
      ) {
        return res.status(400).json({ message: "For PG/Co-living, provide 'pgName' and at least one 'roomDetail'." });
      }
    }

    const updatedProperty = await updateProperty(id, data);
    if (!updatedProperty) {
      return res.status(404).json({ message: "Property not found" });
    }
    res.status(200).json({ message: "Property updated successfully", updatedProperty });

  } catch (error) {
    res.status(500).json({ message: "Error updating property", error: error.message });
  }
}

export const deletePropertyController = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProperty = await deleteProperty(id);
    if (!deletedProperty) {
      return res.status(404).json({ message: "Property not found" });
    }
    res.status(200).json({ message: "Property deleted successfully", deletedProperty });
  } catch (error) {
    res.status(500).json({ message: "Error deleting property", error: error.message });
  }
}


export const propertySearchController = async (req, res) => {
  try {
    const { country, state, district, location } = req.query;

    if (!country && !state && !district && !location) {
      return res.status(400).json({ message: "Please provide at least one filter (country, state, district, or location)" });
    }

    const properties = await findPropertiesByLocationFilters({ country, state, district, location });

    res.status(200).json({ count: properties.length, properties });
  } catch (error) {
    res.status(500).json({ message: "Property search failed", error: error.message });
  }
};



export const lookingToController = async (req, res) => {
  try {
    const { lookingTo } = req.params;  // Extract lookingTo from request params

    // Validate the lookingTo type
    const validTypes = ['rent', 'sell', 'pg-co/living'];
    if (!validTypes.includes(lookingTo)) {
      return res.status(400).json({ message: 'Invalid lookingTo type. Valid types are rent, sell, or pg-co/living.' });
    }

    // Fetch properties based on lookingTo value
    const properties = await lookingToFilters(lookingTo);
    return res.status(200).json(properties);
  } catch (error) {
    console.error('Error fetching properties:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};



export const propertyTypeFilterController = async (req, res) => {
  try {
    const { type } = req.query;

    if (!type) {
      return res.status(400).json({ message: "Please provide a 'type' query param like ?type=residential" });
    }

    const properties = await filterByPropertyType(type);
    res.status(200).json({ count: properties.length, properties });
  } catch (error) {
    res.status(500).json({ message: "Property type filter failed", error: error.message });
  }
};


export const uploadfiles = async (req, res) => {
  try {
    const { propertyId } = req.params;
    const files = req.files;
    console.log(files);
    console.log(propertyId);  

    const uploadResults = await handlePropertyFileUpload(propertyId, files);
    res.status(200).json(uploadResults);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export const getPropertiesLimitController = async (req, res) => {
  try {
    const limit = 5; // hardcoded fixed limit

    const properties = await Property.find()
      .populate('location') // ✅ populate the location field
      .sort({ createdAt: -1 })
      .limit(limit)
      .lean(); // return plain JS objects

    const updatedProperties = await Promise.all(
      properties.map(async (property) => {
        const imageKeys = Array.isArray(property.media?.images) ? property.media.images : [];
        const videoKeys = Array.isArray(property.media?.videos) ? property.media.videos : [];

        const imageUrls = await Promise.allSettled(imageKeys.map((key) => getFileUrl(key)));
        const videoUrls = await Promise.allSettled(videoKeys.map((key) => getFileUrl(key)));

        const filteredImages = imageUrls.filter(r => r.status === 'fulfilled').map(r => r.value);
        const filteredVideos = videoUrls.filter(r => r.status === 'fulfilled').map(r => r.value);

        return {
          ...property,
          media: {
            images: filteredImages,
            videos: filteredVideos,
          }
        };
      })
    );

    res.status(200).json({
      success: true,
      count: updatedProperties.length,
      data: updatedProperties,
    });

  } catch (error) {
    res.status(500).json({
      message: 'Error fetching limited properties',
      error: error.message,
    });
  }
};

