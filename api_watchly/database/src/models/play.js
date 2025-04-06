const { Model, DataTypes } = require('sequelize');
const sequelize = require('../database');

const path = require('path');


class Play extends Model {}

Play.init(
    {
    play_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    cast_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'casting',
            key: 'cast_id',
        },
    },
    show_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'shows',
            key: 'show_id',
        },
    },
    role: {
        type: DataTypes.STRING(50),
    },
    },
    {
    sequelize,
    modelName: 'Play',
    tableName: 'play',
    timestamps: false,
});

module.exports = Play;
