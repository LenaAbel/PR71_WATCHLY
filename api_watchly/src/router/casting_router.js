const express = require('express');
const router = express.Router();
const castingController = require('../controllers/casting_controller');

// GET all castings
router.get('/', castingController.getAll);

// GET casting by ID
router.get('/:id', castingController.getById);

// Get only actors by show ID
router.get('/show/:id/actors', castingController.getActorsByShowId);

// Get full casting by show ID
router.get('/show/:id/full', castingController.getFullCastingByShowId);

module.exports = router;
