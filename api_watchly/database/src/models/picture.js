const { DataTypes, Model } = require('sequelize');
const sequelize = require('../database');

const path = require('path');

class Picture extends Model {}

Picture.init(
    {
        picture_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
        },
        link: {
            type: DataTypes.STRING(100),
        },
        type: {
            type: DataTypes.STRING(20),
            defaultValue: null
        },
    },
    {
        sequelize,
        modelName: 'Picture',
        tableName: 'picture',
        timestamps: false,
    }
);

module.exports = Picture;
