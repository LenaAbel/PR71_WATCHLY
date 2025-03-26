const episodeServices = require('../services/episode_services');

async function getEpisodesByShow(req, res) {
    try {
        const episodes = await episodeServices.getEpisodesByShowId(req.params.showId);
        res.status(200).json(episodes);
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

module.exports = {
    addEpisodes,
    getEpisodesByShow,
    getEpisodesBySeason,
    getSeasonsByShow
};
