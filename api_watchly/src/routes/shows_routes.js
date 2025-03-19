const express = require('express');
const router = express.Router();
const showsController = require('../controllers/shows_controller');

// Get all shows or filtered by type and time
router.get('/', showsController.getShows);

// Get trending shows
router.get('/trending', showsController.getTrendingShows);

module.exports = router;
