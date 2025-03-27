// Description: This file contains the functions that are used to get the details of a movie or a tv show from the TMDB API.
const { fetchTMDB } = require('../config/fetchAPI.js');

/**
 * Get the details for a show from an id
 * @param {int} id The id of a tv show or movie
 * @param {string} name "tv" or "movie"
 * @returns the API response
 */
function getID(id, name) {
    return fetchTMDB(name+ '/' + id, name);
}

/**
 * Get the details for a show from a title
 * @param {string} title The title of a tv show or movie
 * @param {string} name "tv" or "movie"
 * @returns the API response
 */
function getTitle(title, name) {
    return fetchTMDB('search/'+name+'?query=' + title+ '&include_adult=false&language=en-US&page=1', name);
}

/**
 * Get the cast from a show
 * @param {string} id The id of a tv show or movie
 * @param {string} name "tv" or "movie"
 * @returns the API response
 */
function getCast(id, name) {
    return fetchTMDB(name+'/' + id + '/credits', 'cast');
}

/**
 * Get the comments for a show
 * @param {int} id The id of a tv show or movie
 * @param {string} name "tv" or "movie"
 * @returns the API response
 */
function getComments(id, name) {
    return fetchTMDB(name+'/' + id + '/reviews?language=en-US&page=1', 'comments');
}

/**
 * Get the pictures for a show
 * @param {int} id The id of a tv show or movie
 * @param {string} name "tv" or "movie"
 * @returns The API response
 */
function getImage(id, name) {
    // let url = 'https://image.tmdb.org/t/p/original/';
    return fetchTMDB(name+'/' + id + '/images', 'images');
}

/**
 * Get the trailer for a show
 * @param {int} id The id of a tv show or movie
 * @param {string} name "tv" or "movie"
 * @returns 
 */
function getTrailer(id, name) {
    // let url = 'https://www.youtube.com/watch?v=';
    return fetchTMDB(name+'/' + id + '/videos?language=en-US', 'videos');
}

/**
 * Get the trending shows
 * @param {string} name "tv" or "movie"
 * @param {string} time "day" or "week"
 * @returns the API response
 */
function getTrending(name, time, page = 1) {
    return fetchTMDB(`trending/${name}/${time}?page=${page}`, 'trending');
}

function getSeason(id, number) {
    return fetchTMDB('tv/'+id+'/season/'+number, 'seasons');
}



/**
 * Get the TMDB ID of a show based on its title
 * @param {string} title 
 * @param {string} mediaType "movie" or "tv"
 * @returns {number|null}
 */
async function getTmdbIdFromTitle(title, mediaType) {
    try {
        const result = await getTitle(title, mediaType);
        return result?.results?.[0]?.id || null;
    } catch (err) {
        console.error(`Error getting TMDB ID for "${title}":`, err);
        return null;
    }
}

/**
 * Get aggregated credits for a TV show's season
 * @param {int} showId 
 * @param {int} seasonNumber 
 * @returns the API response
 */
function getAggregateCredits(showId, seasonNumber) {
    return fetchTMDB(`tv/${showId}/season/${seasonNumber}/aggregate_credits`, 'aggregate_credits');
}


module.exports = { getID, getTitle, getCast, getComments, getImage, getTrailer, getTrending, getSeason, getTmdbIdFromTitle, getAggregateCredits };