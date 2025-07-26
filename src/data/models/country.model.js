import mongoose from "mongoose";

const countrySchema = new mongoose.Schema({
    name: { type: String, required: true },

     createdAt: {
    type: Date,
    default: Date.now,
  },

},

);

const Country = mongoose.model('country', countrySchema);
export default Country;