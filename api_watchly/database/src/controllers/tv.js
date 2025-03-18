// get tvshow details

const { fetchTMDB } = require('../config/fetchAPI.js');

// get a tvshow
function getTVshowID(id) {
    return fetchTMDB('tv/' + id, 'tvshow');
}
function getTVshowTitle(title) {
    return fetchTMDB('search/tv?query=' + title + '&include_adult=false&language=en-US&page=1', 'tvshow');
}

// get the cast of a tvshow
function getTVshowCast(id) {
    return fetchTMDB('tv/' + id + '/credits', 'cast');
}

// get the comments of a tvshow
function getTVshowComments(id) {
    return fetchTMDB('tv/' + id + '/reviews?language=en-US&page=1', 'comments');
}

function getImage(id) {
    // let url = 'https://image.tmdb.org/t/p/original/';
    return fetchTMDB('tv/' + id + '/images', 'images');
}

function getTrailer(id) {
    return fetchTMDB('tv/' + id + '/videos?language=en-US', 'videos');
}

console.log(getTVshowComments(94605));