import Property from "../data/models/property.model.js";
import Location from "../data/models/location.model.js";
import Country from "../data/models/country.model.js";
import State from "../data/models/state.model.js";
import District from "../data/models/district.model.js";


export const createProperty = async (propertyData) => {
  const property = new Property(propertyData);
  const saved = await property.save();

  // Populate location → district → state → country
  return await Property.findById(saved._id)
  .populate('owner') // Populate ownership details
  .populate({
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
  return await Property.find().sort({ createdAt: -1 })
  .populate('owner') // Populate ownership details
  .populate({
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
  return await Property.findById(id)
  .populate('owner') // Populate ownership details
 .populate({
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
  return await Property.findByIdAndUpdate(id, propertyData, { new: true })
    .populate('owner') // Populate ownership details
  .populate({
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
    .populate('owner') // Populate ownership details
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
  return await Property.find({ lookingTo })
    .sort({ createdAt: -1 })
    .populate('owner') // Populate ownership details
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
    .populate('owner') // Populate ownership details
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