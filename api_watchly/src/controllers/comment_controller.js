const commentService = require('../services/comment_services');

async function getAll(req, res) {
    const comments = await commentService.getAllComments();
    res.status(200).json(comments);
}

async function getByShow(req, res) {
    const { showId } = req.params;
    const comments = await commentService.getCommentsByShowId(showId);
    res.status(200).json(comments);
}

async function getByEpisode(req, res) {
    const { episodeId } = req.params;
    const comments = await commentService.getCommentsByEpisodeId(episodeId);
    res.status(200).json(comments);
}

async function create(req, res) {
    try {
        if (!req.body.show_id || !req.body.person_id || !req.body.comment_text) {
            return res.status(400).json({ 
                error: 'Missing required fields',
                required: ['show_id', 'person_id', 'comment_text'],
                received: req.body 
            });
        }

        const newComment = await commentService.addComment(req.body);
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
        await commentService.deleteComment(req.params.commentId);
        res.status(204).send();
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

module.exports = {
    getAll,
    getByShow,
    getByEpisode,
    create,
    remove
};
