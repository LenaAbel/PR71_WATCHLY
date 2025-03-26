const express = require('express');
const router = express.Router();
const showsController = require('../controllers/shows_controller');

// GET all shows
router.get('/', showsController.getAll);

// GET only movies
router.get('/movies', showsController.getMovies); // important à mettre AVANT l'id parce que express est bete

// GET only TV shows
router.get('/tv', showsController.getTV);


// GET one show by ID
router.get('/:id', showsController.getById);


module.exports = router;
