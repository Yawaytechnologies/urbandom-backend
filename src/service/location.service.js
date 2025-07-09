import Location from "../data/models/location.model.js";

export const createLocation = async (locationData) => {
    const location = new Location(locationData);
    const saved = await location.save();
    // populate 'district' after saving
     return await Location.findById(saved._id).populate({
    path: 'district',
    populate: {
      path: 'state',
      populate: {
        path: 'country'
      }
    }
  });
};

export const getAllLocations = async () => {
  return await Location.find()
    .sort({ createdAt: -1 })
    .populate({
      path: "district",
      populate: {
        path: "state",
        populate: {
          path: "country"
        }
      }
    });
};

export const getLocationById = async (id) => {
    // Fetch a location by ID and populate the 'district' field
    return await Location.findById(id).populate({
      path: 'district',
      populate: {
        path: 'state',
        populate: {
          path: 'country'
        }
      }
    });
};

export const updateLocation = async (id, locationData) => {
    // Update a location by ID and populate the 'district' field
    return await Location.findByIdAndUpdate(id, locationData, { new: true }).populate({
      path: 'district',
      populate: {
        path: 'state',
        populate: {
          path: 'country'
        }
      }
    });
};

export const deleteLocation = async (id) => {
    // Delete a location by ID
    return await Location.findByIdAndDelete(id);
};

export const getLocationsByDistrictId = async (districtId) => {
    // Fetch locations by district ID and populate the 'district' field
    return await Location.find({ district: districtId })
        .sort({ createdAt: -1 })
};