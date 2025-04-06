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
        const show = await showsServices.getShowById(req.params.id, req.query.user_id ?? null);

        if (!show) {
            return res.status(404).json({ message: "Show not found" });
        }

        console.log(chalk.cyan(`[DB] Found: ${show.name}`));

        const showData = show.toJSON();
        showData.Favorite = showData.Favorites[0];
        delete showData.Favorites;

        return res.status(200).json(showData);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: err.message });
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

async function getTrailer(req, res) {
    try {
        const trailer = await showsServices.getShowTrailer(req.params.id);
        res.status(200).json(trailer);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

async function updateDisplayedStatus(req, res) {
    try {
        const id = req.params.id;
        const isDisplayed = req.body.is_displayed;
        const updatedRows = await showsServices.updateShowDisplayedStatus(id, isDisplayed);
        if (updatedRows === 0) {
            return res.status(404).json({ message: "No rows updated. Show may not exist or already has the desired status." });
        }

        res.status(200).json({ message: "Show displayed status updated" });
    } catch (err) {
        console.error(chalk.red(`[Controller] Error updating displayed status for ID: ${req.params.id}`));
    }
}

async function search(req, res) {
    console.log(chalk.cyan(`[DB] Searching for: ${req.query.name}`));
    try {

        if (!req.query) {
            return res.status(400).json({ error: "Query parameter is required" });
        }
        const results = await showsServices.searchShows(req.query);
        console.log(chalk.cyan(`[DB] Found: ${results.length} results`));
        
        res.status(200).json(results);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

async function getShowRating(req, res) {
    try {
        const rating = await showsServices.getShowRating(req.params.id);
        res.status(200).json({ rating });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch show rating' });
    }
}

async function getFirst(req, res) {
    try {
        const show = await showsServices.getFirstShow();
        if (!show) {
            return res.status(404).json({ message: "No shows found" });
        }
        res.status(200).json(show);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

module.exports = {
    addsShowsDB,
    getAll,
    getById,
    getMovies,
    getTV,
    getTrailer,
    updateDisplayedStatus,
    search,
    getShowRating,
    getFirst
};
