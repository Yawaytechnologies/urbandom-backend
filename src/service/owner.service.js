import Owner from "../models/owner.model.js"; // Adjust path based on your file name
import { hashPassword, comparePassword } from "../security/bcryptHandle.js";
import { generateToken } from "../middlewares/jwtauth.js";
import {
  emailValidate,
  passwordValidate,
  phoneValidate,
  nullValidator,
} from "../validatore/userValidator.js";
import { sendVerificationEmail } from "../utils/mailer.js";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import Booking from "../data/models/booking.model.js";

// Register Owner
export const registerOwnerService = async (data, file) => {
  const { username, email, password, phone } = data;

  if (!userId || !email || !password || !phone || !type) {
    throw new Error("All fields are required");
  }

  if (!emailValidate(email)) throw new Error("Invalid email format");
  if (!phoneValidate(phone)) throw new Error("Invalid phone number");
  if (!passwordValidate(password)) throw new Error("Weak password");
  if (!nullValidator(userId)) throw new Error("Invalid userId");
  if (!nullValidator(type)) throw new Error("Invalid type");

  const existingOwner = await Owner.findOne({ email });
  if (existingOwner) throw new Error("Owner already exists");

  const hashedPassword = await hashPassword(password);

  let userProfileBase64 = null;
  if (file) {
    userProfileBase64 = `data:${file.mimetype};base64,${file.buffer.toString('base64')}`;
  }

  const newOwner = new Owner({
    userId,
    email,
    type,
    phone,
    password: hashedPassword,
    userProfile: file
      ? {
          data: file.buffer,
          contentType: file.mimetype,
          base64: userProfileBase64,
        }
      : undefined,
  });

  const owner = await newOwner.save();

  const token = generateToken(owner._id);
  const emailToken = jwt.sign({ userId: owner._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
  const verificationLink = `${process.env.CLIENT_URL}/verify-email/${emailToken}`;

  await sendVerificationEmail(email, username, verificationLink);

  return { owner, token };
};

// Login Owner
export const loginOwnerService = async ({ phone, password }) => {
  const owner = await Owner.findOne({ phone });
  if (!owner) throw new Error("Invalid phone or password");

  const isMatch = await comparePassword(password, owner.password);
  if (!isMatch) throw new Error("Invalid phone or password");

  const token = generateToken(owner._id);
  return { token, owner };
};

// Get Owner Profile
export const getOwnerProfileService = async (ownerId) => {
  const owner = await Owner.findById(ownerId).select("-password");
  if (!owner) throw new Error("Owner not found");
  return owner;
};

// Get All Owners
export const getAllOwnersService = async () => {
  return await Owner.find().select("-password");
};

// Update Owner
export const updateOwnerService = async (ownerId, updatedData, file) => {
  const objectId = new mongoose.Types.ObjectId(ownerId);

  if (updatedData.password) {
    updatedData.password = await hashPassword(updatedData.password);
  }

  if (file) {
    updatedData.userProfile = {
      data: file.buffer,
      contentType: file.mimetype,
      base64: `data:${file.mimetype};base64,${file.buffer.toString("base64")}`,
    };
  }

  const updatedOwner = await Owner.findByIdAndUpdate(objectId, updatedData, { new: true });

  if (!updatedOwner) throw new Error("Owner not found");

  return updatedOwner;
};

// Delete Owner
export const deleteOwnerService = async (ownerId) => {
  const objectId = new mongoose.Types.ObjectId(ownerId);
  const deleted = await Owner.findByIdAndDelete(objectId);

  if (!deleted) throw new Error("Owner not found");

  return deleted;
};

// Get the user's bookings and populate property and owner details
export const getOwnerBookingsService = async (ownerId) => {
  const bookings = await Booking.find({ "property.owner": ownerId })
    .populate('user', 'username email phone') // Populate user details
    .populate({
      path: 'property',
      populate: {
        path: 'owner',
        select: 'username email phone', // Select only the required fields
        },
    });
    return bookings;
}

