import User from "../data/models/user.model.js";
import { hashPassword, comparePassword } from "../security/bcryptHandle.js";
import { generateToken } from "../middlewares/jwtauth.js";
import {
  emailValidate,
  passwordValidate,
  phoneValidate,
  nullValidator,
} from "../validatore/userValidator.js";

export const registerUserService = async (data, file) => {
  const { username, email, userPassword, phone, firstName, lastName } = data;

  // Input validation
  if (!username || !email || !userPassword || !phone || !firstName || !lastName) {
    throw new Error("All fields are required");
  }

  if (!emailValidate(email)) throw new Error("Invalid email format");
  if (!phoneValidate(phone)) throw new Error("Invalid phone number");
  if (!passwordValidate(userPassword)) throw new Error("Weak password");
  if (!nullValidator(username)) throw new Error("Invalid username");

  // Check if the user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) throw new Error("User already exists");

  // Hash the password
  const hashedPassword = await hashPassword(userPassword);

     let userProfileBase64 = null;
  if (file) {
    // Convert the file buffer to Base64 string
    userProfileBase64 = `data:${file.mimetype};base64,${file.buffer.toString('base64')}`;
  }

  
  
  

  // Create a new user
  const newUser = new User({
    username,
    email,
    userPassword: hashedPassword,
    phone,
    firstName,
    lastName,
      userProfile: file
      ? {
          data: file.buffer, // Store file as Buffer in MongoDB
          contentType: file.mimetype,
          base64: userProfileBase64, // Store Base64 string for easy retrieval
        }
      : undefined,
  });

  // Save the user to the database
  const user = await newUser.save();

  // Generate a JWT token
  const token = generateToken(user.id);

  // Return the user data and token
  return { user, token };
};

// Login user service
export const loginUserService = async ({ email, userPassword }) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("Invalid email or password");
  }

  const isMatch = await comparePassword(userPassword, user.userPassword);
  if (!isMatch) {
    throw new Error("Invalid email or password");
  }

  const token = generateToken(user.id);
  return { token, user };
};

// Get user profile service
export const getUserProfileService = async (userId) => {
  const user = await User.findById(userId).select('-userPassword');
  if (!user) {
    throw new Error('User not found');
  }
  return user;
};

// Get all users service
export const getAllUsersService = async () => {
  const users = await User.find().select('-userPassword');
  return users;
};

// Update user service
export const updateUserService = async (req, res) => {
  try {
    const { id } = req.params; // Extract user ID from URL parameter
    const updates = { ...req.body }; // Copy all updated fields

    // If a new profile picture is uploaded, add it to updates
    if (req.file) {
      updates.userProfile = {
        data: req.file.buffer, // Store the file as a Buffer
        contentType: req.file.mimetype, // Store the content type (MIME type)
      };
    }

    // Find the user by their _id and update the data
    const user = await User.findByIdAndUpdate(
      id,   // Use _id to query the document
      updates, // Apply the updates
      { new: true } // Return the updated user document
    );

    if (!user) {
      throw new Error('User not found');
    }

    return user;
  } catch (error) {
    console.error('Error in updateUserService:', error);
    throw error;  // Propagate error to be handled by the controller
  }
};

// Delete user service
export const deleteUserService = async (username) => {
  const user = await User.findOneAndDelete({ username });
  if (!user) {
    throw new Error('User not found');
  }
};