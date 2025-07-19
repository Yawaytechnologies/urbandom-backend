import Owner from "../../data/models/owner.model.js";
import { comparePassword } from "../../security/bcryptHandle.js";
import { generateToken } from "../../middlewares/jwtauth.js";
import {
  emailValidate,
  passwordValidate,
  phoneValidate,
  nullValidator,
} from "../../validatore/userValidator.js";
import { hashPassword } from "../../security/bcryptHandle.js";


export const RegisterOwner = async (req, res) => {
  try {
    const { userId, email, password, phone, type } = req.body;

    if (!userId || !email || !password || !phone || !type) {
      return res.status(400).json({ message: "All fields are required" });
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
    if (req.file) {
      userProfileBase64 = `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`;
    }

    const newOwner = new Owner({
      userId,
      email,
      type,
      phone,
      password: hashedPassword,
      userProfile: req.file
        ? {
            data: req.file.buffer,
            contentType: req.file.mimetype,
            base64: userProfileBase64,
          }
        : undefined,
    });

    const owner = await newOwner.save();

    const token = generateToken(owner._id);

    res.status(201).json({
      message: "Owner registered successfully",
      token,
      owner: {
        id: owner._id,
        userId: owner.userId,
        email: owner.email,
        phone: owner.phone,
        type: owner.type,
        userProfile: userProfileBase64, // Return Base64 image
      },
    });
  } catch (error) {
    console.error("Error during owner registration:", error);
    res.status(400).json({ message: error.message || "Error during registration" });
  }
}


// Login owner


export const LoginOwner = async (req, res) => {
  try {
    const { phone, password } = req.body;

    // Check required fields
    if (!phone || !password) {
      return res.status(400).json({ message: "phone and password are required" });
    }

    // Validate format
    if (!phoneValidate(phone)) throw new Error("Invalid phone ");
    if (!passwordValidate(password)) throw new Error("Invalid password format");

    // Find owner by phone
    const owner = await Owner.findOne({ phone });
    if (!owner) throw new Error("Owner not found");

    // Compare password
    const isMatch = await comparePassword(password, owner.password);
    if (!isMatch) throw new Error("Incorrect password");

    // Generate token
    const token = generateToken(owner._id);

    res.status(200).json({
      message: "Login successful",
      token,
      owner: {
        id: owner._id,
        userId: owner.userId,
        email: owner.email,
        phone: owner.phone,
        type: owner.type,
        userProfile: owner.userProfile?.base64 || null,
      },
    });
  } catch (error) {
    console.error("Error during owner login:", error);
    res.status(401).json({ message: error.message || "Login failed" });
  }
};




// Update Owner
export const UpdateOwner = async (req, res) => {
  try {
    const { ownerId } = req.params;
    const { email, phone, password, type } = req.body;

    if (!nullValidator(ownerId)) {
      return res.status(400).json({ message: "Invalid owner ID" });
    }

    const owner = await Owner.findById(ownerId);
    if (!owner) {
      return res.status(404).json({ message: "Owner not found" });
    }

    if (email) {
      if (!emailValidate(email)) throw new Error("Invalid email format");
      owner.email = email;
    }

    if (phone) {
      if (!phoneValidate(phone)) throw new Error("Invalid phone number");
      owner.phone = phone;
    }

    if (password) {
      if (!passwordValidate(password)) throw new Error("Weak password");
      owner.password = await hashPassword(password);
    }

    if (type) {
      if (!nullValidator(type)) throw new Error("Invalid type");
      owner.type = type;
    }

    if (req.file) {
      const base64Image = `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`;
      owner.userProfile = {
        data: req.file.buffer,
        contentType: req.file.mimetype,
        base64: base64Image,
      };
    }

    const updatedOwner = await owner.save();

    res.status(200).json({
      message: "Owner updated successfully",
      owner: {
        id: updatedOwner._id,
        userId: updatedOwner.userId,
        email: updatedOwner.email,
        phone: updatedOwner.phone,
        type: updatedOwner.type,
        userProfile: updatedOwner.userProfile?.base64 || null,
      },
    });
  } catch (error) {
    console.error("Error during owner update:", error);
    res.status(400).json({ message: error.message || "Error during update" });
  }
};




// Delete Owner
export const deleteOwner = async (req, res) => {
  try {
    const { ownerId } = req.params;

    // Validate ownerId
    if (!nullValidator(ownerId)) {
      return res.status(400).json({ message: "Invalid owner ID" });
    }

    const owner = await Owner.findById(ownerId);
    if (!owner) {
      return res.status(404).json({ message: "Owner not found" });
    }

    await Owner.findByIdAndDelete(ownerId);

    res.status(200).json({
      message: "Owner deleted successfully",
      ownerId,
    });
  } catch (error) {
    console.error("Error during owner deletion:", error);
    res.status(400).json({ message: error.message || "Error during deletion" });
  }
};
