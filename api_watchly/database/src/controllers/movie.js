// get movie details 

const { fetchTMDB } = require('../config/fetchAPI.js');

// get a movie 
function getMovieID(id) {
    return fetchTMDB('movie/' + id, 'movie');
}
function getMovieTitle(title) {
    return fetchTMDB('search/movie?query=' + title+ '&include_adult=false&language=en-US&page=1', 'movie');
}

// get the cast of a movie
function getMovieCast(id) {
    return fetchTMDB('movie/' + id + '/credits', 'cast');
}

// get the comments of a movie
function getMovieComments(id) {
    return fetchTMDB('movie/' + id + '/reviews?language=en-US&page=1', 'comments');
}

function getImage(id) {
    // let url = 'https://image.tmdb.org/t/p/original/';
    return fetchTMDB('movie/' + id + '/images', 'images');
}

function getTrailer(id) {
    // let url = 'https://www.youtube.com/watch?v=';
    return fetchTMDB('movie/' + id + '/videos?language=en-US', 'videos');
}

console.log(getMovieComments(11));
