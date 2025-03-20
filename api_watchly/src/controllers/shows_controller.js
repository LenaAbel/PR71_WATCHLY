const showsServices = require('../services/shows_services.js');
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
            let s = createMovie(shows[i]);
            saveShow(s);
        }
    } catch (error) {
        console.error(chalk.red('Error getting shows:', error));
    }
}

function createMovie(s){
    return Show.build({
        name: s.original_title,
        description: s.overview,
        released_date: s.release_date || 'Unknown',
        nationality: (s.origin_country && s.origin_country[0]) || 'Unknown',
        trailer_link: s.trailer_link || 'Unknown',
        availability_status: s.status || 'Unknown',
        duration: s.runtime || 'Unknown',
        is_movie: true,
        is_displayed: false,
        rating: s.vote_average || 0,
    });
}

function saveShow(show){
    show.save().then(() => console.log('Show created'));
}


AddsShowsDB('week');