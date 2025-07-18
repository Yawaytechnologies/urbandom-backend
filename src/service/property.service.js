import Property from "../data/models/property.model.js";
import Location from "../data/models/location.model.js";
import Country from "../data/models/country.model.js";
import State from "../data/models/state.model.js";
import District from "../data/models/district.model.js";
import { getFileUrl } from "./third-party/s3service.js";


export const createProperty = async (propertyData) => {
  const property = new Property(propertyData);
  const saved = await property.save();

  // Populate location → district → state → country
  return await Property.findById(saved._id).populate({
    path: 'location',
    populate: {
      path: 'district',
      populate: {
        path: 'state',
        populate: {
          path: 'country'
        }
      }
    }
  });
};

export const getAllProperties = async () => {
  return await Property.find().sort({ createdAt: -1 }).populate({
    path: 'location',
    populate: {
      path: 'district',
      populate: {
        path: 'state',
        populate: {
          path: 'country'
        }
      }
    }
  });
};


export const getPropertyById = async (id) => {
  return await Property.findById(id).populate({
    path: 'location',
    populate: {
      path: 'district',
      populate: {
        path: 'state',
        populate: {
          path: 'country'
        }
      }
    }
  });
};


export const updateProperty = async (id, propertyData) => {
  return await Property.findByIdAndUpdate(id, propertyData, { new: true }).populate({
    path: 'location',
    populate: {
      path: 'district',
      populate: {
        path: 'state',
        populate: {
          path: 'country'
        }
      }
    }
  });
};


export const deleteProperty = async (id) => {
  return await Property.findByIdAndDelete(id);
};

export const findPropertiesByLocationFilters = async (filters) => {
  let locationIds = [];

  if (filters.location) {
    const locations = await Location.find({ name: new RegExp(filters.location, 'i') });
    locationIds = locations.map(loc => loc._id);
  }

  else if (filters.district) {
    const districts = await District.find({ name: new RegExp(filters.district, 'i') });
    const locations = await Location.find({ district: { $in: districts.map(d => d._id) } });
    locationIds = locations.map(loc => loc._id);
  }

  else if (filters.state) {
    const states = await State.find({ name: new RegExp(filters.state, 'i') });
    const districts = await District.find({ state: { $in: states.map(s => s._id) } });
    const locations = await Location.find({ district: { $in: districts.map(d => d._id) } });
    locationIds = locations.map(loc => loc._id);
  }

  else if (filters.country) {
    const countries = await Country.find({ name: new RegExp(filters.country, 'i') });
    const states = await State.find({ country: { $in: countries.map(c => c._id) } });
    const districts = await District.find({ state: { $in: states.map(s => s._id) } });
    const locations = await Location.find({ district: { $in: districts.map(d => d._id) } });
    locationIds = locations.map(loc => loc._id);
  }

  // If no matching locationIds, return empty
  if (!locationIds.length) return [];

  // 🔍 Fetch Properties
  return await Property.find({ location: { $in: locationIds } })
    .sort({ createdAt: -1 })
    .populate({
      path: 'location',
      populate: {
        path: 'district',
        populate: {
          path: 'state',
          populate: { path: 'country' }
        }
      }
    });
};


export const lookingToFilters = async (lookingTo) => {
  // Use the correct variable name `lookingTo` instead of `lookingToValue`
  return await Property.find({ lookingTo: lookingTo }) // Fix: use `lookingTo`
    .sort({ createdAt: -1 })
    .populate({
      path: 'location',
      populate: {
        path: 'district',
        populate: {
          path: 'state',
          populate: { path: 'country' }
        }
      }
    });
};


export const filterByPropertyType = async (propertyType) => {
  return await Property.find({ propertyType })
    .sort({ createdAt: -1 })
    .populate({
      path: 'location',
      populate: {
        path: 'district',
        populate: {
          path: 'state',
          populate: { path: 'country' }
        }
      }
    });
};


export const generateUrlsForProperty = async (propertyId) => {
  const property = await Property.findById(propertyId);
  if (!property) {
    throw new Error("Property not found");
  }

  const imageKeys = Array.isArray(property.media?.images) ? property.media.images : [];
  const videoKeys = Array.isArray(property.media?.videos) ? property.media.videos : [];

  const imageUrls = await Promise.allSettled(imageKeys.map((key) => getFileUrl(key)));
  const videoUrls = await Promise.allSettled(videoKeys.map((key) => getFileUrl(key)));

  return {
    images: imageUrls
      .filter((r) => r.status === "fulfilled")
      .map((r) => r.value),
    videos: videoUrls
      .filter((r) => r.status === "fulfilled")
      .map((r) => r.value),
  };
};