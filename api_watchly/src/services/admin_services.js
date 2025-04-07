const Person = require('../../database/src/models/person');
const Show = require('../../database/src/models/shows');
const Comments = require('../../database/src/models/comments');
const Favorite = require('../../database/src/models/favorite');
const sequelize = require('../../database/src/database');
const { QueryTypes } = require('sequelize');

/**
 * Collect statistics for admin dashboard
 * @returns {Object} Statistics object with counts and popular content
 */
async function collectStatistics() {
    try {
        // Get basic counts
        const [userCount, showCount, commentCount, favoriteCount] = await Promise.all([
            Person.count(),
            Show.count(),
            Comments.count(),
            Favorite.count()
        ]);

        // Get counts by type
        const moviesCount = await Show.count({ where: { is_movie: true } });
        const seriesCount = await Show.count({ where: { is_movie: false } });

        // Get popular shows (most favorited and commented)
        const popularShows = await sequelize.query(`
            SELECT s.show_id as id, s.name, s.is_movie,
                  (SELECT COUNT(*) FROM favorite WHERE show_id = s.show_id) as favoriteCount,
                  (SELECT COUNT(*) FROM comments WHERE show_id = s.show_id) as commentCount
            FROM shows s
            WHERE (
                (SELECT COUNT(*) FROM favorite WHERE show_id = s.show_id) > 0
                OR
                (SELECT COUNT(*) FROM comments WHERE show_id = s.show_id) > 0
            )
            ORDER BY (favoriteCount + commentCount) DESC
            LIMIT 10
        `, { type: QueryTypes.SELECT });

        // Get recent comments
        const recentComments = await sequelize.query(`
            SELECT c.comment_id, c.comment_text, c.comment_date, c.show_id,
                   s.name as show_name, p.username
            FROM comments c
            JOIN shows s ON c.show_id = s.show_id
            JOIN person p ON c.person_id = p.person_id
            ORDER BY c.comment_date DESC
            LIMIT 5
        `, { type: QueryTypes.SELECT });

        return {
            userCount,
            showCount,
            commentCount,
            favoriteCount,
            moviesCount,
            seriesCount,
            popularShows,
            recentComments
        };
    } catch (error) {
        console.error('Error collecting admin statistics:', error);
        throw error;
    }
}

module.exports = {
    collectStatistics
};
