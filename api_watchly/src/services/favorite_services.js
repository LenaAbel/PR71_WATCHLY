const Favorite = require('../../database/src/models/favorite');
const Person = require('../../database/src/models/person');
const Show = require('../../database/src/models/shows');
const chalk = require('chalk');
const bcrypt = require('bcrypt');

Favorite.belongsTo(Person, { foreignKey: 'person_id', as: 'person' });

async function addFav(data) {
    try {
        const [person_id, show_id, rating, is_watched] = data;
        await Favorite.create({
            person_id,
            show_id,
            rating,
            is_watched
        });
        console.log(chalk.green(`✅ Added favorite for user ${person_id} and show ${show_id}`));
    } catch (error) {
        console.error(chalk.red(`❌ Error adding favorite:`, error));
    }
}

async function createFavorites() {
    try {
        // Get all valid person IDs and show IDs
        const persons = await Person.findAll({ attributes: ['person_id'] });
        const shows = await Show.findAll({ attributes: ['show_id'] });

        const personIds = persons.map(p => p.person_id);
        const showIds = shows.map(s => s.show_id);

        console.log(chalk.cyan(`\n 💖 Processing favorites for ${personIds.length} users and ${showIds.length} shows...`));

        // Create random favorites for each person
        for (const personId of personIds) {
            // Pick 3-5 random shows for each person
            const numFavorites = Math.floor(Math.random() * 3) + 3;
            const shuffledShows = showIds.sort(() => 0.5 - Math.random());
            
            for (let i = 0; i < Math.min(numFavorites, shuffledShows.length); i++) {
                const rating = Math.floor(Math.random() * 5) + 1;
                const is_watched = Math.random() > 0.5;
                
                await addFav([personId, shuffledShows[i], rating, is_watched]);
            }
        }
    } catch (error) {
        console.error(chalk.red('Error creating favorites:', error));
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

async function addFavorite(favoriteData) {
    try {
        const favorite = await Favorite.create(favoriteData);
        return favorite;
    } catch (error) {
        console.error(chalk.red(`❌ Error adding favorite:`, error));
        throw error;
    }
}

module.exports = { createFavorites, addFavorite, getAllFavorites };
