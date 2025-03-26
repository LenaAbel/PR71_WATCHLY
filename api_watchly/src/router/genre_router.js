const express = require('express');
const router = express.Router();
const genreController = require('../controllers/genre_controller');

/**
 * @swagger
 * /api/genres:
 *   get:
 *     summary: Get all genres
 *     tags: [Genres]
 *     responses:
 *       200:
 *         description: List of all genres
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   name:
 *                     type: string
 */
router.get('/', genreController.getAllGenre);

/**
 * @swagger
 * /api/genres/{id}:
 *   get:
 *     summary: Get genre by ID
 *     tags: [Genres]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the genre
 *     responses:
 *       200:
 *         description: Genre details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 name:
 *                   type: string
 *       404:
 *         description: Genre not found
 */
router.get('/:id', genreController.getGenreById);

// Make sure the export is correct
module.exports = router;  // NOT module.exports = { router }
