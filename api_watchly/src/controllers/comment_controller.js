const commentService = require('../services/comment_services');

async function getAll(req, res) {
    const comments = await commentService.getAllComments();
    res.status(200).json(comments);
}

async function getByShow(req, res) {
    const { showId } = req.params;
    try {
        const comments = await commentService.getCommentsByShowId(showId);
        res.status(200).json(comments);
    } catch (error) {
        console.error('Error fetching comments by show ID:', error.message);
        res.status(404).json({ error: error.message });
    }
}

async function getByEpisode(req, res) {
    const { episodeId } = req.params;

    try {
        const comments = await commentService.getCommentsByEpisodeId(episodeId);
        res.status(200).json(comments);
    }
    catch (error) {
        console.error('Error fetching comments by episode ID:', error.message);
        res.status(404).json({ error: error.message });
    }

}

async function create(req, res) {
    try {
        // Validate required fields
        const { show_id, person_id, comment_text } = req.body;
        if (!show_id || !person_id || !comment_text) {
            return res.status(400).json({
                error: 'Missing required fields',
                required: ['show_id', 'person_id', 'comment_text'],
                received: req.body
            });
        }

        // Create comment
        const newComment = await commentService.addComment(req.body);
        
        // Send response
        res.status(201).json(newComment);
    } catch (err) {
        console.error('Error creating comment:', err);
        res.status(500).json({
            error: 'Failed to create comment',
            details: err.message
        });
    }
}

async function remove(req, res) {
    try {
        const { commentId } = req.params;
        const result = await commentService.deleteComment(commentId);
        if (!result) {
            return res.status(404).json({ error: 'Comment not found' });
        }
        res.status(204).send();
    } catch (err) {
        console.error('Error deleting comment:', err);
        res.status(500).json({ 
            error: 'Failed to delete comment',
            details: err.message 
        });
    }
}

async function getByUser(req, res) {
    try {
        const { userId } = req.params;
        const comments = await commentService.getCommentsByUserId(userId);
        res.status(200).json(comments);
    } catch (error) {
        console.error('Error getting user comments:', error);
        res.status(500).json({ error: 'Failed to fetch user comments' });
    }
}

module.exports = {
    getAll,
    getByShow,
    getByEpisode,
    create,
    remove,
    getByUser
};
