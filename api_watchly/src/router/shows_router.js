const express = require('express');
const router = express.Router();
const showsController = require('../controllers/shows_controller');

/**
 * @swagger
 * /api/shows:
 *   get:
 *     summary: Get all shows
 *     tags: [Shows]
 *     responses:
 *       200:
 *         description: List of all shows
 */
router.get('/', showsController.getAll);

/**
 * @swagger
 * /api/shows/movies:
 *   get:
 *     summary: Get all movies
 *     tags: [Shows]
 *     responses:
 *       200:
 *         description: List of all movies
 */
router.get('/movies', showsController.getMovies);

/**
 * @swagger
 * /api/shows/tv:
 *   get:
 *     summary: Get all TV shows
 *     tags: [Shows]
 *     responses:
 *       200:
 *         description: List of all TV shows
 */
router.get('/tv', showsController.getTV);

/**
 * @swagger
 * /api/shows/search:
 *   get:
 *     summary: Search for shows
 *     tags: [Shows]
 *     parameters:
 *       - in: query
 *         name: query
 *         schema:
 *           type: string
 *         required: true
 *         description: Search query
 *     responses:
 *       200:
 *         description: Search results
 *       400:
 *         description: Invalid query
 */
router.get('/search', showsController.search);

/**
 * @swagger
 * /api/shows/{id}:
 *   get:
 *     summary: Get a show by ID
 *     tags: [Shows]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Show ID
 *     responses:
 *       200:
 *         description: Show details
 *       404:
 *         description: Show not found
 */
router.get('/:id', showsController.getById);

/**
 * @swagger
 * /api/shows/{id}/trailer:
 *   get:
 *     summary: Get the trailer of a show by ID
 *     tags: [Shows]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Show ID
 *     responses:
 *       200:
 *         description: Trailer details
 *       404:
 *         description: Trailer not found
 */
router.get("/:id/trailer", showsController.getTrailer);



module.exports = router;
