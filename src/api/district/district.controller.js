import { createDistrict, getAllDistricts, getDistrictById, updateDistrict, deleteDistrict, getDistrictsByStateId  } from "../../service/district.service.js";

export const createDistrictController = async (req, res) => {
    try {
        const districtData = req.body;
        const district = await createDistrict(districtData);
        res.status(201).json({ message: "District created successfully", district });
    } catch (error) {
        res.status(500).json({ message: "Error creating district", error: error.message });
    }
}

export const getAllDistrictsController = async (req, res) => {
    try {
        const districts = await getAllDistricts();
        res.status(200).json(districts);
    } catch (error) {
        res.status(500).json({ message: "Error fetching districts", error: error.message });
    }
}

export const getDistrictByIdController = async (req, res) => {
    try {
        const { id } = req.params;
        const district = await getDistrictById(id);
        if (!district) {
            return res.status(404).json({ message: "District not found" });
        }
        res.status(200).json(district);
    } catch (error) {
        res.status(500).json({ message: "Error fetching district", error: error.message });
    }
}

export const updateDistrictController = async (req, res) => {
    try {
        const { id } = req.params;
        const districtData = req.body;
        const updatedDistrict = await updateDistrict(id, districtData);
        if (!updatedDistrict) {
            return res.status(404).json({ message: "District not found" });
        }
        res.status(200).json({ message: "District updated successfully", updatedDistrict });
    } catch (error) {
        res.status(500).json({ message: "Error updating district", error: error.message });
    }
}

export const deleteDistrictController = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedDistrict = await deleteDistrict(id);
        if (!deletedDistrict) {
            return res.status(404).json({ message: "District not found" });
        }
        res.status(200).json({ message: "District deleted successfully", deletedDistrict });
    } catch (error) {
        res.status(500).json({ message: "Error deleting district", error: error.message });
    }
}

export const getDistrictsByStateIdController = async (req, res) => {
    try {
        const { stateId } = req.params;
        const districts = await getDistrictsByStateId(stateId);
        res.status(200).json(districts);
    } catch (error) {
        res.status(500).json({ message: "Error fetching districts by state ID", error: error.message });
    }
}