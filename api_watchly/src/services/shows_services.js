const { getTrending, getID, getTrailer } = require('../../database/src/tmdb/tmdb_api');
const Show = require('../../database/src/models/shows.js');
const chalk = require('chalk');
const sequelize = require('../../database/src/database'); 
const Genre = require('../../database/src/models/genre.js');
const Has = require('../../database/src/models/has.js');
const Favorite = require('../../database/src/models/favorite.js');
const Person = require('../../database/src/models/person.js');
const { Op } = require('sequelize');
const Illustrated = require('../../database/src/models/illustrated.js');
const Picture = require('../../database/src/models/picture.js');

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
    return await Show.findAll({ where: { is_movie: true, is_displayed: true } });
}


async function getAllTVShows() {
    return await Show.findAll({ where: { is_movie: false, is_displayed: true } });
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
 * Search for shows with optional filters
 * @param {Object} filters - Filters to apply to the search
 * @param {string} filters.name - Name of the show to search for
 * @param {boolean} filters.is_movie - Filter by movie or TV show
 * @param {string} filters.genre - Filter by genre
 * @param {string} filters.order_by - Field to order the results by
 * @param {string} filters.order - Order direction ('ASC' or 'DESC')
 * @returns {Promise<Array>} - List of shows matching the search criteria
 */
async function searchShows(filters = {}) {
    const { name, is_movie, genre, order_by = 'rating', order = 'DESC' } = filters;
    const include = [];

    console.log(`[DB] Searching for shows with filters: ${JSON.stringify(filters)}`);
    
    const whereClause = {
        is_displayed: true,
    };

    if (name) {
        whereClause.name = { [Op.like]: `%${name}%` };
    }

    /*if (is_movie === 'true') {
        whereClause.is_movie = true;
    } else {
        whereClause.is_movie = false;
    }

    if (genre) {
        include.push({
            model: Genre,
            where: { name: { [Op.like]: `%${genre}%` } },
            through: { model: Has },
        });
    }*/

    console.log(`[DB] Searching with where clause: ${JSON.stringify(whereClause)}`);    
    
    return await Show.findAll({
        include: {
            model: Illustrated,
            include: [Picture],
            required: false,
            limit: 1,
        },
        where: whereClause,
    }).then(shows => {
        return shows.map(show => {
            const thumbnail = show.Illustrateds?.[0]?.Picture?.link || null;
            const { Illustrateds, ...showData } = show.toJSON();
            return { ...showData, thumbnail };
        });
    });
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
    searchShows,
    getShowRating
};
