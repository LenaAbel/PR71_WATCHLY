const Favorite = require('../../database/src/models/favorite');
const chalk = require('chalk');
const bcrypt = require('bcrypt');
const favoriteServices = require('../services/favorite_services');

async function addFavorite(req, res) {
    try {
        await favoriteServices.addFavorite(req);
    } catch (error) {
        console.error(chalk.red('Error adding favorite:', error));
    }
}

async function getFavoritesByPersonId(req, res) {
    try {
        return await favoriteServices.getFavoritesByPersonId(req.params.personId);
    } catch (error) {
        console.error(chalk.red('Error fetching favorites:', error));
    }
}

async function getFavoritesByShowId(req, res) {
    try {
        return await favoriteServices.getFavoritesByShowId(req.params.showId);
    } catch (error) {
        console.error(chalk.red('Error fetching favorites:', error));
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
        return await favoriteServices.getFavoritesByPersonIdAndShowId(req.params.personId, req.params.showId);
    } catch (error) {
        console.error(chalk.red('Error fetching favorites:', error));
    }
}

module.exports = { addFavorite, getFavoritesByPersonId, getFavoritesByShowId, removeFavorite, getFavoritesByPersonIdAndShowId };