const express = require('express');
const router = express.Router();
const commentController = require('../controllers/comment_controller');

/**
 * @swagger
 * /api/comments:
 *   get:
 *     summary: Get all comments
 */
router.get('/', commentController.getAll);

/**
 * @swagger
 * /api/comments/show/{showId}:
 *   get:
 *     summary: Get comments by show ID
 */
router.get('/show/:showId', commentController.getByShow);

/**
 * @swagger
 * /api/comments/episode/{episodeId}:
 *   get:
 *     summary: Get comments by episode ID
 */
router.get('/episode/:episodeId', commentController.getByEpisode);

/**
 * @swagger
 * /api/comments:
 *   post:
 *     summary: Create a new comment
 */
router.post('/', commentController.create);

/**
 * @swagger
 * /api/comments/{commentId}:
 *   delete:
 *     summary: Delete a comment
 */
router.delete('/:commentId', commentController.remove);

/**
 * @swagger
 * /api/comments/user/{userId}:
 *   get:
 *     summary: Get comments by user ID
 */
router.get('/user/:userId', commentController.getByUser);

module.exports = router;
