import { createStateController, getAllStatesController, getStateByIdController, updateStateController, deleteStateController, getStatesByCountryIdController } from "./state.controller.js";
import express from "express";

const router = express.Router();
/**
 * @swagger
 * components:
 *   schemas:
 *     State:
 *       type: object
 *       required:
 *         - name
 *         - country
 *       properties:
 *         _id:
 *           type: string
 *           example: 60f7adf4f0a123abc4567890
 *         name:
 *           type: string
 *           example: Tamil Nadu
 *         country:
 *           type: string
 *           description: Country ObjectId
 *           example: 60f7ac91f0a123abc4567890
 *         createdAt:
 *           type: string
 *           format: date-time
 */
/**
 * @swagger
 * tags:
 *   name: State
 *   description: API for managing states
 */
/**
 * @swagger
 * /state:
 *   post:
 *     summary: Create a new state
 *     tags: [State]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/State'
 *     responses:
 *       201:
 *         description: State created successfully
 *       400:
 *         description: Bad request
 */
/**
 * @swagger
 * /state:
 *   get:
 *     summary: Get all states
 *     tags: [State]
 *     responses:
 *       200:
 *         description: List of all states
 */
/**
 * @swagger
 * /state/{id}:
 *   get:
 *     summary: Get a state by ID
 *     tags: [State]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The state ID
 *     responses:
 *       200:
 *         description: State details
 *       404:
 *         description: State not found
 */
/**
 * @swagger
 * /state/{id}:
 *   put:
 *     summary: Update a state by ID
 *     tags: [State]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The state ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/State'
 *     responses:
 *       200:
 *         description: State updated successfully
 *       400:
 *         description: Bad request
 */
/**
 * @swagger
 * /state/{id}:
 *   delete:
 *     summary: Delete a state by ID
 *     tags: [State]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The state ID
 *     responses:
 *       200:
 *         description: State deleted successfully
 *       404:
 *         description: State not found
 */
/**
 * @swagger
 * /state/country/{countryId}:
 *   get:
 *     summary: Get states by country ID
 *     tags: [State]
 *     parameters:
 *       - in: path
 *         name: countryId
 *         required: true
 *         schema:
 *           type: string
 *         description: The country ID
 *     responses:
 *       200:
 *         description: List of states for the specified country
 */  

// Route to create a new state
router.post("/", createStateController);
// Route to get all states
router.get("/", getAllStatesController);
// Route to get a state by ID
router.get("/:id", getStateByIdController);
// Route to update a state by ID    
router.put("/:id", updateStateController);
// Route to delete a state by ID
router.delete("/:id", deleteStateController);
// Route to get states by country ID
router.get("/country/:countryId", getStatesByCountryIdController);
export default router;