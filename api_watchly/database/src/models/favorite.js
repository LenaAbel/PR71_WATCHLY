const { Model, DataTypes } = require('sequelize');
const sequelize = require('../database');

class Favorite extends Model {}

Favorite.init(
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
    person_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
            model: 'person',
            key: 'person_id',
        },
    },
    rating: {
        type: DataTypes.TINYINT,
        allowNull: true,
        validate: {
            min: 0,
            max: 10,
        },
    },
    is_watched: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
    },
    },
    {
    sequelize,
    modelName: 'Favorite',
    tableName: 'favorite',
    timestamps: false,
});

module.exports = Favorite;
