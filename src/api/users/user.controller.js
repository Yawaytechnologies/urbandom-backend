 import User from "../../data/models/user.model.js";
/*import { hashPassword, comparePassword } from "./../../security/bcryptHandle.js";
import { generateToken , verifyToken} from "./../../config/jwtauth.js";
import {emailValidate, passwordValidate, phoneValidate, nullValidator  } from "./../../validatore/userValidator.js";
import express from "express";
import jwt from "jsonwebtoken";

const router = express.Router();
import { welcomeEmailTemplate } from './../../utils/templates.js';
 */
//




import {
  registerUserService,
  loginUserService,
  getUserProfileService,
  getAllUsersService,
  updateUserService,
  deleteUserService 
} from '../../service/user.service.js';

// Register user
export const createUser = async (req, res) => {
  try {

    const { username, email, userPassword, phone, firstName, lastName } = req.body;
    if (!username || !email || !userPassword || !phone || !firstName || !lastName) {
      return res.status(400).json({ message: "All fields are required" });
    }
    // Pass form data and file to the service for user creation
    const { user, token } = await registerUserService(req.body, req.file);

     let userProfileBase64 = null;
    if (user.userProfile?.data && user.userProfile?.contentType) {
      userProfileBase64 = `data:${user.userProfile.contentType};base64,${user.userProfile.data.toString("base64")}`;
    }
    

    // Send response with user data and token
    res.status(201).json({
      message: "User registered successfully",
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        phone: user.phone,
        firstName: user.firstName,
        lastName: user.lastName,
        userProfile: userProfileBase64, // Return Base64 image
      },
    });
  } catch (error) {
    console.error("Error during user registration:", error);
    res.status(400).json({ message: error.message || "Error during registration" });
  }
};

// Login user
export const loginUser = async (req, res) => {
  try {
    const {  user,token } = await loginUserService(req.body);

    res.status(200).json({
      message: 'User logged in successfully',
      token,
      user: {
        id: user.id,
        username: user.username,
        phone: user.phone,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        userProfile: user.userProfile,
      }
    });
  } catch (error) {
    console.error("Error logging in user:", error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Get user profile
export const getUserProfile = async (req, res) => {
  try {
    const user = await getUserProfileService(req.params.id);
    res.status(200).json({ user });
  } catch (error) {
    // Log the full error for debugging
    console.error('Error fetching user profile:', error);

    // Return a generic error message
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Get all users
export const getAllUsers = async (req, res) => {
  try {
    const users = await getAllUsersService();
    res.status(200).json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Update user
export const updateUser = async (req, res) => {
  try {
    // Log incoming data for debugging
    console.log('Updated Data:', req.body);  // Should log updated fields (e.g., username, email)
    console.log('File:', req.file);  // Should log the uploaded file (if any)

    const { id } = req.params;  // Get userId from the URL
    const updatedData = req.body; // Extract updated fields (like username, email) from the body
    const file = req.file;  // Get the uploaded file (if any)

    // Call the service to update the user profile, passing both updatedData and file
    const updatedUser = await updateUserService(id, updatedData, file);

    // Send a response with the updated user data
    res.status(200).json({
      message: 'User updated successfully',
      user: updatedUser,  // Return the updated user data
    });
  } catch (error) {
    console.error('Error updating user profile:', error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

// Delete user
export const deleteUser = async (req, res) => {
  try {
    const id = req.params;
    await deleteUserService(req,res);
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
