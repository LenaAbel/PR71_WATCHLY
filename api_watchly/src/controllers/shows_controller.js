const showsServices = require('../services/shows_services.js');
const apiServices = require('../../database/src/tmdb/api.js');
const chalk = require('chalk');
const Show = require('../../database/src/models/shows.js');
const { Sequelize } = require('sequelize');
const path = require('path');
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: path.resolve(__dirname, '../../database/data/watchlyDB'),
});


async function AddsShowsDB(time){
    try {
        const shows = await showsServices.getShows("movie", time);
        for (let i = 0; i < shows.length; i++){
            let s = await createMovie(shows[i]);
            saveShow(s);
        }
    } catch (error) {
        console.error(chalk.red('Error getting shows:', error));
    }
}

async function createMovie(s){
    try {
        const trailer = await apiServices.getTrailer(s.id,"movie");
        let t = trailer.results[0].key;
        return Show.build({
            name: s.original_title,
            description: s.overview,
            released_date: s.release_date || 'Unknown',
            nationality: (s.origin_country && s.origin_country[0]) || 'Unknown',
            trailer_link: t,
            status: s.status || 'Unknown',
            duration: s.runtime || 'Unknown',
            is_movie: true,
            is_displayed: false,
            rating: s.vote_average || 0,
        });
    } catch (error) {
        console.error(chalk.red('Error getting trailer:', error));
    }
}

function saveShow(show){
    show.save().then(() => console.log('Show created'));
}


AddsShowsDB('week');