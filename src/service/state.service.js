import State from "../data/models/state.model.js";

export const createState = async (stateData) => {
  const state = new State(stateData);
  const saved = await state.save();

  // populate 'country' after saving
  return await State.findById(saved._id).populate('country');
};

export const getAllStates = async () => {
    return await State.find().sort({ createdAt: -1 }).populate('country');
}

export const getStateById = async (id) => {
    return await State.findById(id).populate('country');
}


export const updateState = async (id, stateData) => {
    return await State.findByIdAndUpdate(id, stateData, { new: true }).populate('country');
}

export const deleteState = async (id) => {
    return await State.findByIdAndDelete(id);
}

export const getStatesByCountryId = async (countryId) => {
    return await State.find({ country: countryId }).sort({ createdAt: -1 }).populate('country');
}