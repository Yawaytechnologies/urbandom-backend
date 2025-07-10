import { createLocation, getAllLocations,getLocationById, getLocationsByDistrictId, updateLocation,deleteLocation } from "../../service/location.service.js";

export const createLocationController = async (req, res) => {
    try {
        const locationData = req.body;
        const location = await createLocation(locationData);
        res.status(201).json({ message: "Location created successfully", location });
    } catch (error) {
        res.status(500).json({ message: "Error creating location", error: error.message });
    }
}

export const getAllLocationsController = async (req, res) => {
    try {
        const locations = await getAllLocations();
        res.status(200).json(locations);
    } catch (error) {
        res.status(500).json({ message: "Error fetching locations", error: error.message });
    }
}

export const getLocationByIdController = async (req, res) => {
    try {
        const { id } = req.params;
        const location = await getLocationById(id);
        if (!location) {
            return res.status(404).json({ message: "Location not found" });
        }
        res.status(200).json(location);
    } catch (error) {
        res.status(500).json({ message: "Error fetching location", error: error.message });
    }
}

export const updateLocationController = async (req, res) => {
    try {
        const { id } = req.params;
        const locationData = req.body;
        const updatedLocation = await updateLocation(id, locationData);
        if (!updatedLocation) {
            return res.status(404).json({ message: "Location not found" });
        }
        res.status(200).json({ message: "Location updated successfully", updatedLocation });
    } catch (error) {
        res.status(500).json({ message: "Error updating location", error: error.message });
    }
}

export const deleteLocationController = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedLocation = await deleteLocation(id);
        if (!deletedLocation) {
            return res.status(404).json({ message: "Location not found" });
        }
        res.status(200).json({ message: "Location deleted successfully", deletedLocation });
    } catch (error) {
        res.status(500).json({ message: "Error deleting location", error: error.message });
    }
}


export const getLocationsByDistrictIdController = async (req, res) => { 
    try {
        const { districtId } = req.params;
        const locations = await getLocationsByDistrictId(districtId);
        res.status(200).json(locations);
    } catch (error) {
        res.status(500).json({ message: "Error fetching locations by district", error: error.message });
    }
}

