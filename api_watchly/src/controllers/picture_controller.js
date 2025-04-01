const pictureServices = require('../services/picture_services');

async function populatePictures(req, res) {
    try {
        await pictureServices.addImagesToAllShows();
        res.status(200).json({ message: 'Pictures successfully added to all shows.' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

async function getAll(req, res) {
    try {
        const pictures = await pictureServices.getAllPictures(10);
        res.status(200).json(pictures);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

async function getByShow(req, res) {
    try {
        const pictures = await pictureServices.getPicturesForShow(req.params.showId);
        res.status(200).json(pictures);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}


module.exports = {
    populatePictures,
    getAll,
    getByShow,
};
