import express from "express";
import {
  createDistrictController,
  getAllDistrictsController,
  getDistrictByIdController,
  updateDistrictController,
  deleteDistrictController,
  getDistrictsByStateIdController
} from "./district.controller.js";  

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     District:
 *       type: object
 *       required:
 *         - name
 *         - state
 *       properties:
 *         _id:
 *           type: string
 *           example: 60f7adf4f0a123abc4567890
 *         name:
 *           type: string
 *           example: Chennai
 *         state:
 *           type: string
 *           description: State ObjectId
 *           example: 60f7ac91f0a123abc4567890
 *         createdAt:
 *           type: string
 *           format: date-time
 */
/**
 * @swagger
 * tags:
 *   name: District
 *   description: API for managing districts
 */
/**
 * @swagger
 * /district:
 *   post:
 *     summary: Create a new district
 *     tags: [District]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/District'
 *     responses:
 *       201:
 *         description: District created successfully
 *       400:
 *         description: Bad request
 */
/**
 * @swagger
 * /district:
 *   get:
 *     summary: Get all districts
 *     tags: [District]
 *     responses:
 *       200:
 *         description: List of all districts
 */
/**
 * @swagger
 * /district/{id}:
 *   get:
 *     summary: Get a district by ID
 *     tags: [District]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: District ID
 *     responses:
 *       200:
 *         description: District details
 *       404:
 *         description: District not found
 */
/**
 * @swagger
 * /district/{id}:
 *   put:
 *     summary: Update a district by ID
 *     tags: [District]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: District ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/District'
 *     responses:
 *       200:
 *         description: District updated successfully
 *       400:
 *         description: Bad request
 */
/**
 * @swagger
 * /district/{id}:
 *   delete:
 *     summary: Delete a district by ID
 *     tags: [District]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: District ID
 *     responses:
 *       200:
 *         description: District deleted successfully
 *       404:
 *         description: District not found
 */
/**
 * @swagger
 * /district/state/{stateId}:
 *   get:
 *     summary: Get districts by state ID
 *     tags: [District]
 *     parameters:
 *       - in: path
 *         name: stateId
 *         required: true
 *         schema:
 *           type: string
 *         description: State ID
 *     responses:
 *       200:
 *         description: List of districts in the specified state
 */

// Route to create a new district
router.post("/", createDistrictController); 
// Route to get all districts
router.get("/", getAllDistrictsController);
// Route to get a district by ID
router.get("/:id", getDistrictByIdController);
// Route to update a district by ID
router.put("/:id", updateDistrictController);
// Route to delete a district by ID
router.delete("/:id", deleteDistrictController);
// Route to get districts by state ID
router.get("/state/:stateId", getDistrictsByStateIdController);

export default router;
