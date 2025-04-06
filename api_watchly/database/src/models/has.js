const { Model, DataTypes } = require('sequelize');
const sequelize = require('../database');
const path = require('path');

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
