import express from "express";
import{
    createLocationController,
    getAllLocationsController,
    getLocationByIdController,
    updateLocationController,
    deleteLocationController,
    getLocationsByDistrictIdController
} from "./location.controller.js";

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Location:
 *       type: object
 *       required:
 *         - name
 *         - district
 *       properties:
 *         _id:
 *           type: string
 *           example: 60f7adf4f0a123abc4567890
 *         name:
 *           type: string
 *           example: Ekkatuthangal
 *         district:
 *           type: string
 *           description: District ObjectId
 *           example: 60f7ac91f0a123abc4567890
 *         createdAt:
 *           type: string
 *           format: date-time
 */

/**
 * @swagger
 * tags:
 *   name: Location
 *   description: API for managing locations
 */
/**
 * @swagger
 * /location:
 *   post:
 *     summary: Create a new location
 *     tags: [Location]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Location'
 *     responses:
 *       201:
 *         description: Location created successfully
 *       400:
 *         description: Bad request
 */

/**
 * @swagger
 * /location:
 *   get:
 *     summary: Get all locations
 *     tags: [Location]
 *     responses:
 *       200:
 *         description: List of all locations
 */

/**
 * @swagger
 * /location/{id}:
 *   get:
 *     summary: Get a location by ID
 *     tags: [Location]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the location to retrieve
 *     responses:
 *       200:
 *         description: Location found
 *       404:
 *         description: Location not found
 */

/**
 * @swagger
 * /location/{id}:
 *   put:
 *     summary: Update a location by ID
 *     tags: [Location]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the location to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Location'
 *     responses:
 *       200:
 *         description: Location updated successfully
 *       404:
 *         description: Location not found
 */

/** * @swagger
 * /location/{id}:
 *   delete:
 *     summary: Delete a location by ID
 *     tags: [Location]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the location to delete
 *     responses:
 *       200:
 *         description: Location deleted successfully
 *       404:
 *         description: Location not found
 */
/**
 * @swagger
 * /location/district/{districtId}:
 *   get:
 *     summary: Get locations by district ID
 *     tags: [Location]
 *     parameters:
 *       - in: path
 *         name: districtId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the district to filter locations by
 *     responses:
 *       200:
 *         description: List of locations in the specified district
 */



// Route to create a new location
router.post("/", createLocationController); 
// Route to get all locations
router.get("/", getAllLocationsController);
// Route to get a location by ID
router.get("/:id", getLocationByIdController);
// Route to update a location by ID
router.put("/:id", updateLocationController);
// Route to delete a location by ID
router.delete("/:id", deleteLocationController);
// Route to get locations by district ID
router.get("/district/:districtId", getLocationsByDistrictIdController);

export default router;