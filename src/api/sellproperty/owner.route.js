import express from "express";
import {
  LoginOwner,
  RegisterOwner,
  UpdateOwner,
  deleteOwner,
} from "./owner.controller.js";

import { verifyToken } from "../../middlewares/jwtauth.js";
import { singleUpload } from "../../middlewares/multerMiddleware.js";
import Owner from "../../data/models/owner.model.js";

const router = express.Router();

/**
 * @swagger
 * /api/owner/register:
 *   post:
 *     summary: Register a new owner
 *     tags: [Owner]
 *     description: Register a new owner with userId, phone, email, password, and optional profile image.
 *     consumes:
 *       - multipart/form-data
 *     parameters:
 *       - in: formData
 *         name: userId
 *         type: string
 *         required: true
 *       - in: formData
 *         name: phone
 *         type: string
 *         required: true
 *       - in: formData
 *         name: email
 *         type: string
 *         required: true
 *       - in: formData
 *         name: password
 *         type: string
 *         required: true
 *       - in: formData
 *         name: type
 *         type: string
 *         required: true
 *         enum: [owner]
 *       - in: formData
 *         name: userProfile
 *         type: file
 *         required: false
 *     responses:
 *       201:
 *         description: Owner registered successfully
 *       400:
 *         description: Validation error or user already exists
 */
router.post("/register", singleUpload, RegisterOwner);

/**
 * @swagger
 * api/owner/login:
 *   post:
 *     summary: Login an owner using phone number and password
 *     description: This endpoint allows owners to log in using their phone number and password.
 *     operationId: loginOwner
 *     tags:
 *       - Owner
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               phone:
 *                 type: string
 *                 example: "1234567890"
 *               password:
 *                 type: string
 *                 example: "password123"
 *     responses:
 *       200:
 *         description: Successfully logged in
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Login successful"
 *                 token:
 *                   type: string
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *                 owner:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "60c72b2f9f1b2c001f123456"
 *                     userId:
 *                       type: string
 *                       example: "owner123"
 *                     email:
 *                       type: string
 *                       example: "owner@example.com"
 *                     phone:
 *                       type: string
 *                       example: "1234567890"
 *                     type:
 *                       type: string
 *                       example: "owner"
 *                     userProfile:
 *                       type: string
 *                       example: "data:image/png;base64,..."
 *       400:
 *         description: Bad request, missing phone or password
 *       401:
 *         description: Unauthorized, invalid phone or password
 */

router.post("/login",  LoginOwner);

/**
 * @swagger
 * /owner/{ownerId}:
 *   put:
 *     summary: Update owner details
 *     description: Updates an owner's email, phone, password, type, or profile image using multipart/form-data.
 *     tags:
 *       - Owner
 *     parameters:
 *       - in: path
 *         name: ownerId
 *         required: true
 *         description: The ID of the owner to update.
 *         schema:
 *           type: string
 *           example: 64e2e765c13c8a50f826af33
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: updatedemail@example.com
 *               phone:
 *                 type: string
 *                 example: "9876543210"
 *               password:
 *                 type: string
 *                 example: "newStrongPassword123"
 *               type:
 *                 type: string
 *                 example: builder
 *               userProfile:
 *                 type: string
 *                 format: binary
 *                 description: Optional image file for the owner's profile
 *     responses:
 *       200:
 *         description: Owner updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Owner updated successfully
 *                 owner:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: 64e2e765c13c8a50f826af33
 *                     userId:
 *                       type: string
 *                       example: owner123
 *                     email:
 *                       type: string
 *                       example: updatedemail@example.com
 *                     phone:
 *                       type: string
 *                       example: "9876543210"
 *                     type:
 *                       type: string
 *                       example: builder
 *                     userProfile:
 *                       type: string
 *                       example: data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA...
 *       400:
 *         description: Validation error or invalid input
 *       404:
 *         description: Owner not found
 */

router.put("/update/:ownerId",singleUpload,UpdateOwner) 

/**
 * @swagger
 * /owner/{ownerId}:
 *   delete:
 *     summary: Delete an owner
 *     description: Deletes an owner by their unique ID.
 *     tags:
 *       - Owner
 *     parameters:
 *       - in: path
 *         name: ownerId
 *         required: true
 *         description: The ID of the owner to delete.
 *         schema:
 *           type: string
 *           example: 64e2e765c13c8a50f826af33
 *     responses:
 *       200:
 *         description: Owner deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Owner deleted successfully
 *                 ownerId:
 *                   type: string
 *                   example: 64e2e765c13c8a50f826af33
 *       400:
 *         description: Invalid owner ID or deletion error
 *       404:
 *         description: Owner not found
 */

router.delete("/:ownerId",deleteOwner);


const Ownerroutes = router

export default Ownerroutes;