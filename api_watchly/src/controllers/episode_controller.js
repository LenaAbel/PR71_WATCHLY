const { get } = require('../router/shows_router');
const episodeServices = require('../services/episode_services');
const showsServices = require('../services/shows_services');

async function getEpisodesByShow(req, res) {
    try {
        const episodes = await episodeServices.getEpisodesByShowId(req.params.showId);
        res.status(200).json(episodes);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

async function getEpisodesById(req, res) {
    try {
        const episode = await episodeServices.getEpisodeById(req.params.episodeId);
        res.status(200).json(episode);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

async function getEpisodesBySeason(req, res) {
    try {
        const { showId, season } = req.params;
        const episodes = await episodeServices.getEpisodesBySeason(showId, season);
        res.status(200).json(episodes);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

async function getSeasonsByShow(req, res) {
    try {
        const seasons = await episodeServices.getSeasonsByShowId(req.params.showId);
        res.status(200).json(seasons);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

async function addEpisodes(tvShows) {
    return await episodeServices.addEpisodes(tvShows);
}

async function getPicturesByEpisode(req, res) {
    try {
        const { showId, season, number } = req.params;
        const pictures = await episodeServices.getPicturesForEpisode(showId, season, number);
        res.status(200).json(pictures);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

async function getDetailsTVID(req, res) {
    try {
        const show = await showsServices.getShowById(req.params.showId);
        if (!show) return res.status(404).json({ message: "Show not found" });
        if (show.is_movie) return res.status(400).json({ message: "This is a movie, not a TV show" });
        const episodes = await episodeServices.getNumberOfEpisodes(req.params.showId);
        const seasons = await episodeServices.getNumberOfSeasons(req.params.showId);
        res.status(200).json({ episodes, seasons });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

async function getDetailsTV(req, res) {
    try {
        // for all the shows that are not movies
        const shows = await showsServices.getAllTVShows();
        // if (!shows) return res.status(404).json({ message: "No TV shows found" });
        // if (shows.length === 0) return res.status(404).json({ message: "No TV shows found" });
        const showsWithDetails = [];
        for (const show of shows) {
            const episodes = await episodeServices.getNumberOfEpisodes(show.show_id);
            const seasons = await episodeServices.getNumberOfSeasons(show.show_id);
            showsWithDetails.push({ ...show.toJSON(), episodes, seasons });
        }
        res.status(200).json(showsWithDetails);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
}


module.exports = {
    addEpisodes,
    getEpisodesByShow,
    getEpisodesBySeason,
    getSeasonsByShow,
    getPicturesByEpisode,
    getEpisodesById,
    getDetailsTV,
    getDetailsTVID
};
