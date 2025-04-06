const { Model, DataTypes } = require('sequelize');
const sequelize = require('../database');

const path = require('path');

class Casting extends Model {}

 Casting.init (
    {
    cast_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING(50),
    },
    surname: {
        type: DataTypes.STRING(50),
    },
    is_actor: {
        type: DataTypes.BOOLEAN,
    },
}, 
{
    sequelize,
    modelName: 'Casting',
    tableName: 'casting',
    timestamps: false,
});

module.exports = Casting;

