const Show = require('../../database/src/models/shows');
const Episode = require('../../database/src/models/episode');
const Picture = require('../../database/src/models/picture');
const Illustrated = require('../../database/src/models/illustrated');
const { getImage, getTmdbIdFromTitle, getSeason } = require('../../database/src/tmdb/tmdb_api');
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

        console.log(chalk.cyan(`🖼️ Adding images for "${show.name}"...`));

        for (const backdrop of imageData.backdrops) {
            try {
                const fullUrl = `https://image.tmdb.org/t/p/original${backdrop.file_path}`;

                const picture = await Picture.create({ link: fullUrl });
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

/**
 * Add images to episodes based on TMDB stills
 */
async function addEpisodeImages() {
    const episodes = await Episode.findAll();

    for (const ep of episodes) {
        const show = await Show.findByPk(ep.show_id);
        if (!show) continue;

        const mediaType = show.is_movie ? 'movie' : 'tv';
        const tmdbId = await getTmdbIdFromTitle(show.name, mediaType);
        if (!tmdbId) continue;

        try {
            const seasonData = await getSeason(tmdbId, ep.season);
            const episodeData = seasonData.episodes.find(e => e.episode_number === ep.episode_number);
            if (!episodeData?.still_path) continue;

            const fullUrl = `https://image.tmdb.org/t/p/original${episodeData.still_path}`;
            const picture = await Picture.create({ link: fullUrl });

            await Illustrated.create({
                episode_id: ep.episode_id,
                picture_id: picture.picture_id
            });

            console.log(`🖼️ Added image for episode "${ep.name}"`);
        } catch (err) {
            console.error(`❌ Error adding image to episode ${ep.name}:`, err.message);
        }
    }

    console.log(chalk.green('✅ Episode images added.'));
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

/**
 * Get all pictures for an episode by its ID
 * @param {*} episodeId
 * @returns array of picture links
 */
async function getPicturesForEpisode(episodeId) {
    const illustrated = await Illustrated.findAll({
        where: { episode_id: episodeId },
        include: [Picture]
    });

    return illustrated.map(i => i.Picture?.link).filter(Boolean);
}


module.exports = {
    addImagesToAllShows,
    addEpisodeImages,
    getAllPictures,
    getPicturesForShow,
    getPicturesForEpisode
};