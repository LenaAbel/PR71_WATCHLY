const castingServices = require('../services/casting_services');

async function getAll(req, res) {
    try {
        const castings = await castingServices.getAllCastings();
        res.status(200).json(castings);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

async function getById(req, res) {
    try {
        const casting = await castingServices.getCastingById(req.params.id);
        if (!casting) return res.status(404).json({ message: "Casting not found" });
        res.status(200).json(casting);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

// get actors by internal show ID
async function getActorsByShowId(req, res) {
    try {
        const showId = req.params.id;
        const actors = await castingServices.getActorsFromShowId(showId);
        res.status(200).json(actors);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

// get full cast by internal show ID
async function getFullCastingByShowId(req, res) {
    try {
        const showId = req.params.id;
        const casting = await castingServices.getFullCastingFromShowId(showId);
        res.status(200).json(casting);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

module.exports = {
    getAll,
    getById,
    getActorsByShowId,
    getFullCastingByShowId
};
