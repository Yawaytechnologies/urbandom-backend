import mongoose from "mongoose";
import bcrypt from "bcrypt";
import multer from "multer";
import { contentType } from "mime-types";

const userSchema = new mongoose.Schema({
    username: {
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

    userPassword : {
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

const saltRounds = 10;
userSchema.pre('save', async function(next) {
  if (this.isModified('UserPassword')) {
    this.UserPassword = await bcrypt.hash(this.UserPassword, saltRounds);
  }
  next();
});

// Method to compare password for login
userSchema.methods.comparePassword = async function(password) {
  return await bcrypt.compare(password, this.UserPassword);
};



const User = mongoose.model("User", userSchema);
export default User;