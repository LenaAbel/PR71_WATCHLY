const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin_controller');
const { verifyToken } = require('../middleware/auth_middleware');

/**
 * @swagger
 * /api/admin/statistics:
 *   get:
 *     summary: Get admin dashboard statistics
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Statistics retrieved successfully
 *       401:
 *         description: Unauthorized - invalid or missing token
 *       403:
 *         description: Forbidden - not an admin user
 *       500:
 *         description: Server error
 */
router.get('/statistics', verifyToken, adminController.getStatistics);

/**
 * @swagger
 * /api/admin/comments/{commentId}:
 *   delete:
 *     summary: Delete a comment as admin
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: commentId
 *         required: true
 *         schema:
 *           type: integer
 *         description: The comment ID
 *     responses:
 *       200:
 *         description: Comment deleted successfully
 *       401:
 *         description: Unauthorized - invalid or missing token
 *       403:
 *         description: Forbidden - not an admin user
 *       404:
 *         description: Comment not found
 *       500:
 *         description: Server error
 */
router.delete('/comments/:commentId', verifyToken, adminController.deleteComment);

module.exports = router;
