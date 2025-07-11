import express from "express";
import { createUser,  loginUser ,getUserProfile,getAllUsers, updateUser,deleteUser  } from "./user.controller.js";

import { verifyToken } from "../../middlewares/jwtauth.js";
import { singleUpload } from "../../middlewares/multerMiddleware.js";

const router = express.Router();




/**
 * @swagger

 * api/user/create:
 *   post:
 *      
 *     summary: Create a new user
 *     tags: [User]
 *     description: Create a new user, including username, email, password, and optional profile image upload.
 *     consumes:
 *       - multipart/form-data
 *     parameters:
 *       - in: formData
 *         name: username
 *         type: string
 *         required: true
 *         description: The username of the user.
 *       - in: formData
 *         name: email
 *         type: string
 *         required: true
 *         description: The email of the user.
 *       - in: formData
 *         name: userPassword
 *         type: string
 *         required: true
 *         description: The password for the user.
 *       - in: formData
 *         name: phone
 *         type: string
 *         required: true
 *         description: The phone number of the user.
 *       - in: formData
 *         name: firstName
 *         type: string
 *         required: true
 *         description: The first name of the user.
 *       - in: formData
 *         name: lastName
 *         type: string
 *         required: true
 *         description: The last name of the user.
 *       - in: formData
 *         name: userProfile
 *         type: file
 *         required: false
 *         description: The profile image of the user.
 *     responses:
 *       201:
 *         description: User successfully registered.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User registered successfully
 *                 token:
 *                   type: string
 *                   example: eyJhbGciOi...
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: 64f6ab...
 *                     username:
 *                       type: string
 *                       example: john
 *                     email:
 *                       type: string
 *                       example: john@example.com
 *                     phone:
 *                       type: string
 *                       example: 9876543210
 *                     firstName:
 *                       type: string
 *                       example: John
 *                     lastName:
 *                       type: string
 *                       example: Doe
 *                     userProfile:
 *                       type: string
 *                       example: data:image/jpeg;base64,/9j/4AAQSkZJRgABA...
 *       400:
 *         description: Error registering user.
 *      
 *         
 */

router.post('/create', singleUpload, createUser );

/**
 * @swagger
 *
 * api/user/login:
 *   post:
 *     summary: Login a user
 *     tags: [User]
 *     description: Authenticates a user by email and password and returns a JWT token and user profile information.
 *     consumes:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: login
 *         description: The user's email and password for authentication
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             email:
 *               type: string
 *               example: "john@example.com"
 *               description: The email of the user.
 *             userPassword:
 *               type: string
 *               example: "securePassword123"
 *               description: The password of the user.
 *     responses:
 *       200:
 *         description: User logged in successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User logged in successfully"
 *                 token:
 *                   type: string
 *                   example: "eyJhbGciOi...yourJWTtoken..."
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "60b6b3e4f6c7587db5f5e42b"
 *                     username:
 *                       type: string
 *                       example: "johnDoe"
 *                     email:
 *                       type: string
 *                       example: "john@example.com"
 *                     phone:
 *                       type: string
 *                       example: "9876543210"
 *                     firstName:
 *                       type: string
 *                       example: "John"
 *                     lastName:
 *                       type: string
 *                       example: "Doe"
 *                     userProfile:
 *                       type: string
 *                       example: "data:image/jpeg;base64,/9j/4AAQSkZJRgABA..."  # Base64 string for the profile image (optional)
 *       400:
 *         description: Invalid email or password
 *       500:
 *         description: Internal server error
 */


 
 // Added singleUpload middleware for file upload
 router.post('/login', loginUser  ); // Removed verifyToken as it’s unlikely needed for login

/**
 * @swagger
 *
 * api/user/profile/{id}:
 *   get:
 *     summary: Get user profile
 *     tags: [User]
 *     description: Fetch the authenticated user's profile based on their token.
 *     security:
 *       - BearerAuth: []  # This assumes you're using JWT for authentication
 *     responses:
 *       200:
 *         description: Successfully fetched the user's profile
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User profile fetched successfully"
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "60b6b3e4f6c7587db5f5e42b"
 *                     username:
 *                       type: string
 *                       example: "johnDoe"
 *                     email:
 *                       type: string
 *                       example: "john@example.com"
 *                     phone:
 *                       type: string
 *                       example: "9876543210"
 *                     firstName:
 *                       type: string
 *                       example: "John"
 *                     lastName:
 *                       type: string
 *                       example: "Doe"
 *                     userProfile:
 *                       type: string
 *                       example: "data:image/jpeg;base64,/9j/4AAQSkZJRgABA..."  # Base64 string for profile image (optional)
 *       401:
 *         description: Unauthorized, invalid or missing token
 *       500:
 *         description: Internal server error
 */


