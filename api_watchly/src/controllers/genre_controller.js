const Show = require('../../database/src/models/shows');
const Genre = require('../../database/src/models/genre');
const Has = require('../../database/src/models/has');
const { getID, getTmdbIdFromTitle } = require('../../database/src/tmdb/tmdb_api');
const chalk = require('chalk');

async function addGenresToAllShows() {
    const shows = await Show.findAll();

    for (const show of shows) {
        const mediaType = show.is_movie ? 'movie' : 'tv';

        const tmdbId = await getTmdbIdFromTitle(show.name, mediaType);
        if (!tmdbId) {
            console.warn(chalk.yellow(`⚠️ No TMDB ID found for "${show.name}"`));
            continue;
        }

        const showData = await getID(tmdbId, mediaType);
        if (!showData || !showData.genres) continue;

        console.log(chalk.cyan(`🎞️ Adding genres for "${show.name}"...`));

        for (const genreObj of showData.genres) {
            try {
                // Insère le genre si pas encore dans la table
                const [genre] = await Genre.findOrCreate({
                    where: { name: genreObj.name }
                });

                // Associe le genre au show via `has`
                await Has.findOrCreate({
                    where: {
                        show_id: show.show_id,
                        genre_id: genre.genre_id
                    }
                });

            } catch (err) {
                console.error(chalk.red(`❌ Failed to add genre "${genreObj.name}" for "${show.name}": ${err.message}`));
            }
        }
    }

    console.log(chalk.green('✅ Genre associations completed for all shows.'));
}

module.exports = { addGenresToAllShows };
