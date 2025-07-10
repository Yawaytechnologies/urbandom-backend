import { createState, getAllStates, getStateById, getStatesByCountryId, updateState, deleteState } from "../../service/state.service.js";

export const createStateController = async (req, res) => {
    try {
        const stateData = req.body;
        const state = await createState(stateData);
        res.status(201).json({ message: "State created successfully", state });
    } catch (error) {
        res.status(500).json({ message: "Error creating state", error: error.message });
    }
}

export const getAllStatesController = async (req, res) => {
    try {
        const states = await getAllStates();
        res.status(200).json(states);
    } catch (error) {
        res.status(500).json({ message: "Error fetching states", error: error.message });
    }
}

export const getStateByIdController = async (req, res) => {
    try {
        const { id } = req.params;
        const state = await getStateById(id);
        if (!state) {
            return res.status(404).json({ message: "State not found" });
        }
        res.status(200).json(state);
    } catch (error) {
        res.status(500).json({ message: "Error fetching state", error: error.message });
    }
}


export const updateStateController = async (req, res) => {
    try {
        const { id } = req.params;
        const stateData = req.body;
        const updatedState = await updateState(id, stateData);
        if (!updatedState) {
            return res.status(404).json({ message: "State not found" });
        }
        res.status(200).json({ message: "State updated successfully", updatedState });
    } catch (error) {
        res.status(500).json({ message: "Error updating state", error: error.message });
    }
}

export const deleteStateController = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedState = await deleteState(id);
        if (!deletedState) {
            return res.status(404).json({ message: "State not found" });
        }
        res.status(200).json({ message: "State deleted successfully", deletedState });
    } catch (error) {
        res.status(500).json({ message: "Error deleting state", error: error.message });
    }
}


export const getStatesByCountryIdController = async (req, res) => {
    try {
        const { countryId } = req.params;
        const states = await getStatesByCountryId(countryId);
        res.status(200).json(states);
    } catch (error) {
        res.status(500).json({ message: "Error fetching states by country ID", error: error.message });
    }
}