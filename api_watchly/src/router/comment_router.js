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
 *     description: Retrieve all comments for a specific show. If the show ID does not exist in the database, a 404 error is returned.
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: showId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the show to retrieve comments for
 *     responses:
 *       200:
 *         description: List of comments for the specified show
 *       404:
 *         description: Show not found
 *       500:
 *         description: Server error
 */
router.get('/show/:showId', commentController.getByShow);

/**
 * @swagger
 * /api/comments/episode/{episodeId}:
 *   get:
 *     summary: Get comments by episode ID
 *     description: Retrieve all comments for a specific episode. If the episode ID does not exist in the database, a 404 error is returned.
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: episodeId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the episode to retrieve comments for
 *     responses:
 *       200:
 *         description: List of comments for the specified episode
 *       404:
 *         description: Episode not found
 *       500:
 *         description: Server error
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
