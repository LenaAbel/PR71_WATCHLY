const { Model, DataTypes } = require('sequelize');
const sequelize = require('../database');
const path = require('path');

class Genre extends Model {}

Genre.init(
    {
        genre_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING(50),
        },
    },
    {
    sequelize,
    modelName: 'Genre',
    tableName: 'genre',
    timestamps: false,
});

module.exports = Genre;