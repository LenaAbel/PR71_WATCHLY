const { Model, DataTypes } = require('sequelize');
const sequelize = require('../database');

const path = require('path');

class Illustrated extends Model {}

Illustrated.init(
    {
        illustrated_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        show_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'shows',
                key: 'show_id',
            },
        },
        picture_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'picture',
                key: 'picture_id',
            },
        },
        episode_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'episode',
                key: 'episode_id',
            },
        },
        person_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'person',
                key: 'person_id',
            },
        },
    },
    {
        sequelize,
        modelName: 'Illustrated',
        tableName: 'illustrated',
        timestamps: false,
    }
);


module.exports = Illustrated;
