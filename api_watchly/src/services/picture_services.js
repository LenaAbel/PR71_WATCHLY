const Show = require('../../database/src/models/shows');
const Picture = require('../../database/src/models/picture');
const Illustrated = require('../../database/src/models/illustrated');
const { getImage, getTmdbIdFromTitle } = require('../../database/src/tmdb/tmdb_api');
const chalk = require('chalk');

/**
 * Add images to all shows in the database
 */
async function addImagesToAllShows() {
    const shows = await Show.findAll();

    for (const show of shows) {
        const mediaType = show.is_movie ? 'movie' : 'tv';
        const tmdbId = await getTmdbIdFromTitle(show.name, mediaType);
        if (!tmdbId) continue;

        const imageData = await getImage(tmdbId, mediaType);
        if (!imageData?.backdrops || imageData.backdrops.length === 0) continue;

        console.log(chalk.cyan(`\uD83D\uDDBC️ Adding images for "${show.name}"...`));

        for (const backdrop of imageData.backdrops) {
            try {
                const fullUrl = `https://image.tmdb.org/t/p/original${backdrop.file_path}`;

                const picture = await Picture.create({ link: fullUrl });
                await Illustrated.create({
                    show_id: show.show_id,
                    picture_id: picture.picture_id
                });
            } catch (err) {
                console.error(chalk.red(`\u274C Failed to add image for "${show.name}": ${err.message}`));
            }
        }
    }

    console.log(chalk.green('✅ Images added to all shows.'));
}

/**
 * Get all pictures
 * @returns 
 */
async function getAllPictures() {
    return await Picture.findAll();
}

/**
 * get pictures for a show by its ID
 * @param {*} showId 
 * @returns 
 */
async function getPicturesForShow(showId) {
    return await Illustrated.findAll({
        where: { show_id: showId },
        include: [Picture]
    });
}

module.exports = {
    addImagesToAllShows,
    getAllPictures,
    getPicturesForShow
};
