const { getTrending, getID, getTrailer } = require('../../database/src/tmdb/tmdb_api');
const Show = require('../../database/src/models/shows.js');
const chalk = require('chalk');
const sequelize = require('../../database/src/database'); 

// --- TMDB Fetching ---
async function getIds(name, time) {
    const data = await getTrending(name, time);
    return data.results.map(result => result.id);
}

async function getShows(name, time) {
    const ids = await getIds(name, time);
    const shows = [];

    for (let id of ids) {
        const show = await getID(id, name);
        shows.push(show);
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

async function getShowById(id) {
    return await Show.findByPk(id);
}

async function getAllMovies() {
    return await Show.findAll({ where: { is_movie: true, is_displayed: true } });
}


async function getAllTVShows() {
    return await Show.findAll({ where: { is_movie: false, is_displayed: true } });
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
            rating: s.vote_average || 0,
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
            rating: Math.round(s.vote_average) || 0,
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

module.exports = {
    getIds,
    getShows,
    getShowIdFromDB,
    getAllShows,
    getShowById,
    getAllMovies,
    getAllTVShows,
    createMovie,
    createTv,
    saveShow
};
