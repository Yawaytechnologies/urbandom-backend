import express from 'express';
import {
  createPropertyController,
  getAllPropertiesController,
  getPropertyByIdController,
  deletePropertyController,
  updatePropertyController,
  propertySearchController,
  propertieslookingToController,
  propertyTypeFilterController
} from './property.controller.js';

const router = express.Router();


/**
 * @swagger
 * components:
 *   schemas:
 *     Property:
 *       type: object
 *       required:
 *         - title
 *         - propertyType
 *         - lookingTo
 *         - location
 *       properties:
 *         title:
 *           type: string
 *         propertyType:
 *           type: string
 *           enum: [residential, commercial]
 *         lookingTo:
 *           type: string
 *           enum: [rent, sell, pg-co/living]
 *         subProperty:
 *           type: string
 *           enum: [1BHK, 2BHK, 3BHK, office, shop, warehouse]
 *         location:
 *           type: string
 *           description: MongoDB ObjectId referring to Location
 *         builtUpArea:
 *           type: number
 *         areaUnit:
 *           type: string
 *           enum: [sqft, sqmt, acre, gaj, cent, hectare]
 *         amenities:
 *           type: array
 *           items:
 *             type: string
 *         priceDetails:
 *           type: object
 *           properties:
 *             monthlyRent:
 *               type: number
 *             amount:
 *               type: number
 *             availableDate:
 *               type: string
 *               format: date
 *             securityDeposit:
 *               type: number
 *             constructionStatus:
 *               type: string
 *               enum: [ready-to-move, under-construction]
 *         possessionInfo:
 *           type: string
 *           enum: [ready-to-move, under-construction]
 *         ownership:
 *           type: string
 *           enum: [freehold, leasehold, cooperative society, power of attorney]
 *         totalFloors:
 *           type: number
 *         yourFloor:
 *           type: number
 *         pgDetails:
 *           type: object
 *           properties:
 *             pgName:
 *               type: string
 *             totalBeds:
 *               type: number
 *             pgFor:
 *               type: string
 *               enum: [girls, boys]
 *             suitedFor:
 *               type: string
 *               enum: [students, professionals, both]
 *             mealsAvailable:
 *               type: boolean
 *             mealsOffering:
 *               type: object
 *               properties:
 *                 breakfast:
 *                   type: boolean
 *                 lunch:
 *                   type: boolean
 *                 dinner:
 *                   type: boolean
 *             noticePeriod:
 *               type: string
 *             commonAreas:
 *               type: array
 *               items:
 *                 type: string
 *             roomDetails:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   roomType:
 *                     type: string
 *                     enum: [private, double-sharing, triple-sharing]
 *                   rent:
 *                     type: number
 *         media:
 *           type: object
 *           properties:
 *             images:
 *               type: array
 *               items:
 *                 type: string
 *             videos:
 *               type: array
 *               items:
 *                 type: string
 *             documents:
 *               type: array
 *               items:
 *                 type: string
 *         createdAt:
 *           type: string
 *           format: date-time
 */


/**
 * @swagger
 * tags:
 *   name: Properties
 *   description: Property management APIs
 */

/**
 * @swagger
 * /property:
 *   post:
 *     summary: Create a new property
 *     tags: [Properties]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Property'
 *     responses:
 *       201:
 *         description: Property created successfully
 *       400:
 *         description: Bad request
 */
router.post('/', createPropertyController);

/**
 * @swagger
 * /property:
 *   get:
 *     summary: Get all properties
 *     tags: [Properties]
 *     responses:
 *       200:
 *         description: List of all properties
 */
router.get('/', getAllPropertiesController);

/**
 * @swagger
 * /property/search/property:
 *   get:
 *     summary: Search properties by location filters (location, district, state, country)
 *     tags: [Properties]
 *     parameters:
 *       - in: query
 *         name: location
 *         schema:
 *           type: string
 *       - in: query
 *         name: district
 *         schema:
 *           type: string
 *       - in: query
 *         name: state
 *         schema:
 *           type: string
 *       - in: query
 *         name: country
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of filtered properties
 */
router.get('/search/property', propertySearchController);

/**
 * @swagger
 * /property/lookingTo:
 *   get:
 *     summary: Filter properties by 'lookingTo' (rent, sell, pg-co/living)
 *     tags: [Properties]
 *     parameters:
 *       - in: query
 *         name: lookingTo
 *         schema:
 *           type: string
 *           enum: [rent, sell, pg-co/living]
 *         required: true
 *     responses:
 *       200:
 *         description: Filtered properties
 *       400:
 *         description: Missing or invalid filter
 */
router.get('/lookingTo', propertieslookingToController);

/**
 * @swagger
 * /property/type:
 *   get:
 *     summary: Filter properties by property type (residential, commercial)
 *     tags: [Properties]
 *     parameters:
 *       - in: query
 *         name: propertyType
 *         schema:
 *           type: string
 *           enum: [residential, commercial]
 *         required: true
 *     responses:
 *       200:
 *         description: Filtered properties
 */
router.get('/type', propertyTypeFilterController);

/**
 * @swagger
 * /property/{id}:
 *   get:
 *     summary: Get a property by ID
 *     tags: [Properties]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Property data
 *       404:
 *         description: Property not found
 */
router.get('/:id', getPropertyByIdController);

/**
 * @swagger
 * /property/{id}:
 *   put:
 *     summary: Update a property by ID
 *     tags: [Properties]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Property'
 *     responses:
 *       200:
 *         description: Property updated
 */
router.put('/:id', updatePropertyController);

/**
 * @swagger
 * /property/{id}:
 *   delete:
 *     summary: Delete a property by ID
 *     tags: [Properties]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Property deleted
 */
router.delete('/:id', deletePropertyController);

export default router;
