const Show = require('../../database/src/models/shows');
const Casting = require('../../database/src/models/casting');
const Play = require('../../database/src/models/play');
const { getCast, getTmdbIdFromTitle } = require('../../database/src/tmdb/tmdb_api');
const chalk = require('chalk');

// ============================
// Utility Functions
// ============================

function splitFullName(fullName) {
    const parts = fullName.trim().split(' ');
    const surname = parts.pop();
    const name = parts.join(' ') || surname;
    return { name, surname };
}

// ============================
// TMDB API Related Functions
// ============================

/**
 * Get only actors from a show by title
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
 * Get full cast and crew by title
 */
async function getFullCasting(title, mediaType) {
    if (!['movie', 'tv'].includes(mediaType)) {
        throw new Error('Invalid media type. Must be "movie" or "tv".');
    }
    const tmdbId = await getTmdbIdFromTitle(title, mediaType);
    if (!tmdbId) throw new Error('TMDB ID not found');

    return await getCast(tmdbId, mediaType);
}

// ============================
// Database Related Functions
// ============================

/**
 * Get all castings from database
 */
async function getAllCastings() {
    return await Casting.findAll();
}

/**
 * Get casting by ID from database
 */
async function getCastingById(id) {
    return await Casting.findByPk(id);
}

/**
 * Get actors from show using internal DB ID
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

/**
 * Get full cast using internal DB show ID
 */
async function getFullCastingFromShowId(showId) {
    const show = await Show.findByPk(showId);
    if (!show) throw new Error('Show not found');

    const mediaType = show.is_movie ? 'movie' : 'tv';
    const tmdbId = await getTmdbIdFromTitle(show.name, mediaType);
    if (!tmdbId) throw new Error('TMDB ID not found');

    const fullCast = await getCast(tmdbId, mediaType);
    
    const addProfileUrl = person => ({
        ...person,
        image_url: person.profile_path 
            ? `https://image.tmdb.org/t/p/w500${person.profile_path}`
            : null
    });

    return {
        cast: fullCast.cast?.map(addProfileUrl) || [],
        crew: fullCast.crew?.map(addProfileUrl) || [],
    };
}


// ============================
// Main Processing Functions
// ============================

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
 * Get director(s) from a show using internal DB ID
 */
async function getDirectorsFromShowId(showId) {
    const show = await Show.findByPk(showId);
    if (!show) throw new Error('Show not found');

    const mediaType = show.is_movie ? 'movie' : 'tv';
    const tmdbId = await getTmdbIdFromTitle(show.name, mediaType);
    if (!tmdbId) throw new Error('TMDB ID not found');

    const fullCast = await getCast(tmdbId, mediaType);

    return (fullCast.crew || [])
        .filter(member => member.job === 'Director')
        .map(member => ({
            name: member.name,
            job: member.job,
            image_url: member.profile_path
                ? `https://image.tmdb.org/t/p/w500${member.profile_path}`
                : null
        }));
}


module.exports = {
    addCastingForAllShows,
    getAllCastings,
    getCastingById,
    getActorsFromShow,
    getActorsFromShowId,
    getFullCasting,
    getFullCastingFromShowId,
    getDirectorsFromShowId,
};
