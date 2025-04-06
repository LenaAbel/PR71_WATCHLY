const Favorite = require('../../database/src/models/favorite');
const Person = require('../../database/src/models/person');
const chalk = require('chalk');
const bcrypt = require('bcrypt');

Favorite.belongsTo(Person, { foreignKey: 'person_id', as: 'person' });


async function initializeTestFavorites(){
    const favorites = [
        [1, 1, 5, 1],
        [1, 2, 4, 0],
        [1, 3, 3, 1],
        [1, 4, 2, 0],
        [1, 5, 1, 1],
        [2, 1, 5, 1],
        [2, 2, 4, 0],
        [2, 3, 3, 1],
        [2, 4, 2, 0],
        [2, 5, 1, 1],
        [3, 1, 5, 1],
        [3, 2, 4, 0],
        [3, 3, 3, 1],
        [3, 4, 2, 0],
        [3, 5, 1, 1],
        [4, 1, 5, 1],
        [4, 2, 4, 0],
        [4, 3, 3, 1],
        [4, 4, 2, 0],
        [4, 5, 1, 1],
        [5, 1, 5, 1],
        [5, 2, 4, 0],
        [5, 3, 3, 1],
        [5, 4, 2, 0],
        [5, 5, 1, 1],
        [6, 1, 5, 1],
        [6, 2, 4, 0],
        [6, 3, 3, 1],
        [6, 4, 2, 0],
        [6, 5, 1, 1],
        [7, 1, 5, 1],
        [7, 2, 4, 0],
        [7, 3, 3, 1],
        [7, 4, 2, 0],
        [7, 5, 1, 1],
        [8, 1, 5, 1],
        [8, 2, 4, 0],
        [8, 3, 3, 1],
        [8, 4, 2, 0],
        [8, 5, 1, 1],        
    ];
    console.log(chalk.cyan(`\n 💖 Processing favorites...`));
    for (const f of favorites) {
        const [person_id, show_id, rating, is_watched] = f;
        await Favorite.create({
            show_id,
            person_id,
            rating,
            is_watched,
        });
    }
} 

async function getAllFavorites() {
    const favorites = await Favorite.findAll({
        include: {
            model: Person,
            as: 'person',
            attributes: ['id', 'name'],
        },
    });
    return favorites;
}

async function getFavoritesByPersonId(person_id) {
    const favorites = await Favorite.findAll({
        where: { person_id },
        include: {
            model: Person,
            as: 'person',
            attributes: ['person_id', 'name'],
        },
    });
    return favorites;
}

async function getFavoritesByShowId(show_id) {
    const favorites = await Favorite.findAll({
        where: { show_id },
        include: {
            model: Person,
            as: 'person',
            attributes: ['person_id', 'name'],
        },
    });
    return favorites;
}

async function getFavoritesByPersonIdAndShowId(person_id, show_id) {
    const favorites = await Favorite.findAll({
        where: { person_id, show_id },
        include: {
            model: Person,
            as: 'person',
            attributes: ['person_id', 'name'],
        },
    });
    return favorites;
}

async function addFavorite(favoriteData) {    
    if (!favoriteData) {
        throw new Error('No favorite data provided');
    }

    const { show_id, person_id, rating = 0, is_watched = false } = favoriteData;

    if (!show_id || !person_id) {
        console.error('Missing data:', { show_id, person_id, rating, is_watched });
        throw new Error(`Missing required favorite data: show_id=${show_id}, person_id=${person_id}`);
    }

    // Check if favorite already exists
    const existingFavorite = await Favorite.findOne({
        where: { show_id, person_id }
    });

    if (existingFavorite) {
        throw new Error('Favorite already exists');
    }

    try {
        const favorite = await Favorite.create({
            show_id,
            person_id,
            rating,
            is_watched,
        });
        return favorite;
    } catch (error) {
        console.error(chalk.red('Database error:', error));
        throw new Error('Failed to create favorite');
    }
}

async function deleteFavorite(person_id, show_id) {
    try {
        const result = await Favorite.destroy({
            where: { person_id, show_id }
        });
        return result > 0;
    } catch (error) {
        console.error(chalk.red('Error deleting favorite:', error));
        throw error;
    }
}

module.exports = { initializeTestFavorites, addFavorite, getFavoritesByPersonId, getFavoritesByShowId, getFavoritesByPersonIdAndShowId, getAllFavorites, deleteFavorite };