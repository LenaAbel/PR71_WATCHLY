const express = require('express');
const router = express.Router();
const episodeController = require('../controllers/episode_controller');

// Get all episodes for a show
router.get('/:showId/episodes', episodeController.getEpisodesByShow);

// Get all episodes for a given season
router.get('/:showId/season/:season/episodes', episodeController.getEpisodesBySeason);

// Get all seasons for a show
router.get('/:showId/seasons', episodeController.getSeasonsByShow);

module.exports = router;
