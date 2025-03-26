const express = require('express');
const router = express.Router();
const episodeController = require('../controllers/episode_controller');

/**
 * @swagger
 * /api/episodes/{showId}/episodes:
 *   get:
 *     summary: Get all episodes for a show
 *     tags: [Episodes]
 *     parameters:
 *       - in: path
 *         name: showId
 *         schema:
 *           type: integer
 *         required: true
 *         description: Show ID
 *     responses:
 *       200:
 *         description: List of all episodes for the show
 */
router.get('/:showId/episodes', episodeController.getEpisodesByShow);

/**
 * @swagger
 * /api/episodes/{showId}/season/{season}/episodes:
 *   get:
 *     summary: Get all episodes for a given season
 *     tags: [Episodes]
 *     parameters:
 *       - in: path
 *         name: showId
 *         schema:
 *           type: integer
 *         required: true
 *         description: Show ID
 *       - in: path
 *         name: season
 *         schema:
 *           type: integer
 *         required: true
 *         description: Season number
 *     responses:
 *       200:
 *         description: List of episodes for the specified season
 */
router.get('/:showId/season/:season/episodes', episodeController.getEpisodesBySeason);

/**
 * @swagger
 * /api/episodes/{showId}/seasons:
 *   get:
 *     summary: Get all seasons for a show
 *     tags: [Episodes]
 *     parameters:
 *       - in: path
 *         name: showId
 *         schema:
 *           type: integer
 *         required: true
 *         description: Show ID
 *     responses:
 *       200:
 *         description: List of all seasons for the show
 */
router.get('/:showId/seasons', episodeController.getSeasonsByShow);

module.exports = router;
