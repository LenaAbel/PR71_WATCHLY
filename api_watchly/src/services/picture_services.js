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

        // Check existing images count
        const existingCount = await Illustrated.count({ where: { show_id: show.show_id } });
        if (existingCount >= 10) {
            console.log(chalk.yellow(`⚠️ Show "${show.name}" already has ${existingCount} images, skipping...`));
            continue;
        }

        const imageData = await getImage(tmdbId, mediaType);
        if (!imageData?.backdrops || imageData.backdrops.length === 0) continue;

        console.log(chalk.cyan(`🖼️ Adding images for "${show.name}"...`));

        // Only add remaining images up to 10 total
        const remainingSlots = 10 - existingCount;
        for (const backdrop of imageData.backdrops.slice(0, remainingSlots)) {
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

    console.log(chalk.green('✅ Images added to all shows (max 10 each).'));
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

            const existingCount = await Illustrated.count({ where: { episode_id: ep.episode_id } });
            if (existingCount >= 10) continue;

            if (!episodeData?.still_path) continue;

            const stills = [episodeData.still_path]; 

            for (const still of stills.slice(0, 10 - existingCount)) {
                const fullUrl = `https://image.tmdb.org/t/p/original${still}`;
                const picture = await Picture.create({ link: fullUrl });

                await Illustrated.create({
                    episode_id: ep.episode_id,
                    picture_id: picture.picture_id
                });

                console.log(`🖼️ Added image for episode "${ep.name}"`);
            }

        } catch (err) {
            console.error(`❌ Error adding image to episode ${ep.name}:`, err.message);
        }
    }

    console.log(chalk.green('✅ Episode images added (max 10 each).'));
}


/**
 * Get all pictures
 * @returns 
 */
async function getAllPictures(limit = 10) {
    return await Picture.findAll({ limit });
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
        include: [Picture],
        limit: 10
    });

    return illustrated.map(i => i.Picture?.link).filter(Boolean);
}

async function addDefaultProfilePictures() {
    const defaultPics = [
        { link: 'assets/img/default-pic1.jpg', type: 'profile', description: 'Default default-pic 1' },
        { link: 'assets/img/default-pic2.jpg', type: 'profile', description: 'Default default-pic 2' },
        { link: 'assets/img/default-pic3.jpg', type: 'profile', description: 'Default default-pic 3' },
        { link: 'assets/img/default-pic4.jpg', type: 'profile', description: 'Default default-pic 4' },
        { link: 'assets/img/default-pic5.jpg', type: 'profile', description: 'Default default-pic 5' },
        { link: 'assets/img/default-pic6.jpg', type: 'profile', description: 'Default default-pic 6' },
        { link: 'assets/img/default-pic7.jpg', type: 'profile', description: 'Default default-pic 7' },
        { link: 'assets/img/default-pic8.jpg', type: 'profile', description: 'Default default-pic 8' },
        { link: 'assets/img/default-pic9.jpg', type: 'profile', description: 'Default default-pic 9' },
    ];

    try {
        // First check if we already have profile pictures
        const existingProfilePics = await Picture.count({ where: { type: 'profile' } });
        if (existingProfilePics > 0) {
            console.log(chalk.yellow('⚠️ Profile pictures already exist, skipping...'));
            return;
        }

        console.log(chalk.cyan('\n 🖼️ Adding default profile pictures...'));
        
        for (const pic of defaultPics) {
            await Picture.create(pic);
            console.log(chalk.green(`✅ Added profile picture: ${pic.description}`));
        }
    } catch (error) {
        console.error(chalk.red('❌ Error adding profile pictures:', error));
    }
}

module.exports = {
    addImagesToAllShows,
    addEpisodeImages,
    getAllPictures,
    getPicturesForShow,
    getPicturesForEpisode,
    addDefaultProfilePictures
};