router.get('/profile/:id', verifyToken,singleUpload, getUserProfile);

/**
 * @swagger
 *
 * api/user/users:
 *   get:
 *     summary: Get all users
 *     tags: [User]
 *     description: Fetch all users in the system. This requires admin privileges or an authenticated user with the proper role.
 *     security:
 *       - BearerAuth: []  # This assumes you're using JWT for authentication
 *     responses:
 *       200:
 *         description: Successfully fetched all users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     example: "60b6b3e4f6c7587db5f5e42b"
 *                   username:
 *                     type: string
 *                     example: "johnDoe"
 *                   email:
 *                     type: string
 *                     example: "john@example.com"
 *                   phone:
 *                     type: string
 *                     example: "9876543210"
 *                   firstName:
 *                     type: string
 *                     example: "John"
 *                   lastName:
 *                     type: string
 *                     example: "Doe"
 *                   userProfile:
 *                     type: string
 *                     example: "data:image/jpeg;base64,/9j/4AAQSkZJRgABA..."  # Base64 string for profile image (optional)
 *       401:
 *         description: Unauthorized, invalid or missing token
 *       500:
 *         description: Internal server error
 */
router.get('/users', verifyToken, singleUpload,getAllUsers);

/**
 * @swagger
 *
 * api/user/update/{id}:
 *   put:
 *     summary: Update user profile
 *     tags: [User]
 *     description: Update the user's profile, including the username, email, password, phone, and optional profile image.
 *     security:
 *       - BearerAuth: []  # This assumes you're using JWT for authentication
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the user to update.
 *         schema:
 *           type: string
 *           example: "60b6b3e4f6c7587db5f5e42b"
 *       - in: formData
 *         name: username
 *         type: string
 *         required: false
 *         description: The updated username of the user.
 *       - in: formData
 *         name: email
 *         type: string
 *         required: false
 *         description: The updated email of the user.
 *       - in: formData
 *         name: userPassword
 *         type: string
 *         required: false
 *         description: The updated password for the user.
 *       - in: formData
 *         name: phone
 *         type: string
 *         required: false
 *         description: The updated phone number of the user.
 *       - in: formData
 *         name: firstName
 *         type: string
 *         required: false
 *         description: The updated first name of the user.
 *       - in: formData
 *         name: lastName
 *         type: string
 *         required: false
 *         description: The updated last name of the user.
 *       - in: formData
 *         name: userProfile
 *         type: file
 *         required: false
 *         description: The updated profile image of the user (optional).
 *     responses:
 *       200:
 *         description: User profile updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User updated successfully"
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "60b6b3e4f6c7587db5f5e42b"
 *                     username:
 *                       type: string
 *                       example: "newUsername"
 *                     email:
 *                       type: string
 *                       example: "newemail@example.com"
 *                     phone:
 *                       type: string
 *                       example: "1234567890"
 *                     firstName:
 *                       type: string
 *                       example: "John"
 *                     lastName:
 *                       type: string
 *                       example: "Doe"
 *                     userProfile:
 *                       type: string
 *                       example: "data:image/jpeg;base64,/9j/4AAQSkZJRgABA..."  # Optional Base64 string for profile image
 *       400:
 *         description: Bad Request, invalid input
 *       401:
 *         description: Unauthorized, invalid or missing token
 *       500:
 *         description: Internal server error
 */


router.put('/update/:id', singleUpload,verifyToken, updateUser);

/**
 * @swagger
 *
 * api/user/delete/{id}:
 *   delete:
 *     summary: Delete a user profile
 *     tags: [User]
 *     description: Deletes the user profile based on the provided user ID. This action requires authentication.
 *     security:
 *       - BearerAuth: []  # This assumes you're using JWT for authentication
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the user to delete.
 *         schema:
 *           type: string
 *           example: "60b6b3e4f6c7587db5f5e42b"
 *     responses:
 *       200:
 *         description: User profile deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User deleted successfully"
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "60b6b3e4f6c7587db5f5e42b"
 *                     username:
 *                       type: string
 *                       example: "johnDoe"
 *                     email:
 *                       type: string
 *                       example: "john@example.com"
 *                     phone:
 *                       type: string
 *                       example: "9876543210"
 *                     firstName:
 *                       type: string
 *                       example: "John"
 *                     lastName:
 *                       type: string
 *                       example: "Doe"
 *                     userProfile:
 *                       type: string
 *                       example: "data:image/jpeg;base64,/9j/4AAQSkZJRgABA..."  # Base64 string for profile image (optional)
 *       401:
 *         description: Unauthorized, invalid or missing token
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */



router.delete('/delete/:id', verifyToken,singleUpload, deleteUser); 

router.get('/verify', verifyToken); 
const routeuser = router;
export default routeuser;
   