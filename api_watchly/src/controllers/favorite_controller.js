const Favorite = require('../../database/src/models/favorite');
const chalk = require('chalk');
const bcrypt = require('bcrypt');
const favoriteServices = require('../services/favorite_services');

async function addFavorites(){
    favoriteServices.createFavorites();
}
    
module.exports = { addFavorites };