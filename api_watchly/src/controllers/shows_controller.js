const showsServices = require('../services/shows_services.js');
const chalk = require('chalk');

const { Sequelize } = require('sequelize');
const path = require('path');

async function addsShowsDB(time) {
    try {
        const movies = await showsServices.getShows("movie", time);
        const tv = await showsServices.getShows("tv", time);

        console.log(chalk.cyan(`[DB] Found: ${movies.length} movies, ${tv.length} TV shows`));

        for (const m of movies) {
            const s = await showsServices.createMovie(m);
            await showsServices.saveShow(s);
        }

        for (const t of tv) {
            const s = await showsServices.createTv(t);
            await showsServices.saveShow(s);
        }
    } catch (error) {
        console.error(chalk.red('[Error] Shows fetch failed:', error));
    }
}

// --- Routes handlers ---
async function getAll(req, res) {
    try {
        const shows = await showsServices.getAllShows();
        res.status(200).json(shows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

async function getById(req, res) {
    try {
        const show = await showsServices.getShowById(req.params.id);
        if (!show) return res.status(404).json({ message: "Show not found" });
        res.status(200).json(show);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

async function getMovies(req, res) {
    try {
        const movies = await showsServices.getAllMovies();
        res.status(200).json(movies);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

async function getTV(req, res) {
    try {
        const tvShows = await showsServices.getAllTVShows();
        res.status(200).json(tvShows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

module.exports = {
    addsShowsDB,
    getAll,
    getById,
    getMovies,
    getTV
};
