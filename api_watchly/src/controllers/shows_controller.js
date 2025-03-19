const showsServices = require('../services/shows_services.js');
const chalk = require('chalk');

const getShows = async (req, res) => {
    try {
        const { type = 'tv', time = 'week' } = req.query;
        const shows = await showsServices.getShows(type, time);
        console.log(chalk.green('Successfully retrieved shows'));
        res.json(shows);
    } catch (error) {
        console.error(chalk.red('Error getting shows:', error));
        res.status(500).json({ error: 'Failed to get shows' });
    }
};

const getTrendingShows = async (req, res) => {
    try {
        const { type = 'tv', time = 'week' } = req.query;
        const ids = await showsServices.getIds(type, time);
        console.log(chalk.green('Successfully retrieved trending shows'));
        res.json(ids);
    } catch (error) {
        console.error(chalk.red('Error getting trending shows:', error));
        res.status(500).json({ error: 'Failed to get trending shows' });
    }
};

module.exports = {
    getShows,
    getTrendingShows
};