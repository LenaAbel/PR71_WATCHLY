const Favorite = require('../../database/src/models/favorite');
const chalk = require('chalk');
const favoriteServices = require('../services/favorite_services');

async function addFavorite(req, res) {
    try {
        await favoriteServices.createFavorites();
        if (res) {
            res.status(201).json({ message: 'Favorites initialized successfully' });
        }
    } catch (error) {
        console.error(chalk.red('Error adding favorites:', error));
        if (res) {
            res.status(500).json({ error: 'Failed to add favorites' });
        }
    }
}

async function getFavorites(req, res) {
    try {
        const favorites = await favoriteServices.getFavorites();
        res.status(200).send(favorites);
    } catch (error) {
        console.error(chalk.red('Error fetching favorites:', error));
        res.status(500).send({ error: 'Failed to fetch favorites' });
    }
}

async function removeFavorite(req, res) {
    try {
        await favoriteServices.removeFavorite(req.params.id);
        res.status(200).send({ message: 'Favorite removed successfully' });
    } catch (error) {
        console.error(chalk.red('Error removing favorite:', error));
        res.status(500).send({ error: 'Failed to remove favorite' });
    }
}

module.exports = { addFavorite, getFavorites, removeFavorite };