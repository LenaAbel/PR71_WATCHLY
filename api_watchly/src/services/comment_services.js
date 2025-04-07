const Show = require('../../database/src/models/shows');
const Comments = require('../../database/src/models/comments');
const Person = require('../../database/src/models/person');
const { getComments, getTmdbIdFromTitle } = require('../../database/src/tmdb/tmdb_api');
const chalk = require('chalk');

// ============================
// TMDB API Related Functions
// ============================


/**
 * Add TMDB comments to shows in the DB
 */
async function addCommentsForAllShows() {
    const shows = await Show.findAll();
    const users = await Person.findAll({ attributes: ['person_id'] });

    if (users.length === 0) {
        console.warn(chalk.yellow('⚠️ No users found to assign comments.'));
        return;
    }

    for (const show of shows) {
        const mediaType = show.is_movie ? 'movie' : 'tv';
        const tmdbId = await getTmdbIdFromTitle(show.name, mediaType);
        if (!tmdbId) continue;

        try {
            const tmdbComments = await getComments(tmdbId, mediaType);
            const reviews = tmdbComments?.results || [];

            for (const r of reviews.slice(0, 3)) { // limit to 3 comments per show
                const randomUser = users[Math.floor(Math.random() * users.length)];

                await Comments.create({
                    show_id: show.show_id,
                    person_id: randomUser.person_id,
                    comment_text: r.content, 
                    comment_date: r.created_at || new Date(),
                    is_watched: true,
                    is_spoiler: r.content.toLowerCase().includes('spoiler')
                });
            }

            console.log(chalk.green(`💬 Comments added for "${show.name}"`));
        } catch (err) {
            console.error(chalk.red(`❌ Failed to add comments for "${show.name}":`, err.message));
        }
    }

    console.log(chalk.green('✅ Comments added to all shows.'));
}

// ============================
// Database Related Functions 
// ============================

/**
 * Get all comments from the database
 * @returns {Promise<Comment[]>} - Returns all comments from the database
 */
async function getAllComments() {
    return await Comment.findAll();
}

/**
 * Get comments by show ID
 * @param {*} showId 
 * @returns 
 */
async function getCommentsByShowId(showId) {
    try {
        const showExists = await Show.findByPk(showId);
        if (!showExists) {
            throw new Error(`Show with ID ${showId} does not exist`);
        }

        // Récupère les commentaires associés au show
        const comments = await Comments.findAll({ 
            where: { show_id: showId },
            order: [['comment_date', 'DESC']],
            include: [{
                model: Person,
                as: 'person',
                attributes: ['username']
            }]
        });

        // Map output to merge username property into the comment object
        const mappedComments = comments.map(comment => {
            const plain = comment.get({ plain: true });
            plain.username = plain.person ? plain.person.username : 'Anonymous';
            return plain;
        });

        return mappedComments;
    } catch (error) {
        console.error('Error fetching comments:', error);
        throw error;
    }
}

/**
 * Get comments by episode ID
 * @param {*} episodeId 
 * @returns 
 */
async function getCommentsByEpisodeId(episodeId) {
    try {
        const episodeExists = await Episode.findByPk(episodeId); 
        if (!episodeExists) {
            throw new Error(`Episode with ID ${episodeId} does not exist`);
        }

        const comments = await Comment.findAll({ 
            where: { episode_id: episodeId },
            order: [['comment_date', 'DESC']],
            include: [{
                model: Person,
                as: 'person',
                attributes: ['username']
            }]
        });

        // Map output to merge username property into the comment object
        const mappedComments = comments.map(comment => {
            const plain = comment.get({ plain: true });
            plain.username = plain.person ? plain.person.username : 'Anonymous';
            return plain;
        });

        return mappedComments;
    } catch (error) {
        console.error('Error fetching comments by episode ID:', error.message);
        throw error;
    }
}

/**
 * Get comments by user ID
 * @param {*} userId 
 * @returns 
 */
async function getCommentsByUserId(userId) {
    try {
        const comments = await Comments.findAll({ 
            where: { person_id: userId },
            order: [['comment_date', 'DESC']],
            include: [
                {
                    model: Person,
                    as: 'person',
                    attributes: ['username']
                },
                {
                    model: Show,
                    attributes: ['name', 'show_id', 'is_movie']  
                }
            ]
        });
        
        const mappedComments = comments.map(comment => {
            const plain = comment.get({ plain: true });
            return {
                ...plain,
                username: plain.person ? plain.person.username : 'Anonymous',
                show_name: plain.Show ? plain.Show.name : 'Unknown Show',
                show_id: plain.Show ? plain.Show.show_id : null,
                is_movie: plain.Show ? plain.Show.is_movie : false
            };
        });
        return mappedComments;
    } catch (error) {
        console.error('Error fetching user comments:', error);
        throw error;
    }
}

/**
 * Add a comment
 * @param {*} data 
 * @returns 
 */
async function addComment(data) {
    try {
        // Create the comment
        const comment = await Comments.create({
            show_id: data.show_id,
            person_id: data.person_id,
            comment_text: data.comment_text,
            comment_date: data.comment_date || new Date(),
            is_watched: data.is_watched || true,
            is_spoiler: data.is_spoiler || false
        });

        // Fetch the created comment with person info
        const commentWithPerson = await Comments.findOne({
            where: { comment_id: comment.comment_id },
            include: [{
                model: Person,
                as: 'person',
                attributes: ['username']
            }]
        });

        if (!commentWithPerson) {
            throw new Error('Failed to fetch created comment');
        }

        // Format the response
        const plain = commentWithPerson.get({ plain: true });
        return {
            ...plain,
            username: plain.person ? plain.person.username : 'Anonymous'
        };
    } catch (error) {
        console.error('Error in addComment:', error);
        throw new Error(`Failed to create comment: ${error.message}`);
    }
}

/**
 * Delete a comment by ID
 * @param {*} commentId 
 * @returns 
 */
async function deleteComment(commentId) {
    try {
        const result = await Comments.destroy({ 
            where: { 
                comment_id: commentId 
            }
        });
        if (result === 0) {
            throw new Error('Comment not found');
        }
        return result;
    } catch (error) {
        console.error('Error deleting comment:', error);
        throw error;
    }
}

module.exports = {
    addCommentsForAllShows,
    getAllComments,
    getCommentsByShowId,
    getCommentsByEpisodeId,
    getCommentsByUserId,
    addComment,
    deleteComment
};
