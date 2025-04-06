const { getTrending, getID, getTrailer } = require('../../database/src/tmdb/tmdb_api');
const Show = require('../../database/src/models/shows.js');
const chalk = require('chalk');
const sequelize = require('../../database/src/database'); 
const Genre = require('../../database/src/models/genre.js');
const Has = require('../../database/src/models/has.js');
const Favorite = require('../../database/src/models/favorite.js');
const Person = require('../../database/src/models/person.js');

// --- TMDB Fetching ---
async function getIds(name, time, pages = process.env.TMDB_PAGES) {
    const ids = [];

    for (let page = 1; page <= pages; page++) {
        const data = await getTrending(name, time, page);
        if (data?.results?.length) {
            const newIds = data.results.map(result => result.id);
            ids.push(...newIds);
        }
    }

    return [...new Set(ids)];
}


async function getShows(name, time, pages = process.env.TMDB_PAGES) {
    const ids = await getIds(name, time, pages);
    const shows = [];

    for (let id of ids) {
        const show = await getID(id, name);
        if (show) shows.push(show);
    }
    return shows;
}


// --- DB Queries ---
function getShowIdFromDB(show) {
    return Show.findOne({ where: { name: show.name } });
}

async function getAllShows() {
    return await Show.findAll({ where: { is_displayed: true } });
}

async function getShowById(id, user_id = null) {
    return await Show.findByPk(id, { 
        include: [
        {
            model: Genre,
            through: { model: Has }, 
        },
        {
            model: Favorite,
            required: false,
            where: { person_id: user_id, show_id: id },
        }
        ]
    });
}

async function getAllMovies() {
    return await Show.findAll({ where: { is_movie: true } }); 
}


async function getAllTVShows() {
    return await Show.findAll({ where: { is_movie: false } }); 
}

async function getShowTrailer(id) {
    try {
        const show = await Show.findOne({ where: {show_id : id } });
        return show ? show.trailer_link : null;
    } catch (error) {
        console.error(`Error fetching trailer for show with ID ${id}:`, error.message);
        return null;
    }
}

async function getShowRating(show_id) {
    try {
        const show = await Show.findByPk(show_id, { attributes: ['rating'] });
        return show ? show.rating : null;
    } catch (error) {
        console.error("Error fetching show rating:", error);
        throw error;
    }
}

// --- Show Builders ---
/**
 * Create a movie object from TMDB data
 * @param {*} s 
 * @returns 
 */
async function createMovie(s) {
    try {
        const trailer = await getTrailer(s.id, "movie");
        const t = trailer?.results?.[0]?.key || '';
        // Compute rating on a 5-scale with round numbers
        const computedRating = s.popularity ? Math.round(Math.min(s.popularity / 20, 5)) : 0;
        return Show.build({
            name: s.original_title,
            description: s.overview,
            released_date: s.release_date || 'Unknown',
            nationality: (s.origin_country && s.origin_country[0]) || 'Unknown',
            trailer_link: t,
            status: s.status || 'Unknown',
            duration: s.runtime || 'Unknown',
            is_movie: true,
            is_displayed: true,
            rating: computedRating, // updated rating on 5-scale
        });
    } catch (error) {
        console.error(chalk.red('Error creating movie:', error.message));
    }
}

/**
 * Create a TV show object from TMDB data
 * @param {*} s 
 * @returns 
 */
async function createTv(s) {
    try {
        const trailer = await getTrailer(s.id, "tv");
        const t = trailer?.results?.[0]?.key || '';
        const computedRating = s.popularity ? Math.round(Math.min(s.popularity / 20, 5)) : 0;
        return Show.build({
            name: s.name,
            description: s.overview,
            released_date: s.first_air_date || null,
            nationality: s.origin_country?.[0] || 'Unknown',
            trailer_link: t,
            status: s.status || 'Unknown',
            duration: s.episode_run_time?.[0] || 0,
            is_movie: false,
            is_displayed: true,
            rating: computedRating, // updated rating on 5-scale
        });
    } catch (error) {
        console.error(chalk.red('Error creating TV show:', error.message));
    }
}

/**
 * Save a show to the database
 * @param {*} show 
 */
async function saveShow(show) {
    try {
        await show.save();
        console.log(chalk.green(`[DB] Added: ${show.name}`));
    } catch (err) {
        console.error(chalk.red(`[Error] Failed to save: ${show.name}`));
    }
}

/**
 * Update the displayed status of a show
 * @param {Show} show 
 * @param {boolean} isDisplayed 
 */
async function updateShowDisplayedStatus(id, isDisplayed) {
    try {
        console.log(chalk.blue(`[DB] Updating displayed status for ID: ${id}, isDisplayed: ${isDisplayed}`)); // Log the values
        const [updatedRows] = await Show.update(
            { is_displayed: isDisplayed },
            { where: { show_id: id } }
        );
        if (updatedRows === 0) {
            console.warn(chalk.yellow(`[DB] No rows updated for ID: ${id}`));
        } 
    } catch (err) {
        console.error(chalk.red(`[Error] Failed to update displayed status for ID: ${id}`));
        console.error(err);
    }
}

module.exports = {
    getIds,
    getShows,
    getShowIdFromDB,
    getAllShows,
    getShowById,
    getAllMovies,
    getAllTVShows,
    getShowTrailer,
    createMovie,
    createTv,
    saveShow,
    getShowRating,
    saveShow,
    updateShowDisplayedStatus
};
