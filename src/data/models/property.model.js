import mongoose from 'mongoose';

const propertySchema = new mongoose.Schema({
  title: String,
  propertyType: {
    type: String,
    enum: ['residential', 'commercial'],
    required: true,
  },
  lookingTo: {
    type: String,
    enum: ['rent', 'sell', 'pg-co/living'],
    required: true,
  },
  subProperty: {
    type: String,
    enum: [
      '1BHK', '2BHK', '3BHK', // residential
      'office', 'shop', 'warehouse' // commercial
    ],
  },
  location: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Location',
    required: true,
  },
  builtUpArea: Number,
  areaUnit: {
    type: String,
    enum: ['sqft', 'sqmt', 'acre', 'gaj', 'cent', 'hectare'],
  },
  amenities: [String], // or make it [{ name: String, icon: String }] for future

  // Rent/Sell/PG pricing details
  priceDetails: {
    monthlyRent: Number,
    amount: Number,
    availableDate: Date,
    securityDeposit: Number,
    constructionStatus: {
      type: String,
      enum: ['ready-to-move', 'under-construction'],
    },
  },

  // Commercial-only fields
  possessionInfo: {
    type: String,
    enum: ['ready-to-move', 'under-construction'],
  },
  ownership: {
    type: String,
    enum: ['freehold', 'leasehold', 'cooperative society', 'power of attorney'],
  },
  totalFloors: Number,
  yourFloor: Number,

  // PG-specific details
  pgDetails: {
    pgName: String,
    totalBeds: Number,
    pgFor: {
      type: String,
      enum: ['girls', 'boys'],
    },
    suitedFor: {
      type: String,
      enum: ['students', 'professionals', 'both'],
    },
    mealsAvailable: Boolean,
    mealsOffering: {
      breakfast: Boolean,
      lunch: Boolean,
      dinner: Boolean,
    },
    noticePeriod: String,
    commonAreas: [String], // e.g., livingroom, dining hall, etc.
    roomDetails: [
      {
        roomType: {
          type: String,
          enum: ['private', 'double-sharing', 'triple-sharing'],
        },
        rent: Number,
      },
    ],
  },

  media: {
    images: [String],   // store image URLs or filenames
    videos: [String],
    documents: [String], // optional
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Property = mongoose.model('Property', propertySchema);
export default Property;

