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

 
 // Added singleUpload middleware for file upload
 router.post('/login', loginUser  ); // Removed verifyToken as it’s unlikely needed for login




router.get('/profile/:id', verifyToken,singleUpload, getUserProfile);
router.get('/users', verifyToken, singleUpload,getAllUsers);
router.put('/update/:id', singleUpload,verifyToken, updateUser);
router.delete('/delete/:id', verifyToken,singleUpload, deleteUser); 
router.get('/verify', verifyToken); 
const routeuser = router;
export default routeuser;
   