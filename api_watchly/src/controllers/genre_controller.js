const Show = require('../../database/src/models/shows');
const Genre = require('../../database/src/models/genre');
const Has = require('../../database/src/models/has');
const { getID, getTmdbIdFromTitle } = require('../../database/src/tmdb/tmdb_api');
const genreService  = require('../services/genre_services');
const chalk = require('chalk');


async function addGenresToAllShows() {
    try {
        await genreService.createGenre();
    } catch (err) {
        console.error(chalk.red(`❌ Failed to add genres: ${err.message}`));
    }
}


// --- Routes handlers ---
async function getAllGenre(req, res) {
    try {
        const shows = await genreService.getAllGenre();
        res.status(200).json(shows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

async function getGenreById(req, res) {
    try {
        const show = await genreService.getGenreById(req.params.id);
        if (!show) return res.status(404).json({ message: "Show not found" });
        res.status(200).json(show);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}


module.exports = { addGenresToAllShows,getAllGenre,getGenreById };
