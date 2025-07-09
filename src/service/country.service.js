import Country from "../data/models/country.model.js";


export const createCountry = async (countryData) => {
    const country = new Country(countryData);
    return await country.save();
};

export const getAllCountries = async () => {
    return await Country.find().sort({ createdAt: -1 });
}

export const getCountryById = async (id) => {
    return await Country.findById(id);
};

export const updateCountry = async (id, countryData) => {
    return await Country.findByIdAndUpdate(id, countryData, { new: true });
};

export const deleteCountry = async (id) => {
    return await Country.findByIdAndDelete(id);
};