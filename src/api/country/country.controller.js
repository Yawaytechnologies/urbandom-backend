import { createCountry, getAllCountries, getCountryById, updateCountry, deleteCountry } from "../../service/country.service.js";

export const createCountryController = async (req, res) => {
    try {
        const countryData = req.body;
        const country = await createCountry(countryData);
        res.status(201).json({ message: "Country created successfully", country });
    } catch (error) {
        res.status(500).json({ message: "Error creating country", error: error.message });
    }
}

export const getAllCountriesController = async (req, res) => {
    try {
        const countries = await getAllCountries();
        res.status(200).json(countries);
    } catch (error) {
        res.status(500).json({ message: "Error fetching countries", error: error.message });
    }
}

export const getCountryByIdController = async (req, res) => {
    try {
        const { id } = req.params;
        const country = await getCountryById(id);
        if (!country) {
            return res.status(404).json({ message: "Country not found" });
        }
        res.status(200).json(country);
    } catch (error) {
        res.status(500).json({ message: "Error fetching country", error: error.message });
    }
}

export const updateCountryController = async (req, res) => {
    try {
        const { id } = req.params;
        const countryData = req.body;
        const updatedCountry = await updateCountry(id, countryData);
        if (!updatedCountry) {
            return res.status(404).json({ message: "Country not found" });
        }
        res.status(200).json({ message: "Country updated successfully", updatedCountry });
    } catch (error) {
        res.status(500).json({ message: "Error updating country", error: error.message });
    }
}

export const deleteCountryController = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedCountry = await deleteCountry(id);
        if (!deletedCountry) {
            return res.status(404).json({ message: "Country not found" });
        }
        res.status(200).json({ message: "Country deleted successfully", deletedCountry });
    } catch (error) {
        res.status(500).json({ message: "Error deleting country", error: error.message });
    }
}