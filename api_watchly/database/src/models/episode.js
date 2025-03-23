const { Model, DataTypes } = require('sequelize');
const sequelize = require('../database');
const path = require('path');

class Episode extends Model {}

Episode.init(
    {
        episode_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING(100),
        },
        description: {
            type: DataTypes.STRING(500),
        },
        duration: {
            type: DataTypes.TIME,
        },
        show_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'shows',
                key: 'show_id',
            },
        },
        season: {
            type: DataTypes.TINYINT,
        },
        episode_number: {
            type: DataTypes.TINYINT,
        },
        release_date: {
            type: DataTypes.DATE,
        },
    },
    {
    sequelize,
    modelName: 'Episode',
    tableName: 'episode',
    timestamps: false,
});

module.exports = Episode;

