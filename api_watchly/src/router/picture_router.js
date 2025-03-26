const express = require('express');
const router = express.Router();
const pictureController = require('../controllers/picture_controller');

/**
 * @swagger
 * /api/pictures:
 *   get:
 *     summary: Get all pictures
 *     tags: [Pictures]
 *     responses:
 *       200:
 *         description: List of all pictures
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   url:
 *                     type: string
 *                   showId:
 *                     type: integer
 */
router.get('/', pictureController.getAll);

/**
 * @swagger
 * /api/pictures/show/{showId}:
 *   get:
 *     summary: Get pictures by show ID
 *     tags: [Pictures]
 *     parameters:
 *       - in: path
 *         name: showId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the show
 *     responses:
 *       200:
 *         description: List of pictures for the specified show
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   url:
 *                     type: string
 *                   showId:
 *                     type: integer
 *       404:
 *         description: Show not found
 */
router.get('/show/:showId', pictureController.getByShow);

module.exports = router;
