const adminServices = require('../services/admin_services');
const Comments = require('../../database/src/models/comments');

/**
 * Get system-wide statistics for admin dashboard
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
async function getStatistics(req, res) {
    try {
        // Check if user is admin
        if (!req.user || !req.user.is_admin) {
            return res.status(403).json({ message: 'Unauthorized: Admin access required' });
        }

        const stats = await adminServices.collectStatistics();
        res.status(200).json(stats);
    } catch (error) {
        console.error('Error fetching admin statistics:', error);
        res.status(500).json({ 
            message: 'Failed to fetch admin statistics',
            error: error.message
        });
    }
}

/**
 * Delete a comment as an admin
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
async function deleteComment(req, res) {
    try {
        // Check if user is admin
        if (!req.user || !req.user.is_admin) {
            return res.status(403).json({ message: 'Unauthorized: Admin access required' });
        }

        const { commentId } = req.params;
        
        // Check if comment exists
        const comment = await Comments.findByPk(commentId);
        if (!comment) {
            return res.status(404).json({ message: 'Comment not found' });
        }
        
        // Delete the comment
        await comment.destroy();
        
        res.status(200).json({ message: 'Comment deleted successfully' });
    } catch (error) {
        console.error('Error deleting comment:', error);
        res.status(500).json({ 
            message: 'Failed to delete comment',
            error: error.message
        });
    }
}

module.exports = {
    getStatistics,
    deleteComment
};
