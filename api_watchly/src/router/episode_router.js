const express = require('express');
const router = express.Router();
const episodeController = require('../controllers/episode_controller');

/**
 * @swagger
 * /api/episodes:
 * get:
 *     summary: Get an episode
 *     tags: [Episodes]
 *     parameters:
 *       - in: path
 *         name: showId
 *         schema:
 *           type: integer
 *         required: true
 *         description: Episode ID
 *     responses:
 *       200:
 *         description: The episode object
 */
router.get('/:episodeId', episodeController.getEpisodesById);

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

/**
 * @swagger
 * /api/episodes/{showId}/season/{season}/episode/{number}/pictures:
 *   get:
 *     summary: Get all pictures for a specific episode
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
 *       - in: path
 *         name: number
 *         schema:
 *           type: integer
 *         required: true
 *         description: Episode number
 *     responses:
 *       200:
 *         description: List of picture links for the episode
 */
router.get('/:showId/season/:season/episode/:number/pictures', episodeController.getPicturesByEpisode);



module.exports = router;
