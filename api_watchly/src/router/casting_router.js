const express = require('express');
const router = express.Router();
const castingController = require('../controllers/casting_controller');

/**
 * @swagger
 * /api/casting:
 *   get:
 *     summary: Get all castings
 *     tags: [Casting]
 *     responses:
 *       200:
 *         description: List of all castings
 */
router.get('/', castingController.getAll);

/**
 * @swagger
 * /api/casting/{id}:
 *   get:
 *     summary: Get casting by ID
 *     tags: [Casting]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Casting ID
 *     responses:
 *       200:
 *         description: Casting details
 *       404:
 *         description: Casting not found
 */
router.get('/:id', castingController.getById);

/**
 * @swagger
 * /api/casting/show/{id}/actors:
 *   get:
 *     summary: Get actors by show ID
 *     tags: [Casting]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Show ID
 *     responses:
 *       200:
 *         description: List of actors for the show
 */
router.get('/show/:id/actors', castingController.getActorsByShowId);

/**
 * @swagger
 * /api/casting/show/{id}/full:
 *   get:
 *     summary: Get full casting by show ID
 *     tags: [Casting]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Show ID
 *     responses:
 *       200:
 *         description: Full casting details for the show
 */
router.get('/show/:id/full', castingController.getFullCastingByShowId);

module.exports = router;
