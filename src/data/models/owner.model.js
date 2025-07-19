import mongoose from "mongoose";
import bcrypt from "bcrypt";
import multer from "multer";
import { contentType } from "mime-types";

const ownerSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },

    phone:{
        type: String,
        required: true,
        unique: true,
    },

    email:{
        type: String,
        required: true,
        unique: true,
    },

    type: {
        type: String,
        enum: ['builder', 'owner'],
        required: true,
    },

    password : {
        type: String,
        required: true,
    },

    userProfile: {
    data: Buffer,
     contentType: String
    
  },

    createdAt: {
        type: Date,
        default: Date.now
    },
});





const Owner = mongoose.model("Owner", ownerSchema);
export default Owner;