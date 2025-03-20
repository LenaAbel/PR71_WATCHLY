const { Model, DataTypes } = require('sequelize');
const { Sequelize } = require('sequelize');
const path = require('path');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: path.resolve(__dirname, '../../data/watchlyDB'),
});


class Has extends Model {}

Has.init(
    {
    show_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
            model: 'shows',
            key: 'show_id',
        },
    },
    genre_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
            model: 'genre',
            key: 'genre_id',
        },
    },
    },
    {
    sequelize,
    modelName: 'Has',
    tableName: 'has',
    timestamps: false,
});

module.exports = Has;

// create a fav example
const pl  = Has.build({
    show_id: 1,
    genre_id: 1,
});
pl.save().then(() => console.log('Play created'));