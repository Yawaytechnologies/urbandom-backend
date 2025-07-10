import District from "../data/models/district.model.js";

export const createDistrict = async (districtData) => {
    const district = new District(districtData);
    const saved = await district.save();
    // populate 'state' after saving
    return await District.findById(saved._id).populate('state');
}

export const getAllDistricts = async () => {
    // Fetch all districts and populate the 'state' field
    return await District.find().sort({ createdAt: -1 }).populate('state');
}

export const getDistrictById = async (id) => {
    // Fetch a district by ID and populate the 'state' field
    return await District.findById(id).populate('state');
}

export const updateDistrict = async (id, districtData) => {
    // Update a district by ID and populate the 'state' field
    return await District.findByIdAndUpdate(id, districtData, { new: true }).populate('state');
}

export const deleteDistrict = async (id) => {
    // Delete a district by ID
    return await District.findByIdAndDelete(id);
}

export const getDistrictsByStateId = async (stateId) => {
    // Fetch districts by state ID and populate the 'state' field
    return await District.find({ state: stateId }).sort({ createdAt: -1 }).populate('state');
}
