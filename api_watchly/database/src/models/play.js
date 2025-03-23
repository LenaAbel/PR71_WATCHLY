const { Model, DataTypes } = require('sequelize');
const sequelize = require('../database');

const path = require('path');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: path.resolve(__dirname, '../../data/watchlyDB'),
});


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

// create a play example
const pl  = Play.build({
    play_id: 1,
    cast_id: 1,
    show_id: 1,
    role: 'role',
});
pl.save().then(() => console.log('Play created'));