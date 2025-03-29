const Episode = require('../../database/src/models/episode');
const Illustrated = require('../../database/src/models/illustrated');
const Picture = require('../../database/src/models/picture');

const apiServices = require('../../database/src/tmdb/tmdb_api');
const { get } = require('../router/shows_router');
const showsServices = require('./shows_services');
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
        const sh = await showsServices.createTv(show);
        await showsServices.saveShow(sh);
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
 * Get an episode by ID
 */
async function getEpisodeById(id) {
    const episode = await Episode.findOne({
        where: { episode_id: id },
        include: [{ model: Illustrated, include: [Picture] }]
    });

    if (!episode) return null;

    return formatEpisode(episode);
}

/**
 * Get all episodes for a show
 */
async function getEpisodesByShowId(showId) {
    const episodes = await Episode.findAll({
        where: { show_id: showId },
        include: [{ model: Illustrated, include: [Picture] }],
        order: [['season', 'ASC'], ['episode_number', 'ASC']]
    });

    return episodes.map(ep => formatEpisode(ep));
}

/**
 * Get all episodes for a given season
 */
async function getEpisodesBySeason(showId, seasonNumber) {
    const episodes = await Episode.findAll({
        where: {
            show_id: showId,
            season: seasonNumber
        },
        include: [{ model: Illustrated, include: [Picture] }],
        order: [['episode_number', 'ASC']]
    });

    return episodes.map(ep => formatEpisode(ep));
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

async function getPicturesForEpisode(showId, season, number) {
    const episode = await Episode.findOne({
        where: { show_id: showId, season, episode_number: number },
        include: [{
            model: Illustrated,
            include: [Picture]
        }]
    });

    if (!episode) return [];

    return episode.Illustrateds?.map(i => i.Picture?.link).filter(Boolean) || [];
}

// ============================
// Data Processing Functions
// ============================

/**
 * Format an episode for clean API output
 */
function formatEpisode(ep) {
    return {
        id: ep.episode_id,
        name: ep.name,
        description: ep.description,
        duration: typeof ep.duration === 'string' ? parseInt(ep.duration.split(':')[1]) : ep.duration,
        season: ep.season,
        number: ep.episode_number,
        released_date: ep.release_date,
        show_id: ep.show_id,
        thumbnail: ep.Illustrateds?.[0]?.Picture?.link || null
    };
}

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
        const sh = await showsServices.createTv(show);
        await showsServices.saveShow(sh);
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
    getSeasonsByShowId,
    getPicturesForEpisode,
    getEpisodeById,
};
