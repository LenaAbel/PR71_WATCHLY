const Show = require('../../database/src/models/shows');
const Casting = require('../../database/src/models/casting');
const Play = require('../../database/src/models/play');
const { getCast, getTmdbIdFromTitle } = require('../../database/src/tmdb/tmdb_api');
const chalk = require('chalk');

function splitFullName(fullName) {
    const parts = fullName.trim().split(' ');
    const surname = parts.pop();
    const name = parts.join(' ') || surname;
    return { name, surname };
}

/**
 * Add casting for all shows in the database
 */
async function addCastingForAllShows() {
    const shows = await Show.findAll();

    for (const show of shows) {
        const mediaType = show.is_movie ? 'movie' : 'tv';
        const tmdbId = await getTmdbIdFromTitle(show.name, mediaType);
        if (!tmdbId) continue;

        const castData = await getCast(tmdbId, mediaType);
        if (!castData?.cast) continue;

        console.log(chalk.cyan(`🎭 Adding cast for "${show.name}"...`));

        for (const member of castData.cast.slice(0, 10)) {
            try {
                const { name, surname } = splitFullName(member.name);
                const [cast] = await Casting.findOrCreate({
                    where: { name, surname, is_actor: true },
                });

                await Play.findOrCreate({
                    where: {
                        cast_id: cast.cast_id,
                        show_id: show.show_id,
                    },
                    defaults: {
                        role: member.character || 'Unknown',
                    }
                });
            } catch (err) {
                console.error(chalk.red(`❌ Failed to add cast "${member.name}" for "${show.name}": ${err.message}`));
            }
        }
    }

    console.log(chalk.green('✅ Casting + Play associations completed for all shows.'));
}

/**
 * Get all castings
 * @returns {Promise<Casting[]>}
 */
async function getAllCastings() {
    return await Casting.findAll();
}

/**
 * Get casting by ID
 * @param {*} id 
 * @returns 
 */
async function getCastingById(id) {
    return await Casting.findByPk(id);
}

/**
 * Get only actors from a show by title
 * @param {*} title 
 * @param {*} mediaType 
 * @returns 
 */
async function getActorsFromShow(title, mediaType) {
    if (!['movie', 'tv'].includes(mediaType)) {
        throw new Error('Invalid media type. Must be "movie" or "tv".');
    }
    const tmdbId = await getTmdbIdFromTitle(title, mediaType);
    if (!tmdbId) throw new Error('TMDB ID not found');

    const castData = await getCast(tmdbId, mediaType);
    return castData?.cast?.filter(c => c.known_for_department === 'Acting') || [];
}

/**
 * Get only actors from a show by internal DB show ID
 */
async function getActorsFromShowId(showId) {
    const show = await Show.findByPk(showId);
    if (!show) throw new Error('Show not found');

    const mediaType = show.is_movie ? 'movie' : 'tv';
    const tmdbId = await getTmdbIdFromTitle(show.name, mediaType);
    if (!tmdbId) throw new Error('TMDB ID not found');

    const castData = await getCast(tmdbId, mediaType);
    return castData?.cast?.filter(c => c.known_for_department === 'Acting') || [];
}

async function getFullCasting(title, mediaType) {
    if (!['movie', 'tv'].includes(mediaType)) {
        throw new Error('Invalid media type. Must be "movie" or "tv".');
    }
    const tmdbId = await getTmdbIdFromTitle(title, mediaType);
    if (!tmdbId) throw new Error('TMDB ID not found');

    return await getCast(tmdbId, mediaType);
}

/**
 * Get full cast (cast + crew) by internal DB show ID
 */
async function getFullCastingFromShowId(showId) {
    const show = await Show.findByPk(showId);
    if (!show) throw new Error('Show not found');

    const mediaType = show.is_movie ? 'movie' : 'tv';
    const tmdbId = await getTmdbIdFromTitle(show.name, mediaType);
    if (!tmdbId) throw new Error('TMDB ID not found');

    return await getCast(tmdbId, mediaType);
}

module.exports = {
    addCastingForAllShows,
    getAllCastings,
    getCastingById,
    getActorsFromShow,
    getActorsFromShowId,
    getFullCasting,
    getFullCastingFromShowId
};
