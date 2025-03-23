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
async function addEpisodes(tvs){
    for (let i = 0; i < tvs.length; i++){
        let s = await createTv(tvs[i]);
    }
}


async function createTv(s){
    let show_id = await showsServices.getShowIdFromDB(s);
    if (show_id===null){
        const sh = await ShowController.createTv(s);
        ShowController.saveShow(sh);
        show_id = await showsServices.getShowIdFromDB(s);
    }
    console.log(show_id);
    show_id = show_id.dataValues.show_id;
    for (let i = 1; i < s.number_of_seasons+1; i++){
        createSeason(i, s.id, show_id);
    }
}

/**
 * 
 * @param {int} nbSeason the season number
 * @param {int} id the show id
 */
async function createSeason(nbSeason, id, show_id){
    let s = await apiServices.getSeason(id, nbSeason);
    for (let i = 0; i < s.episodes.length; i++){
        let e = createEpisode(s.episodes[i], show_id);
        e.save().then(() => console.log('Episode created'));
    }
    console.log('Season created');
}


/**
 * Create an episode object
 * @param {object} episode
 * @returns the episode object
 */
function createEpisode(e, show_id){
    try {
        return Episode.build({
            name: e.name,
            description: e.overview,
            duration: e.runtime || 0,
            show_id: show_id,
            season: e.season_number || 0,
            episode_number: e.episode_number || 0,
            release_date: e.air_date || null,
        });
    } catch (error) {
        console.error(chalk.red('Error getting trailer:', error));
    }
}

(async () => {
    let trending = await showsServices.getShows('tv', 'week');
    addEpisodes(trending);
})();