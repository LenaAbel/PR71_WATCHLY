const express = require('express');
const router = express.Router();
const genreController = require('../controllers/genre_controller');

// GET all genre
router.get('/', genreController.getAllGenre);

// GET one genre by ID
router.get('/:id', genreController.getGenreById);


module.exports = router;
