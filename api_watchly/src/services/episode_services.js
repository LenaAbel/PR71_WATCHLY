const Episode = require('../../database/src/models/episode');
const apiServices = require('../../database/src/tmdb/tmdb_api');
const showsServices = require('./shows_services');
const showsController = require('../controllers/shows_controller');
const chalk = require('chalk');

// ============================
// TMDB API Related Functions
// ============================

/**
 * Create a season and its episodes using TMDB API
 * @param {*} seasonNumber 
 * @param {*} tmdbId 
 * @param {*} showId 
 */
async function createSeason(seasonNumber, tmdbId, showId) {
    try {
        const seasonData = await apiServices.getSeason(tmdbId, seasonNumber);
        for (const e of seasonData.episodes) {
            const ep = createEpisode(e, showId);
            if (ep) await ep.save();
        }
    } catch (err) {
        console.error(chalk.red(`Failed to process season ${seasonNumber}:`, err));
    }
}

/**
 * Create a TV show and its episodes
 * @param {} show 
 */
async function createTv(show) {
    let showRecord = await showsServices.getShowIdFromDB(show);
    if (!showRecord) {
        const sh = await showsController.createTv(show);
        await showsController.saveShow(sh);
        showRecord = await showsServices.getShowIdFromDB(show);
    }
    const show_id = showRecord.dataValues.show_id;
    for (let i = 1; i <= show.number_of_seasons; i++) {
        await createSeason(i, show.id, show_id);
    }
}

// ============================
// Database Related Functions 
// ============================

/**
 * Get all episodes for a show
 */
async function getEpisodesByShowId(showId) {
    return await Episode.findAll({ where: { show_id: showId } });
}

/**
 * Get all episodes for a given season
 */
async function getEpisodesBySeason(showId, seasonNumber) {
    return await Episode.findAll({
        where: {
            show_id: showId,
            season: seasonNumber
        },
        order: [['episode_number', 'ASC']]
    });
}

/**
 * Get all seasons for a show
 */
async function getSeasonsByShowId(showId) {
    const seasons = await Episode.findAll({
        where: { show_id: showId },
        attributes: ['season'],
        group: ['season'],
        order: [['season', 'ASC']]
    });
    return seasons.map(s => s.season);
}

// ============================
// Data Processing Functions
// ============================

/**
 * Create an episode object
 */
function createEpisode(e, showId) {
    return Episode.build({
        name: e.name,
        description: e.overview || '',
        duration: e.runtime || 0,
        show_id: showId,
        season: e.season_number || 0,
        episode_number: e.episode_number || 0,
        release_date: e.air_date || null,
    });
}

// ============================
// Main Processing Functions
// ============================

/**
 * Add episodes to the database for the given TV shows
 */
async function addEpisodes(tvShows) {
    console.log(chalk.cyan(`\n📺 Processing episodes for ${tvShows.length} TV shows...`));
    for (let i = 0; i < tvShows.length; i++) {
        console.log(chalk.yellow(`🎬 ${i + 1}/${tvShows.length}: ${tvShows[i].name} (${tvShows[i].number_of_seasons} seasons)`));
        await createTv(tvShows[i]);
    }
}

/**
 * Create a TV show and its episodes
 */
async function createTv(show) {
    let showRecord = await showsServices.getShowIdFromDB(show);
    if (!showRecord) {
        const sh = await showsController.createTv(show);
        await showsController.saveShow(sh);
        showRecord = await showsServices.getShowIdFromDB(show);
    }
    const show_id = showRecord.dataValues.show_id;
    for (let i = 1; i <= show.number_of_seasons; i++) {
        await createSeason(i, show.id, show_id);
    }
}

module.exports = {
    addEpisodes,
    getEpisodesByShowId,
    getEpisodesBySeason,
    getSeasonsByShowId
};
