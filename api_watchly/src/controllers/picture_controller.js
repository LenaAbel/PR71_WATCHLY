const Show = require('../../database/src/models/shows');
const Picture = require('../../database/src/models/picture');
const Illustrated = require('../../database/src/models/illustrated');
const { getImage, getTmdbIdFromTitle } = require('../../database/src/tmdb/tmdb_api');
const chalk = require('chalk');

async function addImagesToAllShows() {
    const shows = await Show.findAll();

    for (const show of shows) {
        const mediaType = show.is_movie ? 'movie' : 'tv';
        const tmdbId = await getTmdbIdFromTitle(show.name, mediaType);
        if (!tmdbId) continue;

        const imageData = await getImage(tmdbId, mediaType);
        if (!imageData?.backdrops || imageData.backdrops.length === 0) continue;

        console.log(chalk.cyan(`🖼️ Adding images for "${show.name}"...`));

        for (const backdrop of imageData.backdrops) {
            try {
                const fullUrl = `https://image.tmdb.org/t/p/original${backdrop.file_path}`;

                // Crée l'entrée dans picture
                const picture = await Picture.create({ link: fullUrl });

                // Associe l'image au show dans illustrated
                await Illustrated.create({
                    show_id: show.show_id,
                    picture_id: picture.picture_id
                });
            } catch (err) {
                console.error(chalk.red(`❌ Failed to add image for "${show.name}": ${err.message}`));
            }
        }
    }

    console.log(chalk.green('✅ Images added to all shows.'));
}

module.exports = { addImagesToAllShows };
