const Favorite = require('../../database/src/models/favorite');
const Person = require('../../database/src/models/person');
const chalk = require('chalk');
const bcrypt = require('bcrypt');

Favorite.belongsTo(Person, { foreignKey: 'person_id', as: 'person' });


async function createFavorites(){
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
        [9, 1, 5, 1],
        [9, 2, 4, 0],
        [9, 3, 3, 1],
        [9, 4, 2, 0],
        [9, 5, 1, 1],
        [10, 1, 5, 1],
        [10, 2, 4, 0],
        [10, 3, 3, 1],
        [10, 4, 2, 0],
        [10, 5, 1, 1],
        [25, 1, 5, 1],
        [25, 2, 4, 0],
        [25, 3, 3, 1],
        [25, 4, 2, 0],
        [25, 5, 1, 1],
        [26, 1, 5, 1],
        [26, 2, 4, 0],
        [26, 3, 3, 1],
        [26, 4, 2, 0],
        [26, 5, 1, 1],
        [27, 1, 5, 1],
        [27, 2, 4, 0],
        [27, 3, 3, 1],
        [27, 4, 2, 0],
        [27, 5, 1, 1],
        [28, 1, 5, 1],
        [28, 2, 4, 0],
        [28, 3, 3, 1],
        [28, 4, 2, 0],
        [28, 5, 1, 1],
        [29, 1, 5, 1],
        [29, 2, 4, 0],
        [29, 3, 3, 1],
        [29, 4, 2, 0],
        [29, 5, 1, 1],
        [30, 1, 5, 1],
        [30, 2, 4, 0],
        [30, 3, 3, 1],
        [30, 4, 2, 0],
        [30, 5, 1, 1],
        
    ];
    console.log(chalk.cyan(`\n 💖 Processing favorites...`));
    for (const f of favorites) {
        await addFav(f);
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

async function addFavorite(req) {
    console.log(req.body);
    
    const { show_id, person_id, rating, is_watched } = req.body;
    const favorite = await Favorite.create({
        show_id,
        person_id,
        rating,
        is_watched,
    });
    return favorite;
}


module.exports = { createFavorites, addFavorite };
