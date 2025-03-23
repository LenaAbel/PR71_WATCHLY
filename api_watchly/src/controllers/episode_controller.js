const showsServices = require('../services/shows_services.js');
const apiServices = require('../../database/src/tmdb/tmdb_api.js');
const ShowController = require('./shows_controller.js');
const chalk = require('chalk');
const Episode = require('../../database/src/models/episode.js');
const { Sequelize } = require('sequelize');
const path = require('path');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: path.resolve(__dirname, '../../database/data/watchlyDB'),
});


/**
 * Add all the episodes of a show to the database
 * @param {object} tvs
 */
async function addEpisodes(tvs) {
    try {
        console.log(chalk.cyan(`📺 Processing episodes for ${tvs.length} TV shows...`));
        for (let i = 0; i < tvs.length; i++) {
            console.log(chalk.yellow(`\n🎬 Processing show ${i + 1}/${tvs.length}: "${tvs[i].name}"`));
            await createTv(tvs[i]);
        }
    } catch (error) {
        console.error(chalk.red('Error in addEpisodes:', error));
    }
}

async function createTv(s) {
    try {
        let show_id = await showsServices.getShowIdFromDB(s);
        if (show_id === null) {
            const sh = await ShowController.createTv(s);
            await ShowController.saveShow(sh);
            show_id = await showsServices.getShowIdFromDB(s);
        }
        show_id = show_id.dataValues.show_id;
        for (let i = 1; i < s.number_of_seasons + 1; i++) {
            await createSeason(i, s.id, show_id);
        }
    } catch (error) {
        console.error(chalk.red(`Error creating TV show: ${error}`));
    }
}

/**
 * 
 * @param {int} nbSeason the season number
 * @param {int} id the show id
 */
async function createSeason(nbSeason, id, show_id) {
    try {
        let s = await apiServices.getSeason(id, nbSeason);
        console.log(chalk.cyan(`[DB] Season ${nbSeason}: ${s.episodes.length} episodes`));
        for (let i = 0; i < s.episodes.length; i++) {
            const e = createEpisode(s.episodes[i], show_id);
            if (e) {
                await e.save();
            }
        }
    } catch (error) {
        console.error(chalk.red(`[Error] Season ${nbSeason} failed:`, error));
    }
}


/**
 * Create an episode object
 * @param {object} episode
 * @returns the episode object
 */
function createEpisode(e, show_id) {
    try {
        return Episode.build({
            name: e.name,
            description: e.overview || '',
            duration: e.runtime || 0,
            show_id: show_id,
            season: e.season_number || 0,
            episode_number: e.episode_number || 0,
            release_date: e.air_date || null,
        });
    } catch (error) {
        console.error(chalk.red('Error creating episode:', error));
        return null;
    }
}

module.exports = {
    addEpisodes
};