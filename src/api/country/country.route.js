import { createCountryController, getAllCountriesController, getCountryByIdController, updateCountryController, deleteCountryController } from "./country.controller.js";
import express from "express";

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Country:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         _id:
 *           type: string
 *           example: 60f7adf4f0a123abc4567890
 *         name:
 *           type: string
 *           example: India
 *         createdAt:
 *           type: string
 *           format: date-time
 */
/**
 * @swagger
 * tags:
 *   name: Country
 *   description: API for managing countries
 */
/**
 * @swagger
 * /country:
 *   post:
 *     summary: Create a new country
 *     tags: [Country]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Country'
 *     responses:
 *       201:
 *         description: Country created successfully
 *       400:
 *         description: Bad request
 */
/**
 * @swagger
 * /country:
 *   get:
 *     summary: Get all countries
 *     tags: [Country]
 *     responses:
 *       200:
 *         description: List of all countries
 */
/**
 * @swagger
 * /country/{id}:
 *   get:
 *     summary: Get a country by ID
 *     tags: [Country]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The country ID
 *     responses:
 *       200:
 *         description: Country details
 *       404:
 *         description: Country not found
 */
/**
 * @swagger
 * /country/{id}:
 *   put:
 *     summary: Update a country by ID
 *     tags: [Country]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The country ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Country'
 *     responses:
 *       200:
 *         description: Country updated successfully
 *       400:
 *         description: Bad request
 */
/**
 * @swagger
 * /country/{id}:
 *   delete:
 *     summary: Delete a country by ID
 *     tags: [Country]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The country ID
 *     responses:
 *       200:
 *         description: Country deleted successfully
 *       404:
 *         description: Country not found
 */


// Route to create a new country
router.post("/", createCountryController);
// Route to get all countries
router.get("/", getAllCountriesController);
// Route to get a country by ID
router.get("/:id", getCountryByIdController);
// Route to update a country by ID
router.put("/:id", updateCountryController);
// Route to delete a country by ID
router.delete("/:id", deleteCountryController);

export default router;