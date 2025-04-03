const Favorite = require('../../database/src/models/favorite');
const chalk = require('chalk');
const favoriteServices = require('../services/favorite_services');

// Function for adding random favorites during initialization
async function addFavorites() {
    try {
        await favoriteServices.createFavorites();
    } catch (error) {
        console.error(chalk.red('Error adding favorites:', error));
    }
}

// API endpoint for adding a user favorite
async function addFavorite(req, res) {
    try {
        const result = await favoriteServices.addFavorite({
            show_id: req.body.show_id,
            person_id: req.userId,
            rating: req.body.rating || null,
            is_watched: req.body.is_watched || false
        });
        res.status(201).json(result);
    } catch (error) {
        console.error(chalk.red('Error adding favorite:', error));
        res.status(500).json({ error: 'Failed to add favorite' });
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

module.exports = { addFavorites, addFavorite, getFavorites, removeFavorite };