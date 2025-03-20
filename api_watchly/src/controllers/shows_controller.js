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

/**
 * Add the trending shows to the database
 * @param {string} time "day" or "week"
 */
async function addsShowsDB(time){
    try {
        const movies = await showsServices.getShows("movie", time); // get trending movies
        const tv = await showsServices.getShows("tv", time); // get trending tv shows
        addMovies(movies); // add trending movies to the database
        addTv(tv); // add trending tv shows to the database
    } catch (error) {
        console.error(chalk.red('Error getting shows:', error));
    }
}

/**
 * Add all the trending movies to the database
 * @param {object} movies 
 */
async function addMovies(movies){
    for (let i = 0; i < movies.length; i++){
        let s = await createMovie(movies[i]);
        saveShow(s);
    }
}

/**
 * Add all the trending tv shows to the database
 * @param {object} tv
 * @returns
*/
async function addTv(tv){
    for (let i = 0; i < tv.length; i++){
        let s = await createTv(tv[i]);
        saveShow(s);
    }
}

/**
 * Create a movie object
 * @param {object} s
 * @returns the movie object
 * @throws {error} if the trailer is not found
 * @async waits for the trailer to be found
 */
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

/**
 * Create a tv show object
 * @param {object} s
 * @returns the tv show object
 * @async waits for the trailer to be found
 */
async function createTv(s){
    console.log(s);
    const trailer = await apiServices.getTrailer(s.id,"tv");
    let t = trailer.results[0].key;
    return Show.build({
        name: s.name,
        description: s.overview,
        released_date: s.first_air_date,
        nationality: s.origin_country[0],
        trailer_link: t,
        status: s.status,
        duration: (s.last_episode_to_air && s.last_episode_to_air.runtime) || 0,
        is_movie: false,
        is_displayed: false,
        rating: s.vote_average || 0,
    });
}



function saveShow(show){
    show.save().then(() => console.log('Show created'));
}


module.exports = {
    addsShowsDB,
    createMovie,
    createTv,
    saveShow
}

// addsShowsDB('week');
