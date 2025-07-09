import { createProperty, getAllProperties, getPropertyById, updateProperty, deleteProperty, findPropertiesByLocationFilters, lookingToFilters, filterByPropertyType } from "../../service/property.service.js";

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
  } catch (error) {
    res.status(500).json({ message: "Error fetching properties", error: error.message });
  }
}

export const getPropertyByIdController = async (req, res) => {
  try {
    const { id } = req.params;
    const property = await getPropertyById(id);
    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }
    res.status(200).json(property);
  } catch (error) {
    res.status(500).json({ message: "Error fetching property", error: error.message });
  }
}

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
    const { lookingTo } = req.query;

    if (!lookingTo) {
      return res.status(400).json({ message: "Please provide a 'lookingTo' filter" });
    }

    const properties = await lookingTo(lookingTo);

    res.status(200).json({ count: properties.length, properties });
  } catch (error) {
    res.status(500).json({ message: "Looking to filter failed", error: error.message });
  }
}



export const propertieslookingToController = async (req, res) => {
  try {
    const { lookingTo } = req.query;

    if (!lookingTo) {
      return res.status(400).json({ message: "Please provide a 'lookingTo' filter" });
    }

    const properties = await lookingToFilters(lookingTo);

    res.status(200).json({ count: properties.length, properties });
  } catch (error) {
    res.status(500).json({ message: "Looking to filter failed", error: error.message });
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



