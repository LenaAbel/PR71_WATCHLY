const Favorite = require('../../database/src/models/favorite');
const chalk = require('chalk');
const favoriteServices = require('../services/favorite_services');

async function initializeFavorites(req, res) {
    try {
        await favoriteServices.initializeTestFavorites();
        if (res) {
            res.status(201).json({ message: 'Favorites initialized successfully' });
        }
    } catch (error) {
        console.error(chalk.red('Error initializing favorites:', error));
        if (res) {
            res.status(500).json({ error: 'Failed to initialize favorites' });
        }
    }
}

async function addFavorite(req, res) {
    try {
        if (!req.body) {
            return res.status(400).json({ error: 'No data provided' });
        }
        
        const favorite = await favoriteServices.addFavorite(req.body);
        return res.status(201).json(favorite);
    } catch (error) {
        console.error(chalk.red('Error adding favorite:', error.message));
        const status = error.message.includes('already exists') ? 409 : 500;
        const message = error.message || 'Failed to add favorite';
        return res.status(status).json({ error: message });
    }
}

async function getFavoritesByPersonId(req, res) {
    try {
        const favorites = await favoriteServices.getFavoritesByPersonId(req.params.personId);
        res.status(200).json(favorites);
    } catch (error) {
        console.error(chalk.red('Error fetching favorites:', error));
        res.status(500).json({ error: 'Failed to fetch favorites' });
    }
}

async function getFavoritesByShowId(req, res) {
    try {
        const favorites = await favoriteServices.getFavoritesByShowId(req.params.showId);
        res.status(200).json(favorites);
    } catch (error) {
        console.error(chalk.red('Error fetching favorites:', error));
        res.status(500).json({ error: 'Failed to fetch favorites' });
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

async function getFavoritesByPersonIdAndShowId(req, res) {
    try {
        const favorites = await favoriteServices.getFavoritesByPersonIdAndShowId(
            req.params.personId, 
            req.params.showId
        );
        res.status(200).json(favorites);
    } catch (error) {
        console.error(chalk.red('Error fetching favorites:', error));
        res.status(500).json({ error: 'Failed to fetch favorites' });
    }
}

module.exports = { addFavorite, getFavoritesByPersonId, getFavoritesByShowId, removeFavorite, getFavoritesByPersonIdAndShowId, initializeFavorites };